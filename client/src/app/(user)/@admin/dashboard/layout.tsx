import Header from "../../components/header";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tổng Quan",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex">
      <div className="w-full h-16 fixed ">
        <Header />
      </div>
      <div className=" w-[85%] md:w-[78%] 2xl:w-[82%]">{children}</div>
      <Toaster />
      <div className="fixed right-0 w-[20%] 2xl:w-[16%]"></div>
    </section>
  );
}
