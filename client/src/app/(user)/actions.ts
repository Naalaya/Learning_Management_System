"use server";

import { handleLogout } from "@/lib/auth";
import { cookies } from "next/headers";

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
