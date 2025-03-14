'use strict';
(self.inputPort = null),
	(self.jobQueue = []),
	(self.jobWorkers = []),
	(self.sentBlobs = []),
	(self.sentBuffers = []),
	(self.importedScripts = []),
	(self.lastBroadcasts = new Map());
class JobWorker {
	constructor(a, b) {
		(this._port = a),
			(this._number = b),
			(this._isReady = !1),
			(this._isBusy = !1),
			(this._port.onmessage = (a) => this._OnMessage(a.data));
	}
	ImportScripts(a) {
		this._port.postMessage({ type: '_import_scripts', scripts: a });
	}
	SendBlob(a, b) {
		this._port.postMessage({ type: '_send_blob', blob: a, id: b });
	}
	SendBuffer(a, b) {
		this._port.postMessage({ type: '_send_buffer', buffer: a, id: b });
	}
	SendJob(a) {
		if (this._isBusy || !this._isReady) throw new Error('cannot take job');
		(this._isBusy = !0), this._port.postMessage(a, a['transferables']);
	}
	_InitBroadcast(a) {
		this._port.postMessage(a, a['transferables']);
	}
	SendReady() {
		this._port.postMessage({ type: '_ready' });
	}
	IsReady() {
		return this._isReady;
	}
	_OnReady() {
		(this._isReady = !0), this.MaybeStartNextJob();
	}
	IsBusy() {
		return this._isBusy;
	}
	GetNumber() {
		return this._number;
	}
	_OnMessage(a) {
		const b = a['type'];
		return 'ready' === b
			? void this._OnReady()
			: 'done' === b
			? void this._OnJobDone()
			: void console.error("unknown message from worker '" + b + "'");
	}
	_OnJobDone() {
		(this._isBusy = !1), this.MaybeStartNextJob();
	}
	MaybeStartNextJob() {
		if (!this._isBusy && this._isReady) {
			const a = this._FindAvailableJob();
			if (-1 !== a) {
				const b = self.jobQueue[a],
					c = b['isBroadcast'];
				c
					? ((b['doneFlags'][this._number] = !0),
					  b['doneFlags'].every((a) => a) && self.jobQueue.splice(a, 1))
					: self.jobQueue.splice(a, 1),
					this.SendJob(b);
			}
		}
	}
	_FindAvailableJob() {
		for (let a = 0, b = self.jobQueue.length; a < b; ++a) {
			const b = self.jobQueue[a];
			if (
				!b['isBroadcast'] ||
				(this._number < b['doneFlags'].length && !b['doneFlags'][this._number])
			)
				return a;
		}
		return -1;
	}
	TestMessageChannel() {
		this._port.postMessage({ type: '_testMessageChannel' });
	}
}
let number = 0;
function AddJobWorker(a) {
	const b = new JobWorker(a, number++);
	self.jobWorkers.push(b);
	for (const [c, d] of self.sentBlobs) b.SendBlob(c, d);
	for (const [c, d] of self.sentBuffers) b.SendBuffer(c, d);
	for (const c of self.importedScripts) b.ImportScripts(c);
	for (const c of self.lastBroadcasts.values()) b._InitBroadcast(c);
	b.SendReady();
}
function CancelJob(a) {
	for (let b = 0, c = self.jobQueue.length; b < c; ++b)
		if (self.jobQueue[b].jobId === a) return void self.jobQueue.splice(b, 1);
}
self.addEventListener('message', (a) => {
	const b = a.data,
		c = b['type'];
	'_init' === c
		? ((self.inputPort = b['in-port']), (self.inputPort.onmessage = OnInputPortMessage))
		: '_addJobWorker' === c && AddJobWorker(b['port']);
});
function OnInputPortMessage(a) {
	const b = a.data,
		c = b['type'];
	if ('_cancel' === c) return void CancelJob(b.jobId);
	if ('_import_scripts' === c) {
		const a = b['scripts'];
		for (const b of self.jobWorkers) b.ImportScripts(a);
		return void self.importedScripts.push(a);
	}
	if ('_send_blob' === c) {
		const a = b['blob'],
			c = b['id'];
		for (const b of self.jobWorkers) b.SendBlob(a, c);
		return void self.sentBlobs.push([a, c]);
	}
	if ('_send_buffer' === c) {
		const a = b['buffer'],
			c = b['id'];
		for (const b of self.jobWorkers) b.SendBuffer(a, c);
		return void self.sentBuffers.push([a, c]);
	}
	if ('_no_more_workers' === c)
		return (
			(self.sentBlobs.length = 0),
			(self.sentBuffers.length = 0),
			(self.importedScripts.length = 0),
			void self.lastBroadcasts.clear()
		);
	if ('_testMessageChannel' === c) return void self.jobWorkers[0].TestMessageChannel();
	self.jobQueue.push(b),
		b['isBroadcast'] &&
			((b['doneFlags'] = Array(self.jobWorkers.length).fill(!1)),
			(b['transferables'] = []),
			self.lastBroadcasts.set(b['type'], b));
	for (const b of self.jobWorkers) b.MaybeStartNextJob();
}
