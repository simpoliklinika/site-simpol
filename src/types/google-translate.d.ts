// src/types/google-translate.d.ts
export {};

type TranslateElementInlineLayout = {
  SIMPLE: number;
};

interface TranslateElementCtor {
  new (
    options: {
      pageLanguage?: string;
      includedLanguages?: string; // кома-сепарейтед, напр. "uk,en,pl"
      layout?: number;            // посилання на InlineLayout.SIMPLE
      autoDisplay?: boolean;
    },
    container: string | HTMLElement
  ): unknown;
  InlineLayout: TranslateElementInlineLayout;
}

interface GoogleNamespace {
  translate: {
    TranslateElement: TranslateElementCtor;
  };
}

declare global {
  interface Window {
    google?: GoogleNamespace;
    googleTranslateElementInit?: () => void;
  }
}
