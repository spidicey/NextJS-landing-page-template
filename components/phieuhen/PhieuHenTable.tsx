"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "../data-table/data-table";
import { DataTableFilterField } from "@/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { fetcher } from "@/lib/fetcher";

interface PostsTableProps {
  title?: string;
}

const PhieuHenTable = ({ title }: PostsTableProps) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token-client");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const filterFields: DataTableFilterField<PhieuHen>[] = [
    {
      label: "Nhân viên",
      value: "nhanVien",
      placeholder: "Nhập tên nhân viên",
    },
    {
      label: "Khách Hàng",
      value: "khachHang",
      placeholder: "Nhập tên khách hàng",
    },
    {
      label: "Trạng thái",
      value: "trangThai",
      placeholder: "Filter trạng thái...",
      options: [
        {
          label: "Đang chờ",
          value: "Đang chờ",
        },
        {
          label: "Hoàn thành",
          value: "Hoàn thành",
        },
        {
          label: "Đang huỷ",
          value: "Đã hủy",
        },
      ],
    },
  ];

  const { data, isLoading, error } = useSWR<ResponseData<PhieuHen[]>>(
    username
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/phieuhen/khachhang/username/${username}`
      : null, // Avoid calling SWR until username is available
    fetcher,
  );

  if (!username) return <div>Loading...</div>;
  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>Error loading data</div>;

  console.log(data?.data, username);

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{title ? title : "Posts"}</h3>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        filterFields={filterFields}
      />
    </div>
  );
};

export default PhieuHenTable;
