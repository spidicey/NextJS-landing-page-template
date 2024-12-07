"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Define validation schema
const userRegistrationSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  tenKhachHang: z.string().min(1, "Tên khách hàng là bắt buộc"),
  diaChi: z.string().min(1, "Địa chỉ là bắt buộc"),
  dienThoai: z.string().min(10, "Số điện thoại phải có ít nhất 10 chữ số"),
  maSoThue: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof userRegistrationSchema>;

export default function RegistrationForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: RegistrationFormData) {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/khachhang`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        toast({
          title: "Đăng ký thất bại",
          description: result.message || "Có lỗi xảy ra. Vui lòng thử lại.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Đăng ký thành công",
        description: "Bạn đã đăng ký thành công.",
        variant: "default",
      });

      // Redirect to the login page after successful registration
      router.push("/login");
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Có lỗi xảy ra",
        description: error.message || "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng ký</CardTitle>
          <CardDescription>
            Điền thông tin bên dưới để tạo tài khoản mới.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="text"
                disabled={isLoading}
                {...register("username")}
              />
              {errors.username && (
                <p className="px-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tenKhachHang">Tên khách hàng</Label>
              <Input
                id="tenKhachHang"
                type="text"
                disabled={isLoading}
                {...register("tenKhachHang")}
              />
              {errors.tenKhachHang && (
                <p className="px-1 text-xs text-red-600">
                  {errors.tenKhachHang.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="diaChi">Địa chỉ</Label>
              <Input
                id="diaChi"
                type="text"
                disabled={isLoading}
                {...register("diaChi")}
              />
              {errors.diaChi && (
                <p className="px-1 text-xs text-red-600">
                  {errors.diaChi.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dienThoai">Số điện thoại</Label>
              <Input
                id="dienThoai"
                type="text"
                disabled={isLoading}
                {...register("dienThoai")}
              />
              {errors.dienThoai && (
                <p className="px-1 text-xs text-red-600">
                  {errors.dienThoai.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maSoThue">Mã số thuế (tùy chọn)</Label>
              <Input
                id="maSoThue"
                type="text"
                disabled={isLoading}
                {...register("maSoThue")}
              />
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
              Đăng ký
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
