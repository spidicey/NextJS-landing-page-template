import { Fail } from "@/components/logo";
import { Card } from "@/components/ui/card";
import React from "react";

export default function FailPage() {
  return (
    <div className="flex h-screen flex-col bg-slate-600 md:flex-row md:overflow-hidden">
      <div className="flex flex-grow flex-col items-center p-6 md:overflow-y-auto md:p-12 md:px-96 ">
        <Card className="w- p-16">
          <div className="flex flex-col items-center gap-5 p-10">
            <Fail />
            <h1 className="text-2xl font-bold">Đặt hàng thất bại</h1>
            <p className="text-lg">
              Đã xảy ra lỗi trong quá trình thanh toán. Xin quý khách vui lòng
              thử lại
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
