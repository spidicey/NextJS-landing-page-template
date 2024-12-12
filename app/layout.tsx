// "use client";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

// Declare the custom element
import Script from "next/script";
import ChatbotBubble from "@/components/ChatBubble";
import RasaChat from "@/components/rasachat";

// export const metadata: Metadata = {
//   title: "Convo | Language Learning",
//   description: "Speech focused language learning",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
        <body
          className={cn(
            "grainy flex min-h-screen flex-col font-sans antialiased",
            GeistSans.className,
          )}
        >
          <Navbar />
          {children}
          {/* <ChatbotBubble/>
           */}
          <RasaChat />
          <Toaster />
        </body>
    </html>
  );
}
