import Pagination from "../_components/pagination";
import StudentPageContainer from "./studentListPage";
import { listStudents } from "@/app/api/listStudent";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = searchParams?.page || "1";

  try {
    const response = await listStudents({ page });
    const total = response?.result?.total || 1;
    const limit = response?.result?.limit || 2;

    return (
      <div className="container m-auto ">
        <StudentPageContainer page={page} />
        <Pagination total={total} limit={limit} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return <div>Đã có lỗi xảy ra, vui lòng thử lại trong giây lát</div>;
  }
}
