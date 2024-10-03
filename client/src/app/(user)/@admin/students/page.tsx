import React from "react";

type Student = {
  id: number; // STT
  studentId: string; //MSSV
  name: string;
  email: string;
  schoolemail: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const StudentsPage = () => {
  return <div className="mt-16">Students Page</div>;
};

export default StudentsPage;
