import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { logout } from "@/app/actions/logout";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
  const token = cookies().get("token-client")?.value;
  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-30 h-14 border-b border-gray-200 bg-white/40 backdrop-blur-lg transition-all",
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex items-center gap-1">
            <Image
              src="/logo.png"
              alt="Convo Logo"
              width={50}
              height={50}
              quality={100}
              className="h-7 w-7"
            />
            <span className="text-2xl font-semibold">Convo</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-4">
            {/* <Link
              href="/san-pham"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Sản phẩm
            </Link> */}

            <div className="hidden sm:flex items-center space-x-4">
              {token ? (
                <>
                  <Link
                    href="/dat-lich"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Đặt lịch
                  </Link>
                  {/* <Link
                    href="/gio-hang"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    <ShoppingCart />
                  </Link> */}

                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="text-black">BT</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/change-password">Đổi mật khẩu</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <form action={logout}>
                          <button type="submit" className="w-full text-left">
                            Logout
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/sign-up"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
