"use client";

import { useEffect } from "react";

/**
 * Простий обгортковий компонент для Google Translate Embed.
 * Показує маленький дропдаун-селектор мов (укр ↔ англ).
 */
export default function GoogleTranslate() {
  useEffect(() => {
    // додатковий захист від повторного підключення
    if (document.getElementById("gt-script")) return;

    // глобальний callback, який викликає сам скрипт Google
    (window as any).googleTranslateElementInit = () => {
      /* eslint-disable no-new, @typescript-eslint/ban-ts-comment */
      // @ts-ignore – Google додає `google` у window динамічно
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "uk",
          includedLanguages: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      /* eslint-enable */
    };

    // підключаємо скрипт Google Translate
    const script = document.createElement("script");
    script.id = "gt-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    // контейнер, куди Google підставить дропдаун
    <div id="google_translate_element" className="text-sm" />
  );
}
