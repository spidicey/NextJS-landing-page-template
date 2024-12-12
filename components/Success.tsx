import { Card } from "@/components/ui/card";
import React from "react";
import { Success } from "@/components/logo";

export default function SuccessPage() {
  return (
    <div className="flex h-screen flex-col bg-slate-600 md:flex-row md:overflow-hidden">
      <div className="flex flex-grow flex-col items-center p-6 md:overflow-y-auto md:p-12 md:px-96 ">
        <Card className="w- p-16">
          <div className="flex flex-col items-center gap-5 p-10">
            <Success />
            <h1 className="text-2xl font-bold">Đặt hàng thành công</h1>
            <p className="text-lg">
              Quý khác đã thanh toán thành công vui lòng vào bill để xem chi
              tiết
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
