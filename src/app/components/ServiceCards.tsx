// src/app/components/ServiceCards.tsx
"use client";

import React from "react";
import { Activity, Users, FlaskConical, Bed, TrendingUp } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const services: Service[] = [
  {
    title: "Діагностика",
    description: "Сучасні методи діагностики",
    icon: Activity,
  },
  {
    title: "Поліклініка",
    description: "Консультація висококваліфікованих лікарів",
    icon: Users,
  },
  {
    title: "Лабораторія",
    description: "Надійні та точні аналізи",
    icon: FlaskConical,
  },
  {
    title: "Стаціонар",
    description: "Комплексне лікування та догляд",
    icon: Bed,
  },
  {
    title: "Фізіотерапія",
    description: "Відновлення рухової активності",
    icon: TrendingUp,
  },
  {
    title: "Фізіотерапія",
    description: "Відновлення рухової активності",
    icon: TrendingUp,
  },
];

export default function ServiceCards() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div key={idx} className="group">
                <div
                  className={
                    "bg-[#319c9c] rounded-xl p-6 h-full shadow transition-transform duration-300 ease-out " +
                    "hover:scale-105 hover:shadow-2xl"
                  }
                >
                  <Icon className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-xl text-white font-semibold mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-200">{svc.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
