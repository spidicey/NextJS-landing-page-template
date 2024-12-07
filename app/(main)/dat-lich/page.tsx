"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { format, isBefore } from "date-fns";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const userAuthSchema = z.object({
  ngayHen: z.string(),
  idCategory: z.number(),
});
type FormData = z.infer<typeof userAuthSchema>;
export default function DatLichPage() {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date>();
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
  const { data, isLoading, error } = useSWR<ResponseData<Category[]>>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/phieuhen/category`,
    fetcher,
  );

  const { data: khachhangData } = useSWR<ResponseData<KhachHang>>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/khachhang/username/${username}`,
    fetcher,
  );
  //   console.log(data?.data);
  const router = useRouter();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
    const createData = {
      ngayHen: formData.ngayHen,
      idCategory: formData.idCategory,
      idKhachHang: khachhangData?.data.idKhachHang,
      trangThai: "Đang chờ",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/phieuhen`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "",
        },
        body: JSON.stringify(createData),
      },
    );
    if (response.ok) {
      toast({
        title: "Thêm thành công",
        description: "Thông tin phiếu hẹn đã được thêm thành công.",
        action: <ToastAction altText="Lưu thành công">Đóng</ToastAction>,
      });
    } else {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi trong quá trình thêm.",
        action: <ToastAction altText="Lưu thất bại">Đóng</ToastAction>,
      });
    }
  };
  return (
    <div className="flex h-screen items-center  justify-center">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle className="text-2xl">Đặt lịch</CardTitle>
          <CardDescription>Đặt trước lịch .</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="Ngày hẹn">Ngày hẹn</Label>
              <Input
                id="username"
                type="date"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("ngayHen")}
              />
              {errors?.ngayHen && (
                <p className="px-1 text-xs text-red-600">
                  {errors.ngayHen.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Loại</Label>
              <Select
                onValueChange={(value) =>
                  setValue("idCategory", parseInt(value))
                }
                defaultValue={data?.data.at(0)?.idLoai.toString()}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn sản phẩm" />
                </SelectTrigger>
                <SelectContent className="col-span-3">
                  <SelectGroup>
                    <SelectLabel>Sản phẩm</SelectLabel>
                    {data?.data?.map((lk) => (
                      <SelectItem key={lk.idLoai} value={lk.idLoai.toString()}>
                        {lk.loai}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.idCategory && (
                <p className="px-1 text-xs text-red-600">
                  {errors.idCategory.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-4 w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
