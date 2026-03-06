"use client";

import { Search, History, Newspaper, PieChart, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { name: "搜尋分析 Search", icon: Search, href: "/" },
    { name: "歷史紀錄 History", icon: History, href: "/history" },
    { name: "AI 每日時事新聞 News", icon: Newspaper, href: "/news" },
    { name: "我的投資組合 Portfolio", icon: PieChart, href: "/portfolio" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col h-full shrink-0">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                    Mr. How | AI 分析終端
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-slate-800 text-white"
                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Upgrade CTA */}
            <div className="p-4">
                <div className="glass-border-glow rounded-xl">
                    <button className="relative w-full overflow-hidden rounded-xl bg-slate-800/80 p-4 transition-all hover:bg-slate-800 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="flex items-center justify-center gap-2 text-yellow-500 mb-1">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            <span className="font-bold text-sm">升級 PRO</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium text-center">解鎖無限算力</p>
                    </button>
                </div>
            </div>
        </aside>
    );
}
