"use client";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";

interface PostsTableProps {
  id?: number;
  limit?: number;
  title?: string;
}

const CTDonHangaTable = ({ id, limit, title }: PostsTableProps) => {
  const { data, isLoading, error } = useSWR<ResponseData<CtDonHang[]>>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/phieusua/details/phieusua/${id}`,
    fetcher,
  );
  const state = {
    data: data,
    columns: [],
    searchInput: "",
  };
  if (isLoading) return <div>Loading...</div>;
  console.log(data?.data);
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{title ? title : "Posts"}</h3>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        // filterFields={filterFields}
      />
    </div>
  );
};

export default CTDonHangaTable;
