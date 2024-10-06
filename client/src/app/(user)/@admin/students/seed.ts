import { students } from "@/app/api/listStudent";

type Student = {
  id: number;
  name: string;
  code: string;
  avatar: string | null;
  joined_date: string;
  address: string;
  phone: string;
};
export const studentList = async () => {
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
  return studentData;
};
