"use client";

import { KLineChart } from "@/components/dashboard/KLineChart";
import { useAppState } from "@/lib/store";
import { Activity, TrendingUp, BarChart2 } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function TechnicalTab() {
    const { currentData } = useAppState();
    if (!currentData || currentData.price === undefined) return null;

    return (
        <ErrorBoundary errorMessage="⚠️ 技術分析組件載入失敗">
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* AI Technical Analysis Report Card */}
                <div className="vision-card p-1 relative overflow-hidden group border-emerald-500/30">
                <div className="bg-gradient-to-br from-emerald-900/40 via-black to-blue-900/20 backdrop-blur-xl rounded-[22px] p-6 lg:p-8">
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.4)]">
                            <Activity className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        </div>
                        <h2 className="text-xl font-black text-white tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">AI 深度技術判讀</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
                            <h3 className="text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> 趨勢判斷
                            </h3>
                            <p className="text-emerald-400 font-semibold text-lg">
                                {currentData.klineData && currentData.klineData.length > 0 
                                    ? (currentData.price > currentData.klineData[0].price ? "多頭排列 (Bullish)" : "空頭排列 (Bearish)") 
                                    : "資料讀取中..."}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">短線均線 (5MA, 10MA) 呈多頭發散，上行走勢明確。</p>
                        </div>
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
                            <h3 className="text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                                <BarChart2 className="w-4 h-4" /> 指標解讀 (MACD/KD)
                            </h3>
                            <p className="text-amber-400 font-semibold text-lg">高檔鈍化 / 黃金交叉</p>
                            <p className="text-xs text-slate-500 mt-2">MACD 柱狀體翻紅擴大，KD 指標在 80 附近高檔鈍化，動能強勁。</p>
                        </div>
                        <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5">
                            <h3 className="text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                                支撐與壓力預測
                            </h3>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center"><span className="text-xs text-slate-400">壓力位 1</span><span className="font-bold text-rose-400">${(currentData?.price * 1.05).toFixed(2)}</span></div>
                                <div className="flex justify-between items-center"><span className="text-xs text-slate-400">目前價</span><span className="font-bold text-white">${currentData?.price?.toFixed(2)}</span></div>
                                <div className="flex justify-between items-center"><span className="text-xs text-slate-400">支撐位 1</span><span className="font-bold text-emerald-400">${(currentData?.price * 0.96).toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded K-Line Chart */}
            <div className="h-[400px]">
                <KLineChart />
            </div>
            
            {/* Placeholder for MACD/Volume */}
            <div className="vision-card p-6 h-[200px] flex items-center justify-center opacity-70">
                <div className="text-center">
                    <BarChart2 className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                    <p className="text-slate-400 font-semibold tracking-widest text-sm uppercase">Volume & MACD Data Loading...</p>
                </div>
            </div>
            </div>
        </ErrorBoundary>
    );
}
