/* =========================================================
   aut0mat1clol — клиентский скрипт
   • Тема следует за системой, но запоминает ручной выбор
   • Scrollspy для активной вкладки
   ========================================================= */

(() => {
    "use strict";

    const html = document.documentElement;
    const STORAGE_KEY = "amnyam-theme";

    /* ---------- Тема ---------- */
    // Определяет системную тему: "dark" или "light"
    const getSystemTheme = () =>
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    // Применяет тему (используется после инициализации в <head>)
    const applyTheme = (theme) => html.setAttribute("data-theme", theme);

    // Применяет системную тему, ТОЛЬКО если пользователь не выбирал вручную
    const syncWithSystem = () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(getSystemTheme());
        }
    };

    /* Кнопка переключения темы */
    const themeBtn = document.querySelector(".theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const current = html.getAttribute("data-theme") || "light";
            const next = current === "dark" ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(STORAGE_KEY, next); // запоминаем ручной выбор
        });
    }

    /* Реагируем на смену системной темы (если пользователь не переопределил) */
    if (window.matchMedia) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        // addEventListener — стандарт, addListener — фолбэк для старых Safari
        if (mq.addEventListener) {
            mq.addEventListener("change", syncWithSystem);
        } else if (mq.addListener) {
            mq.addListener(syncWithSystem);
        }
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
