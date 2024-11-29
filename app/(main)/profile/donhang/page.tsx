"use client";
import BackButton from "@/components/BackButton";
import DonHangTable from "@/components/donhang/DonHangTable";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function KhachHangPage() {
  const [tokenClient, setTokenClient] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<JwtPayload>();
  const [khachhang, setKhacHang] = useState<KhachHang>();

  useEffect(() => {
    const token = Cookies.get("token-client");
    if (token) {
      setTokenClient(token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      setDecoded(decodedToken);
      fetch(
        // @ts-ignore
        `http://localhost:8080/api/auth/khachhang/username/${decodedToken?.username}`,
        {
          method: "GET",
        },
      )
        .then((data) => data.json())
        .then((data) => setKhacHang(data.data));
    }
  }, []);
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DonHangTable idKhachHang={khachhang?.idKhachHang} title="Orders" />
    </>
  );
}
