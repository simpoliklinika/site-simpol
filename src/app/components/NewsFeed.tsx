"use client";

import { useState } from "react";
import { Button } from "@/components/button";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New State-of-the-Art MRI Machine Installed",
    date: "2025-02-10",
    summary:
      "Our hospital has recently acquired a cutting-edge MRI machine, enhancing our diagnostic capabilities.",
    content:
      "We are excited to announce the installation of our new state-of-the-art MRI machine. This advanced technology will allow us to provide more accurate and detailed imaging for our patients, leading to improved diagnoses and treatment plans. The new machine features faster scanning times and higher resolution images, making the process more comfortable for patients and more efficient for our staff.",
  },
  {
    id: 2,
    title: "Community Health Fair Scheduled for Next Month",
    date: "2025-02-05",
    summary:
      "Join us for our annual Community Health Fair, featuring free health screenings and educational workshops.",
    content:
      "Mark your calendars for our upcoming Community Health Fair, scheduled for next month. This event will offer free health screenings, including blood pressure checks, cholesterol tests, and diabetes risk assessments. Additionally, we'll be hosting a series of educational workshops on topics such as nutrition, exercise, and mental health. Don't miss this opportunity to take charge of your health and learn from our expert medical staff.",
  },
  {
    id: 3,
    title: "Dr. Jane Smith Joins Our Cardiology Department",
    date: "2025-01-28",
    summary:
      "We're pleased to welcome Dr. Jane Smith, a renowned cardiologist, to our medical team.",
    content:
      "We are thrilled to announce that Dr. Jane Smith, a highly respected cardiologist, has joined our hospital's Cardiology Department. Dr. Smith brings over 15 years of experience in treating complex cardiovascular conditions and has published numerous research papers in leading medical journals. Her expertise in minimally invasive cardiac procedures will greatly benefit our patients and enhance our hospital's cardiac care services.",
  },
];

export default function NewsFeed() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      {newsItems.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-500 text-sm mb-4">{item.date}</p>
          <p className="text-gray-600 mb-4">
            {expandedItems.includes(item.id) ? item.content : item.summary}
          </p>
          <button
            type="button"
            onClick={() => toggleItem(item.id)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#319c9c] focus:ring-offset-2"
          >
            {expandedItems.includes(item.id) ? "Show Less" : "Show More"}
          </button>
        </div>
      ))}
    </div>
  );
}
