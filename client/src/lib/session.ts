import redis from "@/lib/redis";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret";

export async function initial_User(user: any, res: NextApiResponse) {
  const accessToken = jwt.sign(
    { username: user.username, role: user.role, id: user.id },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { username: user.username, role: user.role, id: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "24h" }
  );

  // Lưu Refresh Token vào Redis
  await redis.set(`refresh_token:${user.id}`, refreshToken, "EX", 24 * 60 * 60);

  // Lưu Access Token và Refresh Token vào cookie
  res.setHeader("Set-Cookie", [
    serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 60, //15 minutes
      path: "/",
    }),
    serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 30, // 30 days
      path: "/",
    }),
  ]);

  return res.status(200).json({ message: "Login successful" });
}
