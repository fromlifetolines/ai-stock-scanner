"use client";

import { History as HistoryIcon, RefreshCw } from "lucide-react";
import clsx from "clsx";

export default function HistoryPage() {
    // 假資料: 歷史搜尋紀錄
    const historyData = [
        { id: 1, symbol: "2330", name: "台灣積體電路製造", time: "剛剛", insight: "多頭排列，量增價漲", isRead: false },
        { id: 2, symbol: "2603", name: "長榮海運", time: "2 小時前", insight: "高檔震盪，留意法人動向", isRead: true },
        { id: 3, symbol: "AAPL", name: "Apple Inc.", time: "今天 09:30", insight: "技術面過熱，均線乖離過大", isRead: true },
        { id: 4, symbol: "0050.TW", name: "元大台灣50", time: "昨天", insight: "外資連續買超，均線上彎", isRead: true },
        { id: 5, symbol: "NVDA", name: "NVIDIA Corp.", time: "昨天", insight: "創歷史新高，AI 需求強勁", isRead: true },
    ];

    return (
        <div className="animate-in fade-in duration-700 max-w-5xl mx-auto">
            <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)]">
                    <HistoryIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">歷史紀錄</span>
                <span className="text-slate-500 font-semibold text-2xl">/ 最近搜尋</span>
            </h1>

            <div className="space-y-4">
                {historyData.map((item) => (
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
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <span className="text-slate-500">{item.time}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span className="text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.3)] flex items-center gap-1.5">
                                        <SparklesIcon className="w-3.5 h-3.5" />
                                        {item.insight}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className="jelly-button py-2 px-4 flex items-center gap-2 text-sm font-bold text-slate-200 group-hover:bg-white/10 shrink-0">
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
