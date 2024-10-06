"use server";

import { handleLogout } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const onLogout = async () => {
  const cookieStore = cookies();
  const role = cookieStore.get("ID")?.value;
  try {
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("No token found");

    await handleLogout(token, role);
    cookieStore.delete("token");
    cookieStore.delete("ID");

    // Return a success object before redirecting
    return { success: true, message: "Đăng xuất thành công" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error during logout",
    };
  }
};

export const createStudent = async (Form: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  token
    ? await fetch(`${process.env.API_URL_ADMIN}/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Form),
      }).then((response) =>
        response.ok
          ? response.json().then((data) => ({
              success: true,
              result: data.result,
            }))
          : Promise.resolve({ success: false })
      )
    : Promise.reject("No token found");
  redirect("/students");
};
// export const deleteStudents = async (studentID: string) => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token")?.value;
//   token
//     ? await fetch(`${process.env.API_URL_ADMIN}/student/${studentID}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((response) =>
//         response.ok
//           ? response.json().then((data) => ({
//               success: true,
//               result: data.result,
//             }))
//           : Promise.resolve({ success: false })
//       )
//     : Promise.reject("No token found");
// };

export const deleteStudents = async (studentID: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return Promise.reject("No token found");

  const response = await fetch(
    `${process.env.API_URL_ADMIN}/student/${studentID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return { success: true, result: data.result }; // Return success object
  } else {
    return { success: false }; // Return failure object
  }
};
