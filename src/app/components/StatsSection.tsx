// src/app/components/StatsSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  label: string;
  value: number;
}

const stats: StatItem[] = [
  { label: "Років досвіду", value: 75 },
  { label: "Успішних лікарів", value: 450 },
  { label: "Дбайливих медсестер", value: 700 },
  { label: "Пацієнтів щороку", value: 40000 },
  { label: "Операцій щороку", value: 30000 },
  { label: "Консультацій щороку", value: 200000 },
];

/**
 * Хук для анімації: плавний відлік від 0 до target протягом duration мс
 * Починає анімацію лише коли `start` = true
 */
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

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-8 gap-x-4">
        {stats.map((stat, idx) => {
          const count = useCountUp(stat.value, 2000, visible);
          return (
            <div key={idx} className="text-center">
              <div className="text-5xl font-bold">{count.toLocaleString()}</div>
              <div className="mt-2 text-lg font-semibold">{stat.label}</div>
            </div>
          );
        })}
      </div>
      <p className="mt-12 text-center text-lg max-w-3xl mx-auto">
        Наша місія – якісна і доступна медицина, доказові практики, сучасний
        менеджмент, безпечна праця медиків.
      </p>
    </div>
  );
}
