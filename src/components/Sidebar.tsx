"use client";

import { Search, History, Newspaper, PieChart, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { useAppState } from "@/lib/store";

const navItems = [
    { name: "搜尋分析 Search", icon: Search, href: "/" },
    { name: "歷史紀錄 History", icon: History, href: "/history" },
    { name: "AI 每日時事新聞 News", icon: Newspaper, href: "/news" },
    { name: "我的投資組合 Portfolio", icon: PieChart, href: "/portfolio" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isProUser } = useAppState();

    return (
        <aside className="w-64 bg-transparent border-r border-white/5 flex flex-col h-full shrink-0 relative z-10 pt-4">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-8 mb-4">
                <h1 className="text-lg font-black tracking-tight text-gradient-silver">
                    Mr. How | AI 分析終端
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 group",
                                isActive
                                    ? "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-slate-500 group-hover:text-slate-300"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Upgrade CTA */}
            <div className="p-6 mt-auto mb-4 relative z-10">
                {!isProUser ? (
                    <button
                        onClick={() => window.dispatchEvent(new Event('open-subscription-modal'))}
                        className="jelly-button-cta w-full p-4 flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
                    >
                        {/* Subtle sheen animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                        <div className="flex items-center justify-center gap-2 text-white/90">
                            <Sparkles className="w-4 h-4 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                            <span className="font-extrabold text-sm tracking-wide">升級 PRO</span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-medium">解鎖無限算力</p>
                    </button>
                ) : (
                    <div className="w-full p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_0_15px_rgba(245,158,11,0.1)] flex flex-col items-center justify-center gap-1.5 opacity-90 transition-all duration-700">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">👑</span>
                            <span className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 drop-shadow-sm tracking-wide">PRO 尊榮會員</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-bold">已啟用</p>
                    </div>
                )}
            </div>
        </aside>
    );
}
