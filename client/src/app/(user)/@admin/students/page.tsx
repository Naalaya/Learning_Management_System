import StudentPageContainer from "./studentListPage";

export default function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = searchParams?.page;
  return <StudentPageContainer page={page} />;
}
