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
});
