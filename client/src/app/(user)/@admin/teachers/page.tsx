import React from "react";

type Teacher = {
  id: string; //STT
  teacherId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
  faculty: string;
  position: string;
};

const TeachersPage = () => {
  return <div className="mt-16">Teachers Page</div>;
};

export default TeachersPage;
