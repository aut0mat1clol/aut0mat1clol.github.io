/* =========================================================
   aut0mat1clol — клиентский скрипт
   • Переключатель темы (light/dark) с сохранением в localStorage
   • Подсветка активной вкладки при скролле (scrollspy)
   ========================================================= */

(() => {
    "use strict";

    const html = document.documentElement;
    const STORAGE_KEY = "amnyam-theme";

    /* ---------- Тема ---------- */
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
        html.setAttribute("data-theme", savedTheme);
    }

    const themeBtn = document.querySelector(".theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const current = html.getAttribute("data-theme") || "light";
            const next = current === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", next);
            localStorage.setItem(STORAGE_KEY, next);
        });
    }

    /* ---------- Scrollspy для табов ---------- */
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll("main .card[id]");

    if (tabs.length && sections.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    tabs.forEach((tab) => {
                        const isActive = tab.getAttribute("href") === `#${id}`;
                        tab.classList.toggle("active", isActive);
                    });
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
    }
})();
