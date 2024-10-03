"use client";

import { onLogout } from "../../actions";
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
    <div className="h-full overflow-y-auto w-full sm:w-20 md:w-32 lg:w-64 flex flex-col items-center">
      {/* Logo */}
      <div className="w-full">
        <div className="flex justify-center items-center p-2 sm:p-4">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 justify-center"
          >
            <GraduationCap className="text-white sm:size-10 md:size-12 lg:size-14" />
            <span className="text-lg font-bold sm:text-xl lg:text-2xl hidden sm:inline-block">
              <span className="text-purple-800">Edu</span>
              <span className="text-white">Learn</span>
            </span>
          </Link>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
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
                <span className="text-xl sm:text-2xl">{icon}</span>
                <span className="hidden sm:inline-block">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="w-full p-2 sm:p-4">
        <Button
          variant="ghost"
          className="w-full flex justify-center sm:justify-start items-center text-blue-200 hover:bg-blue-700 hover:text-white py-2"
          onClick={async () => {
            const response = await onLogout();
            if (!response.success) {
              toast({
                variant: "destructive",
                title: "Đã có lỗi xảy ra",
                description: "Không thể đăng xuất vì " + response.message,
              });
            } else {
              toast({
                variant: "success",
                title: response.message,
              });
            }
            router.push("/");
          }}
        >
          <LogOut size={24} className="sm:mr-2" />
          <span className="hidden sm:inline-block text-sm">Đăng Xuất</span>
        </Button>
      </div>
    </div>
  );
};
