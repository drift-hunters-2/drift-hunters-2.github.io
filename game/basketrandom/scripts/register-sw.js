'use strict';
window.C3_RegisterSW = async function () {
	if (navigator.serviceWorker)
		try {
			const a = await navigator.serviceWorker.register('sw.js', { scope: './' });
			console.info('Registered service worker on ' + a.scope);
		} catch (a) {
			console.warn('Failed to register service worker: ', a);
		}
};
