// src/utils/strapi-homepage.ts
import { BlocksContent } from "@strapi/blocks-react-renderer";

const API = process.env.STRAPI_URL;

export type HomepageFull = { content: BlocksContent };

export async function fetchHomepage(): Promise<HomepageFull | null> {
  console.log("API=", API);

  const res = await fetch(`${API}/api/homepage`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Strapi", res.status, await res.text());
    return null;
  }

  const json = await res.json();

  // ⬇️  поля одразу в data, без .attributes
  const blocks = json.data?.text1 as BlocksContent | undefined;

  return { content: blocks ?? [] };
}
