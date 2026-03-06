"use client";

import { useState } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { useAppState } from "@/lib/store";

export function TopHeader() {
    const { handleSearch } = useAppState();
    const [inputValue, setInputValue] = useState("");
    const [marketType, setMarketType] = useState("美股 US");

    const onSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            handleSearch(inputValue, marketType);
        }
    };

    return (
        <header className="h-20 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0 bg-transparent backdrop-blur-[2px]">

            {/* Search Bar Container */}
            <div className="flex-1 max-w-3xl mx-auto">
                <div className="relative group flex items-center bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] focus-within:border-white/30 focus-within:bg-white/[0.08] focus-within:ring-1 focus-within:ring-white/20 transition-all">

                    {/* Market Dropdown */}
                    <div className="relative flex items-center pl-4 border-r border-white/10 shrink-0">
                        <select
                            value={marketType}
                            onChange={(e) => setMarketType(e.target.value)}
                            title="選擇市場類型"
                            aria-label="選擇市場類型"
                            className="appearance-none bg-transparent text-slate-300 text-sm font-semibold outline-none pr-6 cursor-pointer"
                        >
                            <option value="台股 TW" className="bg-slate-900 text-white">台股 TW</option>
                            <option value="美股 US" className="bg-slate-900 text-white">美股 US</option>
                            <option value="ETF" className="bg-slate-900 text-white">ETF</option>
                            <option value="基金 Fund" className="bg-slate-900 text-white">基金 Fund</option>
                        </select>
                        <ChevronDown className="absolute right-2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>

                    <div className="pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-white transition-colors" />
                    </div>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={onSearchSubmit}
                        className="block w-full pl-3 pr-4 py-3 bg-transparent text-sm text-white placeholder-slate-400 outline-none"
                        placeholder="輸入股票代號或公司名稱 (例：AAPL, 2330) 按 Enter 搜尋..."
                    />

                    <div className="pr-4 flex items-center pointer-events-none shrink-0">
                        <span className="text-xs font-semibold text-slate-400 bg-white/[0.05] px-2 py-1 rounded border border-white/10">↵</span>
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
