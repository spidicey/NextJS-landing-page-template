"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
export const columns: ColumnDef<CtDonHang>[] = [
  {
    accessorKey: "idPhieuSua",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Phiếu Sửa" />
    ),
  },
  // {
  //   accessorKey: "linhKien.tenSanPham",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Tên sản phẩm" />
  //   ),
  //   // cell: (info) => (info.getValue() as CTPhieuSua)?.linhKien.tenSanPham,
  // },
  // {
  //   accessorKey: "linhKien.nhanHieu",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Nhãn hiệu" />
  //   ),
  //   // cell: (info) => (info.getValue() as CTPhieuSua)?.linhKien.nhanHieu,
  // },
  {
    accessorKey: "phieuXuat.ngayCap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày cấp" />
    ),
  },
  {
    accessorKey: "linhKien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phụ kiện" />
    ),
    cell: (info) => (info.getValue() as LinhKien)?.tenSanPham,
  },
  {
    accessorKey: "phieuXuat.soLuong",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
  },
];
