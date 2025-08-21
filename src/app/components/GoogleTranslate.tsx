// src/app/components/GoogleTranslate.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
  useEffect(() => {
    // Колбек, який викликає офіційний скрипт через ?cb=
    window.googleTranslateElementInit = () => {
      const ctor = window.google?.translate?.TranslateElement;
      if (!ctor) return;

      const simple = ctor.InlineLayout?.SIMPLE;

      const opts: {
        pageLanguage?: string;
        includedLanguages?: string; // "uk,en,pl"
        layout?: number; // InlineLayout.SIMPLE
        autoDisplay?: boolean;
      } = {
        pageLanguage: "uk",
        includedLanguages: "en",
      };

      if (typeof simple === "number") {
        opts.layout = simple;
      }

      new ctor(opts, "google_translate_element");
    };

    return () => {
      try {
        delete window.googleTranslateElementInit;
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" />
      <Script
        id="google-translate"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
