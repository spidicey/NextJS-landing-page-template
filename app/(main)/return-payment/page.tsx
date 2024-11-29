"use client";
import FailPage from "@/components/Fail";
import { Success } from "@/components/logo";
import SuccessPage from "@/components/Success";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [urlParams, setUrlParams] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObject: Record<string, any> = {};
    params.forEach((value, key) => {
      paramsObject[key] = value;
    });
    setUrlParams(paramsObject);
  }, []);

  if (!urlParams) {
    return <div>Loading...</div>;
  }

  const vnp_ResponseCode = urlParams.vnp_ResponseCode;

  return (
    <div>{vnp_ResponseCode === "00" ? <SuccessPage /> : <FailPage />}</div>
  );
}
