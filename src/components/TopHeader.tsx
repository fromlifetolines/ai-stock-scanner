"use client";

import { Search, Bell, User } from "lucide-react";

export function TopHeader() {
    return (
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">

            {/* Search Bar Container */}
            <div className="flex-1 max-w-2xl mx-auto">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-200 placeholder-slate-500 
                     focus:border-emerald-500/50 focus:bg-slate-800 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none shadow-inner"
                        placeholder="輸入股票代號或公司名稱 (例：AAPL, 2330)..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">⌘K</span>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-6">
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
                </button>
                <button className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white ring-2 ring-slate-800 hover:ring-emerald-500 transition-all">
                    <User className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
