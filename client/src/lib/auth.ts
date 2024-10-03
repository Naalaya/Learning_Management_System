"use server";

// Check UserRole
export async function CheckUserRole(request: Request) {
  const res = await request.json();
  const userRole = res.payload?.data?.role;
  if (
    userRole === "Teacher" ||
    userRole === "Student" ||
    userRole === "Admin"
  ) {
    return userRole;
  } else {
    return null;
  }
}
// Verify token by get user info
export const getUserInfo = async (token: any, role: any) => {
  const API_URL =
    role === "1"
      ? process.env.API_URL_ADMIN
      : role === "2"
      ? process.env.API_URL_TEACHER
      : role === "3"
      ? process.env.API_URL_STUDENT
      : "";

  return token
    ? fetch(`${API_URL}/auth/info`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) =>
          response.ok
            ? response.json().then((data) => ({
                success: true,
                result: data.result,
              }))
            : Promise.resolve({ success: false })
        )
        .catch(() => ({ success: false }))
    : Promise.resolve(false); // Nếu không có token, trả về false
};

export const handleLogout = async (token: any, role: any) => {
  const API_URL =
    role === "1"
      ? process.env.API_URL_ADMIN
      : role === "2"
      ? process.env.API_URL_TEACHER
      : role === "3"
      ? process.env.API_URL_STUDENT
      : "";

  token
    ? fetch(`${API_URL}/auth/logout`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => (response.ok ? response.json() : false))
        .catch((error) => {
          return { success: false, message: error };
        })
    : false;
};
