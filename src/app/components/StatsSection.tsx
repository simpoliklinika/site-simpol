"use client";

import { useEffect, useRef, useState } from "react";

// Тип даних, які приходять з сервера
export interface StatsData {
  deps: number;
  doctors: number;
  vtruchan: number;
  decl: number;
  dosl: number;
  cons: number;
}

interface StatItem {
  label: string;
  value: number;
}

// --- Хук для анімації цифр ---
function useCountUp(target: number, duration = 2000, start = true) {
  const [count, setCount] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    frame.current = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const increment = target / totalFrames;

    function update() {
      frame.current++;
      const next = Math.min(Math.round(increment * frame.current), target);
      setCount(next);
      if (frame.current < totalFrames) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    return () => {
      frame.current = totalFrames;
    };
  }, [target, duration, start]);

  return count;
}

// --- Картка однієї статистики ---
function StatCard({ label, value, visible }: StatItem & { visible: boolean }) {
  const count = useCountUp(value, 2000, visible);
  return (
    <div className="text-center">
      <div className="text-5xl font-bold">{count.toLocaleString()}</div>
      <div className="mt-2 text-lg font-semibold">{label}</div>
    </div>
  );
}

// --- Головний компонент ---
// Тепер він приймає дані через пропси (initialData)
export default function StatsSection({
  initialData,
}: {
  initialData: StatsData | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Перетворюємо об'єкт даних у масив для рендеру
  // Якщо даних немає (null), ставимо нулі або пустий масив
  const stats: StatItem[] = initialData
    ? [
        { label: "Відділень", value: initialData.deps },
        { label: "Лікарів", value: initialData.doctors },
        { label: "Хірургічних втручань", value: initialData.vtruchan },
        { label: "Декларацій", value: initialData.decl },
        { label: "Лабораторних досліджень", value: initialData.dosl },
        { label: "Консультацій", value: initialData.cons },
      ]
    : [];

  // Intersection Observer для запуску анімації при скролі
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Якщо дані не прийшли з сервера, секцію можна приховати або показати заглушку
  if (!initialData) {
    return null;
  }

  return (
    <div ref={ref} className="py-16 bg-[#319c9c] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-8 gap-x-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} visible={visible} />
          ))}
        </div>
        <p className="mt-12 text-center text-lg max-w-3xl mx-auto">
          Наша місія – якісна і доступна медицина, доказові практики, сучасний
          менеджмент, безпечна праця медиків.
        </p>
      </div>
    </div>
  );
}
