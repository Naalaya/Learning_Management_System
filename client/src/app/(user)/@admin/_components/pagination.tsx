"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface PaginationControlsProps {
  total: number;
  limit: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({ total, limit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const parsedPage = Number(pageParam ?? "1");
    if (!isNaN(parsedPage) && parsedPage >= 1) {
      setPage(parsedPage);
    } else {
      console.error("Invalid page number:", pageParam);
    }
  }, [searchParams]);

  if (total === 0) {
    return (
      <h1 className="font-bold text-center">
        KHÔNG TÌM THẤY THÔNG TIN YÊU CẦU
      </h1>
    );
  }

  const totalPages = Math.ceil(total / limit);

  if (page < 1 || page > totalPages) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    try {
      router.push(`${pathName}?page=${newPage}`);
    } catch (error) {
      console.error("Error navigating to new page:", error);
    }
  };

  return (
    <div className="flex justify-center mt-3">
      <Pagination
        boundaries={2}
        loop
        showControls
        showShadow
        total={totalPages}
        initialPage={page}
        color="success"
        classNames={{
          wrapper: "gap-1 overflow-visible h-8 rounded border border-divider",
          item: "w-8 h-8 text-small rounded-none bg-transparent hover:bg-purple-400 hover:rounded-lg",
          cursor:
            "bg-purple-500 rounded-lg shadow-lg from-default-500 to-default-800 text-white font-bold",
          prev: "dark:text-white dark:bg-gray-500 hover:bg-purple-400 hover:rounded-lg",
          next: "dark:text-white dark:bg-gray-500 hover:bg-purple-400 hover:rounded-lg",
        }}
        onChange={handlePageChange}
        page={page}
      />
    </div>
  );
};

export default PaginationControls;
