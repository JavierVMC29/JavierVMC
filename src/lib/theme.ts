// Client-side theme handling, compatible with the previous next-themes setup:
// the choice ("light" | "dark" | "system") is stored in localStorage under "theme",
// and the resolved theme is applied as a class + color-scheme on <html>.
// The initial theme is applied before paint by the inline script in BaseLayout.astro.

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function getStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark") return value;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
  }
  return "system";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? (darkQuery.matches ? "dark" : "light") : theme;
  const root = document.documentElement;

  // Same as next-themes' `disableTransitionOnChange`: switch colors without animating every element.
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);

  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;

  window.getComputedStyle(document.body);
  setTimeout(() => style.remove(), 1);
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore: the theme still applies for this page view.
  }
  applyTheme(theme);
}

// Follow OS changes while no explicit choice was made, and keep other tabs in sync.
darkQuery.addEventListener("change", () => {
  if (getStoredTheme() === "system") applyTheme("system");
});
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) applyTheme(getStoredTheme());
});
