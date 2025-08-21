// src/components/NewsContent.tsx
"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface NewsContentProps {
  content: BlocksContent;
}

export default function NewsContent({ content }: NewsContentProps) {
  return (
    <div className="prose prose-lg mb-8">
      <BlocksRenderer content={content} />
    </div>
  );
}
