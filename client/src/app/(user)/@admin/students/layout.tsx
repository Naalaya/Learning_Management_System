import Header from "../../components/header";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản Lý Sinh Viên",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex">
      {/* <div className="mt-16 w-[85%] md:w-[78%] 2xl:w-[82%]">{children}</div> */}
      <div className="w-full">{children}</div>
      <Toaster />
    </section>
  );
}
