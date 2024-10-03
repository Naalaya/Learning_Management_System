// import { students } from "../seed";
// import { ArrowLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// export default function SinhVienPage({ params }: { params: { id: string } }) {
//   const student = students.find((s) => s.id === parseInt(params.id, 10));

//   if (!student) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <Link
//         href="/students"
//         className="inline-flex items-center text-blue-500 hover:underline mb-4"
//         passHref
//       >
//         <>
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Quay lại
//         </>
//       </Link>
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center mb-4">
//           <Image
//             className="h-16 w-16 rounded-full mr-4"
//             src={student.avatar}
//             alt=""
//             width={64}
//             height={64}
//           />
//           <h1 className="text-2xl font-bold">{student.name}</h1>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-500">Mã Sinh Viên</p>
//             <p className="font-medium">{student.id}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Lớp</p>
//             <p className="font-medium">{student.class}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Số Điện Thoại</p>
//             <p className="font-medium">{student.phone}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Địa Chỉ</p>
//             <p className="font-medium">{student.address}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

const page = () => {
  return <div></div>;
};

export default page;
