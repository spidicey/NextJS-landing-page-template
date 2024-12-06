/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EJG6sHqKHrc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function ProductPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const [loading, setLoading] = useState(false);
  const [tokenClient, setTokenClient] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<JwtPayload>();
  const { data, isLoading, error } = useSWR<ResponseData<LinhKien>>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kho/linhkien/${params.id}`,
    fetcher,
  );
  // Fetch token client-side to prevent mismatches
  useEffect(() => {
    const token = Cookies.get("token-client");
    if (token) {
      setTokenClient(token);
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
    }
  }, []);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        // @ts-ignore
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/khachhang/username/${decoded?.username}`,
        {
          method: "GET",
        },
      );
      const khachhang = await response.json();

      const cartResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kho/giohang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenClient}`,
          },
          body: JSON.stringify({
            idKhachHang: khachhang.data.idKhachHang,
            idSanPham: params.id,
            soLuong: 1,
          }),
        },
      );

      if (cartResponse.ok) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!tokenClient) {
    return <div>You are not logged in</div>;
  }
  return (
    <div className="w-full">
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-0">
        <div>
          <Image
            src={data?.data.danhSachAnh[0]?.url ?? "/coffee.webp"}
            alt="Product Image"
            width={600}
            height={600}
            className="w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              {data?.data.tenSanPham}
            </h1>
            <p className="text-2xl font-bold">{data?.data.gia}</p>
          </div>
          <Button size="lg" onClick={handleAddToCart} disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          </Button>
        </div>
      </section>
      {/* <section className="mx-auto max-w-4xl px-4 py-12 md:px-0">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            Product Description
          </h2>
          <div className="text-lg leading-relaxed">
            <p>
              Experience the ultimate in wireless audio with our Acme Wireless
              Headphones. Crafted with premium materials and the latest audio
              technology, these headphones deliver exceptional sound quality and
              unparalleled comfort.
            </p>
            <p className="mt-4">
              Featuring advanced noise-cancelling capabilities, you can immerse
              yourself in your music, podcasts, or audiobooks without
              distractions. The long-lasting battery life ensures you can enjoy
              your audio for hours on end, making these headphones the perfect
              companion for your daily commute, workout, or leisure time.
            </p>
            <p className="mt-4">
              Designed with a sleek and modern aesthetic, the Acme Wireless
              Headphones seamlessly blend style and functionality. The intuitive
              touch controls allow you to easily manage your audio, while the
              foldable design makes them convenient to carry and store.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4 md:px-0">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold md:text-3xl">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950">
                <Link href="#" className="block" prefetch={false}>
                  <Image
                    src="/placeholder.svg"
                    alt="Related Product 1"
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover"
                    style={{ aspectRatio: "400/400", objectFit: "cover" }}
                  />
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-semibold">
                      Acme Wireless Earbuds
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">$79.99</p>
                    <Button size="sm">Thêm vào giỏ hàng</Button>
                  </div>
                </Link>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950">
                <Link href="#" className="block" prefetch={false}>
                  <Image
                    src="/placeholder.svg"
                    alt="Related Product 2"
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover"
                    style={{ aspectRatio: "400/400", objectFit: "cover" }}
                  />
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-semibold">
                      Acme Portable Speaker
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">$59.99</p>
                    <Button size="sm">Thêm vào giỏ hàng</Button>
                  </div>
                </Link>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950">
                <Link href="#" className="block" prefetch={false}>
                  <Image
                    src="/placeholder.svg"
                    alt="Related Product 3"
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover"
                    style={{ aspectRatio: "400/400", objectFit: "cover" }}
                  />
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-semibold">Acme Smart Watch</h3>
                    <p className="text-gray-500 dark:text-gray-400">$149.99</p>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </Link>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950">
                <Link href="#" className="block" prefetch={false}>
                  <Image
                    src="/placeholder.svg"
                    alt="Related Product 4"
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover"
                    style={{ aspectRatio: "400/400", objectFit: "cover" }}
                  />
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-semibold">
                      Acme Fitness Tracker
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">$99.99</p>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
