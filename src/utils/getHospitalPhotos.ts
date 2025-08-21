import fs from "fs";
import path from "path";

/**
 * Зчитує фото з /public/<folder>.
 * Для FB_IMG_* / IMG_* заголовки не показуємо, alt: "Фото лікарні №N".
 * Сортуємо за mtime (хронологія).
 */
export async function getHospitalPhotos(folder = "hospital"): Promise<
  Array<{ id: number; src: string; alt?: string; title?: string; description?: string; href?: string }>
> {
  const dir = path.join(process.cwd(), "public", folder);
  const allowed = new Set([".jpg",".jpeg",".png",".webp",".avif",".JPG",".JPEG",".PNG",".WEBP",".AVIF"]);
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir)
    .filter((f) => allowed.has(path.extname(f)))
    .map((file) => ({ file, stat: fs.statSync(path.join(dir, file)) }))
    .sort((a, b) => a.stat.mtimeMs - b.stat.mtimeMs);

  return entries.map(({ file }, i) => {
    const n = i + 1;
    const base = file.replace(/\.[^.]+$/, "");
    const isDeviceName = /^FB_IMG_|^IMG_/i.test(base);
    const human = isDeviceName ? `Фото лікарні №${n}` : toTitle(base);

    return {
      id: n,
      src: `/${folder}/${file}`,
      title: isDeviceName ? undefined : human,
      alt: human,
      description: undefined,
      href: undefined,
    };
  });
}

function toTitle(s: string) {
  return s.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
