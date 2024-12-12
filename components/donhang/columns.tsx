"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UpdateDonHang } from "./updateDonHang";
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
export const columns: ColumnDef<PhieuSua>[] = [
  {
    accessorKey: "idPhieuSua",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Phiếu Sửa" />
    ),
  },
  {
    accessorKey: "khachHang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách Hàng" />
    ),
    filterFn: (row, columnId, value) => {
      const khachHang = row.getValue(columnId) as KhachHang;
      console.log(
        khachHang?.tenKhachHang?.toLowerCase().includes(value.toLowerCase()),
      );
      return khachHang?.tenKhachHang
        ?.toLowerCase()
        .includes(value.toLowerCase());
    },
    cell: (info) => (info.getValue() as KhachHang)?.tenKhachHang,
  },
  {
    accessorKey: "tenSanPham",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Sản Phẩm" />
    ),
  },
  {
    accessorKey: "nhanVien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhân Viên" />
    ),
    cell: (info) => (info.getValue() as NhanVien)?.hoTen,
  },
  {
    accessorKey: "moTa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô Tả" />
    ),
  },
  {
    accessorKey: "loaiSuaChua",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại Sửa Chữa" />
    ),
  },
  {
    accessorKey: "baoGia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Báo Giá" />
    ),
  },
  {
    accessorKey: "ngayTao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày Tạo" />
    ),
    cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
  },
  {
    accessorKey: "giaLinhKien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá linh kiện" />
    ),
  },
  {
    accessorKey: "tongGia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tổng Giá" />
    ),
    cell: ({ row }) => {
      const baoGia = (row.getValue("baoGia") as number) || 0;
      const giaLinhKien = (row.getValue("giaLinhKien") as number) || 0;
      const loaiSuaChua = (row.getValue("loaiSuaChua") as String) || "Sửa chữa";
      const tongGia = baoGia + giaLinhKien;
      if (loaiSuaChua === "Bảo hành") {
        return "0 đ";
      }
      return tongGia.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const phieusua = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/profile/donhang/${phieusua.idPhieuSua}`}>Chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
