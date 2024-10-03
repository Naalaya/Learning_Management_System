import FormModal from "../_components/formModal";
import { students } from "./seed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Plus, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Student = {
  id: number;
  name: string;
  code: string;
  avatar: string | null;
  joined_date: string;
  address: string;
  phone: string;
};

export default async function StudentPage() {
  const response = await students();
  let studentData: Student[] = [];

  if (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success
  ) {
    if ("result" in response && Array.isArray(response.result)) {
      studentData = response.result as Student[];
    }
  }

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Tất Cả Sinh Viên</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-8" placeholder="Tìm kiếm..." />
        </div>
        <div className="space-x-2 flex">
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          {/* <CreateStudentModal type="create" /> */}
          {/* <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button> */}
          <FormModal table="student" type="create" />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Thông Tin",
                "Mã Sinh Viên",
                "Ngày Tham Gia",
                "Số Điện Thoại",
                "Địa Chỉ",
                "",
              ].map((title, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studentData.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-lamaPurpleLight hover:scale-[101%]"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={student.avatar || "/placeholder-avatar.png"}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.code}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.joined_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/students/${student.id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Eye className="inline-block h-5 w-5" />
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="inline-block h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
