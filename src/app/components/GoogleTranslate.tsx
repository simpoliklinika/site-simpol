// src/app/components/GoogleTranslate.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
  useEffect(() => {
    // колбек, який викликає офіційний скрипт через ?cb=
    window.googleTranslateElementInit = () => {
      const ctor = window.google?.translate?.TranslateElement;
      if (!ctor) return;

      const simple = ctor.InlineLayout?.SIMPLE;
      // збираємо опції; layout підставляємо тільки якщо є (щоб не падало)
      const opts: ConstructorParameters<typeof ctor>[0] = {
        pageLanguage: "uk",
        includedLanguages: "en",
        ...(typeof simple === "number" ? { layout: simple } : {}),
      };

      // контейнер можна давати як id або HTMLElement
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - TS не розуміє що ctor — це newable interface, але воно працює
      new ctor(opts, "google_translate_element");
    };

    // cleanup (не обов’язково, але акуратно)
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
