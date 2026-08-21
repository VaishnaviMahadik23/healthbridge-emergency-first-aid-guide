const THEME_KEY = "hb-theme";

function applyTheme(theme) {
    const normalizedTheme = theme === "dark" ? "dark" : "light";

    document.documentElement.dataset.theme = normalizedTheme;
    localStorage.setItem(THEME_KEY, normalizedTheme);

    const themeIcon = document.querySelector("#themeToggle i");
    const themeButton = document.getElementById("themeToggle");

    if (themeIcon) {
        themeIcon.className =
            normalizedTheme === "dark"
                ? "bi bi-sun"
                : "bi bi-moon-stars";
    }

    if (themeButton) {
        const nextMode =
            normalizedTheme === "dark" ? "light" : "dark";

        themeButton.setAttribute(
            "aria-label",
            `Switch to ${nextMode} mode`
        );

        themeButton.setAttribute("title", `Switch to ${nextMode} mode`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";

    applyTheme(savedTheme);

    document
        .getElementById("themeToggle")
        ?.addEventListener("click", () => {
            const currentTheme =
                document.documentElement.dataset.theme || "light";

            applyTheme(
                currentTheme === "dark" ? "light" : "dark"
            );
        });
});
