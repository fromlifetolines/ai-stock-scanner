"use client";

import { History as HistoryIcon, RefreshCw, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useAppState } from "@/lib/store";
import { useRouter } from "next/navigation";

export interface HistoryItem {
    id: string;
    symbol: string;
    name: string;
    time: string;
    insight: string;
    isRead: boolean;
    timestamp: number;
}

export default function HistoryPage() {
    const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
    const { handleSearch } = useAppState();
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem("ai_stock_history");
        if (saved) {
            try {
                // Sort by newest first
                const parsed = JSON.parse(saved).sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp);
                setHistoryData(parsed);
            } catch (e) {
                console.error("Failed to parse history");
            }
        }
    }, []);

    const handleClearHistory = () => {
        localStorage.removeItem("ai_stock_history");
        setHistoryData([]);
    };

    const handleReanalyze = async (symbol: string) => {
        router.push('/');
        // The store handles the market specific logic based on standard query
        await handleSearch(symbol, "台股 TW"); // Default back to TW for reanalysis as standard.
    };

    const formatTime = (ts: number) => {
        const diff = Date.now() - ts;
        if (diff < 3600000) return `${Math.max(1, Math.floor(diff / 60000))} 分鐘前`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小時前`;
        return new Date(ts).toLocaleDateString();
    };

    return (
        <div className="animate-in fade-in duration-700 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)]">
                        <HistoryIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">歷史紀錄</span>
                    <span className="text-slate-500 font-semibold text-2xl hidden sm:inline-block">/ 最近搜尋</span>
                </h1>

                {historyData.length > 0 && (
                    <button onClick={handleClearHistory} className="text-slate-500 hover:text-rose-400 text-sm font-semibold flex items-center gap-2 transition-colors">
                        <Trash2 className="w-4 h-4" /> 
                        <span className="hidden sm:inline-block">清除全部</span>
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {historyData.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 vision-card border-dashed border-white/10">
                        <HistoryIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="font-semibold tracking-wide">尚無搜尋紀錄</p>
                        <p className="text-sm mt-2 opacity-50">您的 AI 分析軌跡將會保存在這裡</p>
                    </div>
                ) : historyData.map((item) => (
                    <div 
                        key={item.id} 
                        className={clsx(
                            "vision-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all duration-300 hover:bg-white/[0.04]",
                            item.isRead ? "opacity-60 hover:opacity-100" : "opacity-100 border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,118,0.1)]"
                        )}
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <span className="text-lg font-black text-white tracking-widest">{item.symbol.substring(0,4)}</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-xl font-bold text-white tracking-wide">{item.symbol} {item.name}</h2>
                                    {!item.isRead && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium flex-wrap">
                                    <span className="text-slate-500">{formatTime(item.timestamp)}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                                    <span className="text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.3)] flex items-start sm:items-center gap-1.5 mt-2 sm:mt-0">
                                        <SparklesIcon className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0" />
                                        <span className="line-clamp-2 sm:line-clamp-1">{item.insight}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleReanalyze(item.symbol)}
                            className="jelly-button py-2 px-4 flex items-center gap-2 text-sm font-bold text-slate-200 group-hover:bg-white/10 shrink-0 w-fit sm:w-auto"
                        >
                            <RefreshCw className="w-4 h-4 text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                            重新分析
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
    )
}
