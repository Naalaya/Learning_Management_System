"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Login = async (FormData: any) => {
  // Init Data
  const form = Object.fromEntries(FormData);
  const API_URL =
    form.role_id === "1"
      ? process.env.API_URL_ADMIN
      : form.role_id === "2"
      ? process.env.API_URL_TEACHER
      : form.role_id === "3"
      ? process.env.API_URL_STUDENT
      : "";
  const formString = JSON.stringify(form);
  // Call API directly
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formString,
  });

  const { code, result, message } = await response.json();

  // Check response
  if (!response.ok || !result?.access_token) {
    // If the login fails, return an error to the client
    return {
      status: 400,
      error: message || "Login failed",
    };
  }

  // Set the cookie for a successful login
  cookies().set("token", result.access_token, {
    httpOnly: true,
    // // Enable secure in production
    // secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  cookies().set("ID", form.role_id, {
    httpOnly: true,
    path: "/",
  });
  // Redirect only after successful login
  redirect("/dashboard");
};
