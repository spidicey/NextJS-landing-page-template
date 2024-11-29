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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const userAuthSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type FormData = z.infer<typeof userAuthSchema>;
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function onSubmit(data: FormData) {
    console.log(data);
    try {
      const signInResponse = await fetch(
        "http://localhost:8080/api/auth/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        },
      );

      const signInResult = await signInResponse.json();
      setIsLoading(false);

      if (!signInResponse.ok) {
        toast({
          title: "Đã xảy ra lỗi.",
          description:
            signInResult.message || "Đăng nhập thất bại. Vui lòng thử lại.",
          variant: "destructive",
        });
        return;
      }

      // Lưu token vào cookies
      Cookies.set("token-client", signInResult.accessToken, { expires: 7 }); // Lưu token hết hạn sau 7 ngày hoặc theo yêu cầu

      toast({
        title: "Đăng nhập thành công",
        description: "Bạn đã đăng nhập thành công.",
        variant: "default",
      });

      // Chuyển hướng tới trang chủ hoặc trang khác
      router.push("/");
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Có lỗi xảy ra",
        description:
          error.message ||
          "Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email của bạn để đăng nhập vào tài khoản.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="username"
                type="input"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("username")}
              />
              {errors?.username && (
                <p className="px-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="pasword"
                placeholder="Mật khẩu"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("password")}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-4 w-full">
              Đăng nhập
            </Button>
          </form>
          <p className="text-center">
            Chưa có tài khoản?{" "}
            <Link className="text-indigo-500 hover:underline" href="/sign-up">
              Tạo tài khoản
            </Link>{" "}
          </p>
          <p className="text-center">
            <Link
              className="text-indigo-500 hover:underline"
              href="/forgot-password"
            >
              Quên mật khẩu
            </Link>{" "}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}