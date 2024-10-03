"use client";

import { onLogout } from "../../../actions";
import { NavItems } from "./navItems";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@nextui-org/react";
import { GraduationCap, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const SidebarContent = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {}, [searchParams, router]);

  return (
    <div className="h-screen overflow-y-auto w-full flex flex-col">
      {/* Logo */}
      <div className="w-full">
        <div className="flex gap-2 justify-center items-center p-2 lg:p-3">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 justify-center"
          >
            <GraduationCap className="justify-between size-10 md:size-14 lg:justify-start" />
            <span className="hidden lg:text-2xl lg:block font-bold ">
              <span className="text-purple-800">Edu</span>
              <span className="text-white">Learn</span>
            </span>
          </Link>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full overflow-y-auto mt-4">
        <ul className="space-y-2 px-2">
          {NavItems.map(({ title, address, icon }) => (
            <li key={title}>
              <Link
                href={address}
                className={`flex items-center justify-center sm:justify-start rounded-r-full sm:rounded-r-full space-x-2 px-3 py-2 sm:px-4 sm:py-3 transition-colors ${
                  pathname === address
                    ? "bg-purple-500 text-white scale-105"
                    : "hover:bg-purple-500 hover:text-white hover:scale-105"
                }`}
              >
                <span className="">{icon}</span>
                <span className="hidden lg:block">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className=" w-full flex justify-center items-center p-2 lg:p-4">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center sm:justify-start text-blue-200 hover:bg-blue-700 hover:text-white hover:rounded-xl transition-all"
          onClick={async () => {
            const response = await onLogout();
            if (!response?.success) {
              toast({
                variant: "destructive",
                title: "Đã có lỗi xảy ra",
                description: "Không thể đăng xuất",
              });
            } else {
              toast({
                variant: "success",
                title: response.message,
              });
              router.push("/");
            }
          }}
        >
          <LogOut className="mr-2 md:mr-4" />
          <span className="hidden lg:inline-block">Đăng Xuất</span>
        </Button>
      </div>
    </div>
  );
};
