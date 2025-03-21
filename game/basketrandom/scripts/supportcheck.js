'use strict';
(function () {
	var a = !!document.querySelector('script[src*="kaspersky"]'),
		b = document.createElement('canvas'),
		c = !!(b.getContext('webgl') || b.getContext('experimental-webgl')),
		d = [];
	if (
		(c || d.push('WebGL'),
		'undefined' == typeof WebAssembly && d.push('WebAssembly'),
		0 === d.length && !a)
	)
		window['C3_IsSupported'] = !0;
	else {
		var e = document.createElement('div');
		(e.id = 'notSupportedWrap'), document.body.appendChild(e);
		var f = document.createElement('h2');
		(f.id = 'notSupportedTitle'),
			(f.textContent = a
				? 'Kaspersky Internet Security broke this export'
				: 'Software update needed'),
			e.appendChild(f);
		var g = document.createElement('p');
		g.className = 'notSupportedMessage';
		var h = "This content is not supported because your device's software is out-of-date. ",
			i = navigator.userAgent;
		/android/i.test(i)
			? (h +=
					'<br><br>On Android, fix this by making sure the <a href="https://play.google.com/store/apps/details?id=com.google.android.webview">Android System Webview</a> app has updates enabled and is up-to-date.')
			: /iphone|ipad|ipod/i.test(i)
			? (h +=
					"<br><br>Note: the <strong>iOS simulator</strong> is not currently supported due to an <a href='https://bugs.webkit.org/show_bug.cgi?id=191064'>Apple bug</a>. If you are using the simulator, try testing on a real device instead.")
			: (/msie/i.test(i) || /trident/i.test(i)) && !/edge\//i.test(i)
			? (h +=
					"<br><br>Note: <strong>Internet Explorer</strong> is not supported. Try using <a href='https://www.google.com/chrome'>Chrome</a> or <a href='https://www.mozilla.org/firefox'>Firefox</a> instead.")
			: a
			? (h =
					'It appears a script was added to this export by Kaspersky software. This prevents the exported project from working. Try disabling Kaspersky and exporting again.')
			: (h +=
					'Try installing any available software updates. Alternatively try on a different device.'),
			(h +=
				'<br><br><em>Missing features: ' +
				d.join(', ') +
				'<br>User agent: ' +
				navigator.userAgent +
				'</em>'),
			(g.innerHTML = h),
			e.appendChild(g);
	}
})();
