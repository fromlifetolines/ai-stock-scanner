import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Stock Scanner | AI 分析終端",
  description: "Professional AI-Powered Stock Scanner MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body className={`${inter.variable} antialiased h-screen flex overflow-hidden bg-slate-900 text-slate-200 selection:bg-emerald-500/30`}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-[#0f172a] relative">
          <TopHeader />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-16">
            <div className="max-w-7xl mx-auto h-full">
              {children}
            </div>
          </main>
          <FooterDisclaimer />
        </div>
      </body>
    </html>
  );
}
