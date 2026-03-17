import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const freeSans = localFont({
  src: "../public/fonts/FreeSans.otf",
  variable: "--font-free-sans",
  display: "swap",
});

const freeSansBold = localFont({
  src: "../public/fonts/FreeSansBold.otf",
  variable: "--font-free-sans-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IELTS Assistant",
  description: "Your comprehensive platform for IELTS preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${freeSans.variable} ${freeSansBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
