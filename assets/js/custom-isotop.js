$(window).on('load', function () {
    // Initialize features
    initializePwaFeatures();
    initializeGoogleAnalytics();
    initializeProjectFilter();
});

// Initialize PWA Features
function initializePwaFeatures() {
    addManifestLink();
    registerServiceWorker();
    setupPwaInstallation();
}
