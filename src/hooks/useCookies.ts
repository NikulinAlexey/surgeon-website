"use client";
import { useCallback } from "react";

export interface CookieOptions {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export interface UseCookiesReturn {
  get: (name: string) => string | undefined;
  set: (name: string, value: string, options?: CookieOptions) => void;
  remove: (name: string, options?: CookieOptions) => void;
  getAll: () => Record<string, string>;
}

export function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieString) return cookies;

  cookieString.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name) {
      const value = rest.join("=");
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  });

  return cookies;
}

export function useCookies(defaultOptions?: CookieOptions): UseCookiesReturn {
  const isCookiesEnabled =
    typeof navigator !== "undefined" && navigator.cookieEnabled;

  const get = useCallback(
    (name: string): string | undefined => {
      if (!isCookiesEnabled) return undefined;
      const cookies = parseCookies(document.cookie);
      return cookies[name];
    },
    [isCookiesEnabled]
  );

  const set = useCallback(
    (name: string, value: string, options?: CookieOptions) => {
      if (!isCookiesEnabled) {
        console.warn("Cookies are disabled in this browser");
        return;
      }

      const opts = { ...defaultOptions, ...options };
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
      )}`;

      if (opts.expires) {
        let expiresDate: Date;
        if (typeof opts.expires === "number") {
          expiresDate = new Date();
          expiresDate.setDate(expiresDate.getDate() + opts.expires);
        } else if (typeof opts.expires === "string") {
          expiresDate = new Date(opts.expires);
        } else {
          expiresDate = opts.expires;
        }

        if (isNaN(expiresDate.getTime())) {
          console.warn("Invalid expires date provided");
          return;
        }

        cookieString += `; expires=${expiresDate.toUTCString()}`;
      }

      if (opts.path) {
        cookieString += `; path=${opts.path}`;
      }

      if (opts.domain) {
        cookieString += `; domain=${opts.domain}`;
      }

      if (opts.secure) {
        cookieString += "; secure";
      }

      if (opts.sameSite) {
        cookieString += `; samesite=${opts.sameSite}`;
      }

      document.cookie = cookieString;
    },
    [defaultOptions, isCookiesEnabled]
  );

  const remove = useCallback(
    (name: string, options?: CookieOptions) => {
      if (!isCookiesEnabled) return;

      const opts = { ...defaultOptions, ...options };
      // Устанавливаем expires в прошлое для удаления
      const removeOptions: CookieOptions = {
        ...opts,
        expires: new Date(0), // 1970-01-01
      };
      set(name, "", removeOptions);
    },
    [defaultOptions, isCookiesEnabled, set]
  );

  const getAll = useCallback((): Record<string, string> => {
    if (!isCookiesEnabled) return {};
    return parseCookies(document.cookie);
  }, [isCookiesEnabled]);

  return {
    get,
    set,
    remove,
    getAll,
  };
}
