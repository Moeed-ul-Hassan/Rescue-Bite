import Cookies from "js-cookie";

export const COOKIE_KEYS = {
  CONSENT: "cookie-consent",
  THEME: "theme-preference",
  LANGUAGE: "language-preference",
} as const;

export type CookieKey = keyof typeof COOKIE_KEYS;

export function setCookie(key: CookieKey, value: string, days = 365) {
  Cookies.set(COOKIE_KEYS[key], value, { expires: days });
}

export function getCookie(key: CookieKey): string | undefined {
  return Cookies.get(COOKIE_KEYS[key]);
}

export function removeCookie(key: CookieKey) {
  Cookies.remove(COOKIE_KEYS[key]);
}

export function hasConsent(): boolean {
  return Cookies.get(COOKIE_KEYS.CONSENT) === "true";
}
