import { Badge } from "@/components/ui/badge";

const assignmentsData = [
  {
    subject: "Chemistry",
    chapter: 5,
    task: "Daily task",
    page: 10,
    time: "11:00 AM",
    status: "Pending",
  },
  {
    subject: "Physics",
    chapter: 4,
    task: "Daily task",
    page: 18,
    time: "11:40 AM",
    status: "Pending",
  },
  {
    subject: "Biology",
    chapter: 2,
    task: "Daily task",
    page: 12,
    time: "10:00 AM",
    status: "Completed",
  },
];

export default function Assignments() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Assignments</h2>
      <div className="space-y-4">
        {assignmentsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium">{item.subject}</h3>
              <p className="text-sm text-gray-500">Chapter {item.chapter}</p>
            </div>
            <div className="text-right">
              <p>{item.task}</p>
              <p className="text-sm text-gray-500">Page {item.page}</p>
            </div>
            <div className="text-right">
              <p>{item.time}</p>
              <Badge
                variant={item.status === "Completed" ? "success" : "warning"}
              >
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
