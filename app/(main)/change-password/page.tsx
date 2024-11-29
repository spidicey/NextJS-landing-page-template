"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Define schema
const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    newPassword: z.string().nonempty("New password is required"),
    confirm: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof changePasswordSchema>;

interface DecodedToken extends JwtPayload {
  username?: string;
}

export default function ChangePasswordForm() {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = Cookies.get("token-client");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!decodedToken?.username) {
      alert("User is not authenticated. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/account/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token-client")}`,
          },
          body: JSON.stringify({
            username: decodedToken.username,
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Password change failed");
      }

      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 px-4 sm:px-6">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div>Change Password</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  type="password"
                  id="current-password"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <p className="text-sm text-red-500">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  type="password"
                  id="new-password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  {...register("confirm")}
                />
                {errors.confirm && (
                  <p className="text-sm text-red-500">
                    {errors.confirm.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
