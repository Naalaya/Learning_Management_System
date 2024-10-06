"use client";

import { deleteStudents } from "@/app/api/actions";
import { useToast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// USE LAZY LOADING

const TeacherForm = dynamic(() => import("./forms/teacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/studentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms = {
  teacher: (type: any, data: any) => <TeacherForm type={type} data={data} />,
  student: (type: any, data: any) => <StudentForm type={type} data={data} />,
};

const deleteStudent = async (studentID: number) => {
  try {
    const { success } = await deleteStudents(studentID.toString());
    if (success) {
      return { sucess: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const [open, setOpen] = useState(false);
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";
  const { toast } = useToast();
  const Form = () => {
    if (type === "delete" && id) {
      return (
        <form className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            Bạn có chắc chắn xoá {table} này chứ?
          </span>
          <button
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
            onClick={async () => {
              // Changed to async
              const { success } = await deleteStudent(id);
              if (!success) {
                toast({
                  title: "Đã có lỗi xảy ra",
                  description: `Không thể xoá ${table} này`,
                  variant: "destructive",
                });
              }
              toast({
                title: `Xoá thành công ${table}`,
                variant: "success",
              });
              window.location.reload();
            }}
          >
            Delete
          </button>
        </form>
      );
    } else if (type === "create" || type === "update") {
      if (table in forms) {
        // Check if table is a valid key
        return forms[table as keyof typeof forms](type, data); // Type assertion added
      } else {
        return "Form not found for the specified table!";
      }
    } else {
      return "Form not found!";
    }
  };

  return (
    <div>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
