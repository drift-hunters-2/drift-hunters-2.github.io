'use strict';
{
	window.OfflineClientInfo = new (class {
		constructor() {
			if (
				((this._broadcastChannel =
					'undefined' == typeof BroadcastChannel ? null : new BroadcastChannel('offline')),
				(this._queuedMessages = []),
				(this._onMessageCallback = null),
				this._broadcastChannel)
			) {
				var a = this;
				this._broadcastChannel.onmessage = function (b) {
					a._OnBroadcastChannelMessage(b);
				};
			}
		}
		_OnBroadcastChannelMessage(a) {
			return this._onMessageCallback
				? void this._onMessageCallback(a)
				: void this._queuedMessages.push(a);
		}
		SetMessageCallback(a) {
			this._onMessageCallback = a;
			for (let b of this._queuedMessages) this._onMessageCallback(b);
			this._queuedMessages.length = 0;
		}
	})();
}
