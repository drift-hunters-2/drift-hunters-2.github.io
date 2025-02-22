document.addEventListener("DOMContentLoaded", function () {
    const toggleTheme = document.getElementById("theme-toggle");

    if (toggleTheme) {
        // Load saved theme from local storage
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }

        // Toggle dark mode on button click
        toggleTheme.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });
    }

    // Create scroll-to-top button
    const scrollToTop = document.createElement("button");
    scrollToTop.id = "scroll-to-top";
    scrollToTop.innerHTML = "↑";
    scrollToTop.style.position = "fixed";
    scrollToTop.style.bottom = "20px";
    scrollToTop.style.right = "20px";
    scrollToTop.style.display = "none";
    scrollToTop.style.padding = "10px";
    scrollToTop.style.border = "none";
    scrollToTop.style.background = "#ff4081";
    scrollToTop.style.color = "white";
    scrollToTop.style.cursor = "pointer";
    scrollToTop.style.borderRadius = "5px";
    scrollToTop.style.fontSize = "18px";

    document.body.appendChild(scrollToTop);

    // Show/hide button on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTop.style.display = "block";
        } else {
            scrollToTop.style.display = "none";
        }
    });

    // Scroll to top on click
    scrollToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
