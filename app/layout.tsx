import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "美发AI获客助手",
  description: "面向美发行业的AI内容获客MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
