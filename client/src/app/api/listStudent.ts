import { cookies } from "next/headers";

export const listStudents = async (page: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return token
    ? fetch(`${process.env.API_URL_ADMIN}/student/?page=${page.page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) =>
          response.ok
            ? response.json().then((data) => ({
                success: true,
                result: data.result.items,
              }))
            : Promise.resolve({ success: false })
        )
        .catch(() => ({ success: false }))
    : Promise.resolve(false); // Nếu không có token, trả về false
};
export const getStudentInfo = async (id: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return token
    ? fetch(`${process.env.API_URL_ADMIN}/student/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) =>
          response.ok
            ? response.json().then((data) => ({
                success: true,
                result: data.result.items,
              }))
            : Promise.resolve({ success: false })
        )
        .catch(() => ({ success: false }))
    : Promise.resolve(false); // Nếu không có token, trả về false
};
