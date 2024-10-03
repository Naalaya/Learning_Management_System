"use client";

import { useRouter } from "next/navigation";

const scheduleData = [
  {
    id: 1,
    subject: "Physics",
    chapters: "6 of 20 chapters",
    time: "17:00 - 18:00",
  },
  {
    id: 2,
    subject: "Chemistry",
    chapters: "8 of 20 chapters",
    time: "18:00 - 19:00",
  },
  {
    id: 3,
    subject: "Mathmetics",
    chapters: "5 of 20 chapters",
    time: "19:00 - 20:00",
  },
  {
    id: 4,
    subject: "Biology",
    chapters: "4 of 20 chapters",
    time: "21:00 - 22:00",
  },
  {
    id: 5,
    subject: "Social",
    chapters: "7 of 20 chapters",
    time: "16:00 - 17:00",
  },
];
export default function Schedule() {
  const router = useRouter();
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-semibold">Schedule</h2>
        {/* Go to Calendar Page when click on this one */}
        <a
          className="text-sm text-blue-600 hover:underline"
          onClick={() => router.push(`/calendar`)}
        >
          See all
        </a>
      </div>
      <div className="space-y-4">
        {scheduleData.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              {item.id}
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">{item.subject}</h3>
              <p className="text-sm text-gray-500">{item.chapters}</p>
            </div>
            <div className="text-sm text-gray-500">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
