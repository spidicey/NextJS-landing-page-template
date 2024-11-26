"use client";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";

interface PostsTableProps {
  id?:number;
  limit?: number;
  title?: string;
}

const CTDonHangaTable = ({id, limit, title }: PostsTableProps) => {
  const { data, isLoading, error } = useSWR<ResponseData<CtDonHang[]>>(
    `http://localhost:8080/api/thanh-toan/ct-don-hang/${id}`,
    fetcher
  );
  const state = {
    data: data,
    columns: [],
    searchInput: ""
  };
  if (isLoading) return <div>Loading...</div>;
  console.log(data?.data);
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        // filterFields={filterFields}
      />
    </div>
  );
};

export default CTDonHangaTable;
