import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 7 }, (_, i) => i + 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center my-1">
        <h2 className="text-xl font-semibold text-blue-900">November 2023</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-blue-600 hover:text-blue-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, index) => (
          <div key={index} className="text-sm font-medium text-blue-600">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-blue-800 hover:bg-blue-100"
          >
            {date}
          </Button>
        ))}
      </div>
    </div>
  );
}
