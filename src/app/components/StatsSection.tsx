// src/app/components/StatsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { fetchFromStrapi } from "@/utils/utils";

interface StatItem {
  label: string;
  value: number;
}

// Відповідь Strapi для single-type "stat" (Strapi v5) повертає поля без вкладеного attributes
interface StatData {
  id: number;
  deps: number; // Відділень
  doctors: number; // Лікарів
  vtruchan: number; // Хірургічних втручань
  decl: number; // Декларацій
  dosl: number; // Лабораторних досліджень
  cons: number; // Консультацій
  // інші метаполя можна ігнорувати
}

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

function StatCard({ label, value, visible }: StatItem & { visible: boolean }) {
  const count = useCountUp(value, 2000, visible);
  return (
    <div className="text-center">
      <div className="text-5xl font-bold">{count.toLocaleString()}</div>
      <div className="mt-2 text-lg font-semibold">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatItem[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        // Для single-type "stat" у Strapi v5 (flattened data)
        const resp = await fetchFromStrapi<{ data: StatData }>("stat", {
          populate: "*",
        });

        const data = resp?.data;
        console.log("👍 Strapi stat data:", data);
        if (!data) {
          console.warn("Статистика не знайдена");
          setStats([]);
          return;
        }

        setStats([
          { label: "Відділень", value: data.deps },
          { label: "Лікарів", value: data.doctors },
          { label: "Хірургічних втручань", value: data.vtruchan },
          { label: "Декларацій", value: data.decl },
          { label: "Лабораторних досліджень", value: data.dosl },
          { label: "Консультацій", value: data.cons },
        ]);
      } catch (error) {
        console.error("Помилка при завантаженні статистики:", error);
        setStats([]);
      }
    }
    loadStats();
  }, []);

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

  return (
    <div ref={ref} className="py-16 bg-[#319c9c] text-white">
      {stats === null ? (
        <p className="text-center">Завантаження статистики…</p>
      ) : stats.length === 0 ? (
        <p className="text-center text-red-200">Не вдалося отримати дані.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-8 gap-x-4">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} visible={visible} />
            ))}
          </div>
          <p className="mt-12 text-center text-lg max-w-3xl mx-auto">
            Наша місія – якісна і доступна медицина, доказові практики, сучасний
            менеджмент, безпечна праця медиків.
          </p>
        </>
      )}
    </div>
  );
}
