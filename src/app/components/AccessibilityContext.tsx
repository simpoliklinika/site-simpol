"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AccessSettings = {
  zoom: number; // 1–2
  invert: boolean;
  highContrast: boolean;
};

const defaultSettings: AccessSettings = {
  zoom: 1,
  invert: false,
  highContrast: false,
};

interface Ctx {
  settings: AccessSettings;
  setSettings: (s: Partial<AccessSettings>) => void;
  reset: () => void;
}

const STORAGE_KEY = "accessibility-settings";

const AccessibilityContext = createContext<Ctx>({
  settings: defaultSettings,
  setSettings: () => {},
  reset: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, update] = useState<AccessSettings>(defaultSettings);

  /* 1) Завантаження з localStorage */
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        update({ ...defaultSettings, ...parsed });
      }
    } catch {}
  }, []);

  /* 2) Застосувати ефекти + зберегти в localStorage */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}

    const body = document.body;

    // ---- Масштаб ----
    const z = Number(settings.zoom || 1);

    // спочатку скидаємо попередні значення
    (body.style as any).zoom = "";
    body.style.transform = "";
    body.style.width = "";

    // Chromium/Safari (нестандартний zoom)
    (body.style as any).zoom = String(z);

    // Firefox — fallback
    const isFirefox =
      typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent);
    if (isFirefox) {
      body.style.transformOrigin = "0 0";
      if (z !== 1) {
        body.style.transform = `scale(${z})`;
        body.style.width = `${100 / z}%`;
      }
    }

    // ---- Фільтри ----
    const filters: string[] = [];
    if (settings.invert) filters.push("invert(1)", "hue-rotate(180deg)");
    if (settings.highContrast) filters.push("contrast(1.3)");
    body.style.filter = filters.join(" ");
  }, [settings]);

  /* 3) Alt+0 — скидання */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "0") {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const merge = (s: Partial<AccessSettings>) => update((p) => ({ ...p, ...s }));
  const reset = () => update(defaultSettings);

  return (
    <AccessibilityContext.Provider
      value={{ settings, setSettings: merge, reset }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
