"use client";
import useSWR from "swr";
import { DataTable } from "../data-table/data-table";
import { columns } from "./columns";
import { fetcher } from "@/lib/fetcher";

interface PostsTableProps {
  limit?: number;
  title?: string;
  idKhachHang?: number;
}

const DonHangTable = ({ limit, title, idKhachHang }: PostsTableProps) => {
  const { data, isLoading, error } = useSWR<ResponseData<DonHang[]>>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/thanh-toan/don-hang/khach-hang/${idKhachHang}`,
    fetcher,
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{title ? title : "Posts"}</h3>
      {/* <AddPhieuSua/> */}
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        // filterFields={filterFields}
      />
    </div>
  );
};

export default DonHangTable;
