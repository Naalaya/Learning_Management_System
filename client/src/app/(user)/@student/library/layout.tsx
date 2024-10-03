import RightSectionBar from "../../components/DashboardRightSectionBar";
import Header from "../../components/header";
import SideBar from "../../components/sideBar/sideBar";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang Chủ",
  description: "Generated by create next app",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <header className="absolute"> */}
      <Header />
      {/* </header> */}
      <main>{children}</main>
      <aside className=" fixed overflow-y-auto right-0 h-full rounded-l-2xl bg-blue-400">
        <RightSectionBar />
      </aside>
    </>
  );
}
