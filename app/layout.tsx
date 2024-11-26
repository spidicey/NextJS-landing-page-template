// "use client";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

// Declare the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "df-messenger": any;
    }
  }
}
import Script from "next/script";

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
      <head>
        <Script
          src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={cn(
          "grainy flex min-h-screen flex-col font-sans antialiased",
          GeistSans.className,
        )}
      >
        <Navbar />
        {children}
        <Toaster />
        <df-messenger
          intent="WELCOME"
          chat-title="baotrisuachua"
          agent-id="e825dced-77fe-494a-b540-4f5adcbe62a4"
          language-code="vi"
        ></df-messenger>
      </body>
    </html>
  );
}
