"use client";

import { Search, Bell, User } from "lucide-react";

export function TopHeader() {
    return (
        <header className="h-20 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0 bg-transparent backdrop-blur-[2px]">

            {/* Search Bar Container */}
            <div className="flex-1 max-w-2xl mx-auto">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-white transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-3 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full text-sm text-white placeholder-slate-400 
                     focus:border-white/30 focus:bg-white/[0.08] focus:ring-1 focus:ring-white/20 transition-all outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                        placeholder="輸入股票代號或公司名稱 (例：AAPL, 2330)..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-xs font-semibold text-slate-400 bg-white/[0.05] px-2 py-1 rounded border border-white/10">⌘K</span>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-6">
                <button aria-label="Notifications" className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border border-black shadow-[0_0_8px_rgba(52,211,118,0.8)]"></span>
                </button>
                <button aria-label="User Profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white ring-1 ring-white/20 hover:ring-white/50 transition-all shadow-[0_0_10px_rgba(52,211,118,0.3)]">
                    <User className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
