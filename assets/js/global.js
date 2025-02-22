document.addEventListener("DOMContentLoaded", function () {
    // 🌙 Dark Mode Toggle
    const toggleTheme = document.getElementById("theme-toggle");

    if (toggleTheme) {
        // Load saved theme from local storage
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark-mode");
        }

        // Toggle theme on button click
        toggleTheme.addEventListener("click", function () {
            document.documentElement.classList.toggle("dark-mode");
            localStorage.setItem(
                "theme",
                document.documentElement.classList.contains("dark-mode") ? "dark" : "light"
            );
        });
    }

    // 🔼 Scroll-to-Top Button
    const scrollToTop = document.createElement("button");
    scrollToTop.id = "scroll-to-top";
    scrollToTop.innerHTML = "↑";
    document.body.appendChild(scrollToTop);

    // ✅ Improved Styling (CSS in JavaScript)
    Object.assign(scrollToTop.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "none",
        padding: "10px",
        border: "none",
        background: "#ff4081",
        color: "white",
        cursor: "pointer",
        borderRadius: "50%",
        fontSize: "20px",
        width: "45px",
        height: "45px",
        textAlign: "center",
        lineHeight: "40px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "opacity 0.3s, transform 0.3s",
    });

    // Hover effect
    scrollToTop.addEventListener("mouseover", () => {
        scrollToTop.style.transform = "scale(1.1)";
    });
    scrollToTop.addEventListener("mouseleave", () => {
        scrollToTop.style.transform = "scale(1)";
    });

    // Show/hide button on scroll
    window.addEventListener("scroll", function () {
        scrollToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // Scroll to top on click
    scrollToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
