export type Theme = 'light' | 'dark';
export const THEME_KEY = 'theme';

// Runs inline in <head> before first paint: stored choice wins, else system.
export const themeScript = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
