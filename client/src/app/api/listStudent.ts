import { cookies } from "next/headers";

export const students = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return token
    ? fetch(`${process.env.API_URL_ADMIN}/student`, {
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
