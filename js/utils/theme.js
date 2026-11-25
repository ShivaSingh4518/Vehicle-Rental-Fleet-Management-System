import { themeKey, read, write } from "./storage.js";

export function initTheme() {
  const toggle = document.querySelector("#theme-toggle");
  const saved = read(themeKey, "light");
  applyTheme(saved);
  if (toggle) {
    toggle.checked = saved === "dark";
    toggle.addEventListener("change", () => {
      const theme = toggle.checked ? "dark" : "light";
      applyTheme(theme);
      write(themeKey, theme);
    });
  }
}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
  const toggle = document.querySelector("#theme-toggle");
  if (toggle) toggle.checked = theme === "dark";
}
