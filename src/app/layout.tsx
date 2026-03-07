import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";

import { AppStateProvider } from "@/lib/store";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Toast } from "@/components/Toast";

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
      <body className={`${inter.variable} antialiased h-screen flex overflow-hidden bg-black text-slate-200 selection:bg-emerald-500/30 relative`}>
        <AppStateProvider>
          {/* Aurora Glow Backgrounds */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-emerald-900/30 to-blue-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tl from-purple-900/20 to-teal-900/20 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="z-10 flex w-full h-full relative">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10">
              <TopHeader />
              <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-40 h-screen custom-scrollbar">
                <div className="max-w-7xl mx-auto h-full">
                  {children}
                </div>
              </main>
              <FooterDisclaimer />
            </div>

            <LoadingOverlay />
            <Toast />
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
