"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/account/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "",
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        setLoading(false);
        toast({
          title: "An error occurred",
          description: "Đã có lỗi xảy ra vui lòng thử lại.",
          variant: "destructive",
        });
      }
      toast({
        title: "Đã gửi thành công",
        description: "Vui lòng kiểm tra email để thay đổi mật khẩu.",
        variant: "default",
      });
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-screen flex-col items-center justify-center">
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <h2 className="text-lg font-medium">Email đã đăng ký</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
          </CardContent>
        </Card>
        <div className="pt-6">
          <Button type="submit" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi"}
          </Button>
        </div>
      </div>
    </form>
  );
}
