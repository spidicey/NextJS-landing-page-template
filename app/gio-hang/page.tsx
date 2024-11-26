/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Q5LlHqml81S
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Link from "next/link";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { set } from "date-fns";
import { number } from "zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function GioHang() {
  const { toast } = useToast();
  const [khachhang, setKhacHang] = useState<KhachHang>();
  const [tokenClient, setTokenClient] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<JwtPayload>();
  const [cart, setCart] = useState<GioHang[]>([]);
  const [loading, setLoading] = useState(true);
  const [diaChi, setDiaChi] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const handleDiaChiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaChi(e.target.value);
  };
  const handleSoDienThoaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoDienThoai(e.target.value);
  };

  //   // {
  //   //   id: 1,
  //   //   name: "Hamburger",
  //   //   price: 9.99,
  //   //   quantity: 1,
  //   // },
  //   // {
  //   //   id: 2,
  //   //   name: "Fries",
  //   //   price: 4.99,
  //   //   quantity: 2,
  //   // },
  //   // {
  //   //   id: 3,
  //   //   name: "Coca-Cola",
  //   //   price: 2.99,
  //   //   quantity: 1,
  //   // },
  // ]);
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
  useEffect(() => {
    // Fetch cart only when khachhang data is available
    if (khachhang) {
      fetch(`http://localhost:8080/api/kho/giohang/${khachhang.idKhachHang}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((cartData) => {
          console.log(cartData.data);
          setDiaChi(khachhang.diaChi);
          setSoDienThoai(khachhang.dienThoai);
          setCart(cartData.data);
          setLoading(false); // Set loading to false after cart is set
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
          setLoading(false); // Even if there's an error, stop loading
        });
    }
  }, [khachhang]);

  const handleCheckout = async () => {
    // Check if cart has items and address is set
    if (!cart.length || !diaChi.trim()) {
      alert("Please ensure cart is not empty and address is filled out.");
      return;
    }

    // Calculate total price

    // Format the data according to DonHang JSON structure
    const donHangData = {
      idKhachHang: khachhang?.idKhachHang,
      tongTien: total,
      ngayDat: new Date().toISOString(),
      diaChi: diaChi,
      trangThai: "Pending",
      sdt: khachhang?.dienThoai,
      thanhToan: 0,
      ctDonHangs: cart.map((item) => ({
        idSanPham: item.linhKien.idSanPham,
        tenSanPham: item.linhKien.tenSanPham,
        soLuong: item.soLuong,
        gia: item.linhKien.gia,
      })),
    };

    try {
      console.log(total);
      const options = {
        authorization: ``,
        params: {
          amount: total,
          orderInfo: "thanh toan don hang",
        },
        timeout: 5000,
      };

      const response = await fetch(
        "http://localhost:8080/api/thanh-toan/don-hang",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenClient}`,
          },
          body: JSON.stringify(donHangData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        
        const paymentResponse = await axios.get(
          `http://localhost:8080/api/thanh-toan/submitOrder`,
          options,
        );
        toast({
          title: "Đặt hàng thanh cong",
          description: "vui long xem trang thanh toan.",
          action: <ToastAction altText="Lưu thành công">Đóng</ToastAction>,
        });
        const paymentData = paymentResponse.data;
        console.log("Payment data:", paymentData);
        window.open(paymentData, "_self");
        // Optionally clear cart or navigate to another page
      } else {
        console.error("Error placing order:", response.statusText);
        alert("Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };
  const updateQuantity = async (idSanPham: number, soLuong: number) => {
    try {
      const cartResponse = await fetch(
        `http://localhost:8080/api/kho/giohang`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenClient}`,
          },
          body: JSON.stringify({
            idKhachHang: khachhang?.idKhachHang,
            idSanPham: idSanPham,
            soLuong: soLuong,
          }),
        },
      );

      if (cartResponse.ok) {
        setCart(
          cart?.map((item) =>
            item.linhKien.idSanPham === idSanPham ? { ...item, soLuong } : item,
          ),
        );
      } else {
        alert("Đã xảy ra lỗi");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const removeItem = (idSanPham: number) => {
    setCart(cart?.filter((item) => item.linhKien.idSanPham !== idSanPham));
  };

  const total = cart?.reduce(
    (acc, item) => acc + item.linhKien.gia * item.soLuong,
    0,
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Cart</h1>
      <div className="grid gap-4">
        {cart?.map((item) => (
          <Card key={item.linhKien.idSanPham}>
            <CardHeader>
              <CardTitle>{item.linhKien.tenSanPham}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={item?.linhKien.danhSachAnh[0]?.url ?? "/coffee.webp"}
                  alt="Product Image"
                  width={300}
                  height={300}
                  className="w-full overflow-hidden rounded-lg"
                  style={{ aspectRatio: "600/600", objectFit: "cover" }}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    updateQuantity(item.linhKien.idSanPham, item.soLuong - 1)
                  }
                  disabled={item.soLuong === 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <div>{item.soLuong}</div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    updateQuantity(item.linhKien.idSanPham, item.soLuong + 1)
                  }
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="font-medium">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.linhKien.gia * item.soLuong)}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.linhKien.idSanPham)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Separator className="my-6" />
      <div className="flex items-center justify-between">
        <div className="font-medium">Total:</div>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(total)}
        </div>
      </div>

      <Tabs defaultValue="VNPAY">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="VNPAY">
            <Image src="/VNPAY.svg" width={100} height={100} alt="Card Icon" />
            Thanh Toán online
          </TabsTrigger>
          <TabsTrigger value="TIền mặt">
            <Image src="/cash.svg" width={30} height={30} alt="Card Icon" />
            Tiền mặt
          </TabsTrigger>
        </TabsList>
        <TabsContent value="VNPAY">
          <Card>
            <CardHeader>
              <CardTitle>Thanh Toán </CardTitle>
              <CardDescription>Thanh toán online bằng vnpay.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="diaChi">Địa chỉ</Label>
                <Input
                  id="diaChi"
                  value={diaChi}
                  onChange={handleDiaChiChange}
                />
                <Label htmlFor="sdt">Số điện thoại</Label>
                <Input
                  id="sdt"
                  type="tel"
                  value={soDienThoai}
                  onChange={handleSoDienThoaiChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="TIền mặt">
          <Card>
            <CardHeader>
              <CardTitle>TIền mặt</CardTitle>
              <CardDescription>
                Thanh toán tiền mặt khi nhận hàng.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="diaChi">Địa chỉ</Label>
                <Input
                  id="diaChi"
                  value={diaChi}
                  onChange={handleDiaChiChange}
                />
                <Label htmlFor="sdt">Số điện thoại</Label>
                <Input
                  id="sdt"
                  type="tel"
                  value={soDienThoai}
                  onChange={handleSoDienThoaiChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save TIền mặt</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex justify-end gap-2">
        <Link href="/san-pham">
          <Button variant="outline">TIếp tục mua</Button>
        </Link>
          <Button onClick={handleCheckout}>Mua</Button>
      </div>
    </div>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
