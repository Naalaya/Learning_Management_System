"use client";

import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner
        label="Đang tải dữ liệu, bạn vui lòng chờ trong giây lát ..."
        color="primary"
      />
      {/* <h2 className="text-5xl text-yellow-600">Đang tải! Vui lòng chờ</h2> */}
    </div>
  );
}
