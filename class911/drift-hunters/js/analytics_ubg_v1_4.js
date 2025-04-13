function loadGoogleAnalytics(id) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(script);

    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', id);
    };
}

window.addEventListener("load", function () {
    console.log(navigator.webdriver ? 'Bot Browser' : 'Human Browser');
    loadGoogleAnalytics("G-X93T1595HB");
});
