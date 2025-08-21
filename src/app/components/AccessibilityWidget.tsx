"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useAccessibility } from "./AccessibilityContext";

export default function AccessibilityWidget() {
  const { settings, setSettings, reset } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Root у <html>, щоб не потрапляти під фільтри/масштаб body
    let el = document.getElementById("accessibility-widget-root-html");
    if (!el) {
      el = document.createElement("div");
      el.id = "accessibility-widget-root-html";
      document.documentElement.appendChild(el);
    }
    setRoot(el);

    // Захищені стилі
    const styleId = "accessibility-widget-styles-html";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        #accessibility-widget-root-html { position: static !important; z-index: auto; }
        #accessibility-widget-root-html .aw-portal,
        #accessibility-widget-root-html .aw-fab { position: fixed !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (!root) return null;

  const widget = (
    <div aria-hidden={false}>
      {open && (
        <div
          className="aw-portal"
          style={{
            zIndex: 2147483647,
            right: "1rem",
            bottom: "4.5rem",
            width: 288,
            borderRadius: 12,
            background: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            padding: 12,
            pointerEvents: "auto",
          }}
        >
          {/* UI */}
          <div>
            <label className="block text-sm font-medium">
              Масштаб: {Math.round((settings?.zoom ?? 1) * 100)}%
            </label>
            <input
              type="range"
              min={1}
              max={2}
              step={0.05}
              value={settings?.zoom ?? 1}
              onChange={(e) => setSettings({ zoom: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={!!settings?.invert}
                onChange={(e) => setSettings({ invert: e.target.checked })}
              />
              <span style={{ fontSize: 13 }}>Інвертувати</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={!!settings?.highContrast}
                onChange={(e) =>
                  setSettings({ highContrast: e.target.checked })
                }
              />
              <span style={{ fontSize: 13 }}>Контраст</span>
            </label>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "6px 8px",
              borderRadius: 6,
            }}
          >
            Скинути (Alt+0)
          </button>
        </div>
      )}

      <button
        type="button"
        className="aw-fab"
        aria-label="Меню для слабозрячих"
        onClick={() => setOpen((o) => !o)}
        style={{
          right: "1rem",
          bottom: "1rem",
          zIndex: 2147483647,
          borderRadius: 9999,
          background: "#2563eb",
          color: "#fff",
          padding: "10px 12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          pointerEvents: "auto",
        }}
      >
        👁️
      </button>
    </div>
  );

  return ReactDOM.createPortal(widget, root);
}
