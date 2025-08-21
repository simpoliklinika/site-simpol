// src/utils/paidServicesTable.ts
import { getStrapiEntries, StrapiFetchOptions } from "./utils";

// Тип рядка таблиці — підставте тут вашу схему (або залиште any)
export interface PaidServiceRow {
  id: number;
  title: string;
  price: number;
  // …інші поля з вашого поля “table”
}

/**
 * Повертає масив рядків з поля `table` колекції `platni-poslugi-tablitsya`
 */
export async function getPaidServicesTable(
  options: StrapiFetchOptions = {}
): Promise<PaidServiceRow[]> {
  // витягнути всі записи, але populated тільки поле `table`
  const entries = await getStrapiEntries<{ table: PaidServiceRow[] }>(
    "platni-poslugi",
    { ...options, populate: "table" }
  );

  // якщо записів не знайдено — повернути порожній масив
  if (entries.length === 0) {
    console.warn("No Платні Послуги Таблиця entries found");
    return [];
  }

  // беремо перший запис (його ж у вас тільки один) і повертаємо його .table
  return entries[0].table;
}
