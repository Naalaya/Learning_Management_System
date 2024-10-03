import SideBar from "./_components/sideBar/sideBar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex bg-green-100">
      <nav className="w-[14%] md:w-[10%] xl:w-[14%]">
        <SideBar />
      </nav>

      <div className="flex-col justify-between items-center w-[86%] md:w-[90%] xl:w-[86%] overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
  // return <section className="justify-center items-center">{children}</section>;
}
