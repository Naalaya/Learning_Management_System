"use client";

import { Login } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <form
        action={async (FormData) => {
          const response = await Login(FormData);
          setError(null);
          if (response.status === 200) {
            // On successful login, redirect to the dashboard
            window.location.href = "/dashboard";
          } else {
            // Handle error messages (e.g., show them to the user)
            setError(
              response.error || "Đăng nhập không thành công, vui lòng thử lại"
            );
          }
          // if (response.error) {
          //   setError(
          //     response.error || "Đăng nhập không thành công, vui lòng thử lại"
          //   );
          // }
        }}
        className="space-y-6"
      >
        <div>
          <Label htmlFor="role_id" className="text-white">
            Đăng nhập với
          </Label>
          <Select
            name="role_id"
            onValueChange={(value) => {
              const roleMap = {
                "quản trị viên": 1,
                "giảng viên": 2,
                "sinh viên": 3,
              };
              const roleId = roleMap[value as keyof typeof roleMap];
              // You can use roleId here or set it to a state if needed
            }}
          >
            <SelectTrigger className="bg-white bg-opacity-20 border-white border-opacity-20 text-white">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Quản trị viên</SelectItem>
              <SelectItem value="2">Giảng viên</SelectItem>
              <SelectItem value="3">Sinh viên</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="username" className="text-white">
            Tài khoản
          </Label>
          <Input
            name="username"
            type="text"
            className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
            placeholder="vui lòng nhập tài khoản"
            required
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-white">
            Mật khẩu
          </Label>
          <Input
            name="password"
            type="password"
            className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
            placeholder="vui lòng nhập mật khẩu"
            required
          />
        </div>
        {/** Maybe can use toaster */}
        {error && <p className="text-red-500 text-center text-lg">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Đăng Nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
