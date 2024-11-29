"use client";
import ProductCard from "@/components/Product";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
export default function Page() {
  const { data, isLoading, error } = useSWR<ResponseData<LinhKien[]>>(
    `http://localhost:8080/api/kho/linhkien`,
    fetcher,
  );
  console.log(data?.data);
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {data?.data.map((item) => (
        <Link
          key={item.idSanPham}
          href={`/san-pham/${item.idSanPham}`}
          className="w-full max-w-xs rounded-xl border"
        >
          <ProductCard
            imageSrc={
              item.danhSachAnh.length === 0
                ? "/coffee.webp"
                : item.danhSachAnh[0].url
            }
            productName={item.tenSanPham}
            price={item.gia}
          />
        </Link>
      ))}
      {/* {Array.from({ length: 16 }).map((_, index) => (
        <ProductCard
          key={index}
          imageSrc="/coffee.webp"
          productName={`Product ${index + 1}`}
          price={99 + index}
          description="Stylish and comfortable tee for everyday wear"
        />
      ))} */}
    </div>
  );
}
