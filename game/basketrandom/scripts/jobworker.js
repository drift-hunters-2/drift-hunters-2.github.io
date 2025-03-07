'use strict';
(self.dispatchPort = null),
	(self.outputPort = null),
	(self.workerNumber = -1),
	(self.activeJobId = null),
	(self.sentBlobs = new Map()),
	(self.sentBuffers = new Map()),
	(self.JobHandlers = {});
function FlipImageData(a, b, c) {
	const d = 4 * b,
		e = new Uint8Array(d),
		f = a.buffer;
	for (let g = 0, h = Math.floor(c / 2); g < h; ++g) {
		const a = c - g - 1,
			b = new Uint8Array(f, g * d, d),
			h = new Uint8Array(f, a * d, d);
		e.set(b), b.set(h), h.set(e);
	}
}
function UnpremultiplyImageData(b) {
	for (let c = 0, a = b.length; c < a; c += 4) {
		const d = b[c + 3];
		if (255 === d) continue;
		const a = 255 / d;
		(b[c] *= a), (b[c + 1] *= a), (b[c + 2] *= a);
	}
}
(self.JobHandlers['ProcessImageData'] = function (a) {
	const b = a['buffer'],
		c = new Uint8Array(b),
		d = a['width'],
		e = a['height'];
	return (
		a['flipY'] && FlipImageData(c, d, e),
		a['unpremultiply'] && UnpremultiplyImageData(c),
		{ result: b, transferables: [b] }
	);
}),
	self.addEventListener('message', (a) => {
		const b = a.data,
			c = b['type'];
		return 'init' === c
			? ((self.workerNumber = b['number']),
			  (self.dispatchPort = b['dispatch-port']),
			  (self.dispatchPort.onmessage = OnDispatchWorkerMessage),
			  void (self.outputPort = b['output-port']))
			: 'terminate' === c
			? void self.close()
			: void console.error("unknown message '" + c + "'");
	});
function SendReady() {
	self.dispatchPort.postMessage({ type: 'ready' }), self.outputPort.postMessage({ type: 'ready' });
}
function SendError(a, b) {
	a || self.outputPort.postMessage({ type: 'error', jobId: self.activeJobId, error: b.toString() }),
		SendDone();
}
function SendResult(a, b) {
	if (!a) {
		const a = b.transferables || [];
		self.outputPort.postMessage({ type: 'result', jobId: self.activeJobId, result: b.result }, a);
	}
	SendDone();
}
function SendDone() {
	(self.activeJobId = null), self.dispatchPort.postMessage({ type: 'done' });
}
function SendProgress(a) {
	self.outputPort.postMessage({ type: 'progress', jobId: self.activeJobId, progress: a });
}
function OnDispatchWorkerMessage(a) {
	const b = a.data,
		c = b['type'];
	if ('_import_scripts' === c) return void importScripts(...b['scripts']);
	if ('_send_blob' === c) return void self.sentBlobs.set(b['id'], b['blob']);
	if ('_send_buffer' === c) return void self.sentBuffers.set(b['id'], b['buffer']);
	if ('_testMessageChannel' === c)
		return void self.outputPort.postMessage({ type: '_testMessageChannelOk' });
	if ('_ready' === c) return void SendReady();
	const d = b['jobId'],
		f = b['isBroadcast'],
		e = b['params'];
	let g;
	if (((self.activeJobId = d), !self.JobHandlers.hasOwnProperty(c)))
		return void console.error(`no handler for message type '${c}'`);
	try {
		g = self.JobHandlers[c](e);
	} catch (a) {
		return void SendError(f, 'Exception in job handler: ' + a);
	}
	g && g.then
		? g.then((a) => SendResult(f, a)).catch((a) => SendError(f, 'Rejection in job handler: ' + a))
		: SendResult(f, g);
}
