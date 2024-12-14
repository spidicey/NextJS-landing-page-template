"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";

const profileFormSchema = z.object({
  tenKhachHang: z.string(),
  dienThoai: z.string(),
  diaChi: z.string(),
  maSoThue: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const [username, setUsername] = useState<string | null>(null);
  const [nhanVienData, setNhanVienData] = useState<ResponseData<KhachHang>>();

  useEffect(() => {
    const token = Cookies.get("token-client");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      tenKhachHang: "",
      dienThoai: "",
      diaChi: "",
      maSoThue: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!username) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/khachhang/username/${username}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setNhanVienData(data);
        form.setValue("tenKhachHang", data?.data?.tenKhachHang || "");
        form.setValue("dienThoai", data?.data?.dienThoai || "");
        form.setValue("diaChi", data?.data?.diaChi || "");
        form.setValue("maSoThue", data?.data?.maSoThue || "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [username, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!nhanVienData) return;

    const token = Cookies.get("token");
    const updatedData = {
      ...data,
      idKhachHang: nhanVienData.data.idKhachHang,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/khachhang`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: ``,
        },
        body: JSON.stringify(updatedData),
      },
    );

    if (response.ok) {
      toast({
        title: "Cập nhật thành công",
        action: <ToastAction altText="Lưu thành công">Đóng</ToastAction>,
      });
    } else {
      const errorData = await response.json();
      toast({
        title: "Cập nhật thất bại",
        description: errorData.message,
        action: <ToastAction altText="Lưu thất bại">Đóng</ToastAction>,
      });
    }
  }

  if (!username) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tenKhachHang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ Tên</FormLabel>
              <FormControl>
                <Input placeholder="Họ Tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dienThoai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số Điện Thoại</FormLabel>
              <FormControl>
                <Input placeholder="Số Điện Thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diaChi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa Chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Địa Chỉ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maSoThue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã Số Thuế</FormLabel>
              <FormControl>
                <Input placeholder="Mã Số Thuế" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
