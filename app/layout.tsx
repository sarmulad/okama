import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OKAMA Music - Indigenous Worship Band",
  description:
    "Where words fail, music speaks. A new sound from an ancient well - Indigenous Worship Band bringing sacred sounds to modern worship.",
  openGraph: {
    title: "OKAMA Music - Indigenous Worship Band",
    description:
      "Where words fail, music speaks. A new sound from an ancient well - Indigenous Worship Band bringing sacred sounds to modern worship.",
    url: "https://okama.ca",
    siteName: "OKAMA Music",
    images: [
      {
        url: "https://okama.ca/band.jpg",
        width: 1200,
        height: 630,
        alt: "OKAMA Music - Indigenous Worship Band",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OKAMA Music - Indigenous Worship Band",
    description:
      "Where words fail, music speaks. A new sound from an ancient well - Indigenous Worship Band bringing sacred sounds to modern worship.",
    images: ["https://okama.ca/band.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * {
              box-sizing: border-box;
            }
            body {
              background: #000 !important;
              color: #fff !important;
              margin: 0;
              padding: 0;
            }
            #__next {
              background: #000 !important;
            }
          `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-black text-white min-h-screen`}
      >
        <CartProvider>
          <div className="bg-black text-white min-h-screen">{children}</div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
