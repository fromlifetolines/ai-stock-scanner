"use client";

import { TopHeader } from "@/components/TopHeader";
import { Sidebar } from "@/components/Sidebar";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PieChart as PieChartIcon, TrendingUp, TrendingDown, RefreshCw, Zap, Lock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppState } from "@/lib/store";
import clsx from "clsx";
import { useState } from "react";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";
import { motion } from "framer-motion";

export default function PortfolioPage() {
    const { isSyncing, triggerLiveSync, currentData } = useAppState();
    const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    // Mock portfolio data
    const totalValue = 245890.50;
    const totalPnL = 12450.80;
    const isUnrealizedPositive = totalPnL >= 0;

    const mockHoldings = [
        { symbol: "AAPL", name: "Apple Inc.", shares: 150, avgPrice: 175.2, currentPrice: currentData?.symbol === "AAPL" ? currentData.price : 189.43, pnl: 2134.50 },
        { symbol: "TSLA", name: "Tesla Inc.", shares: 50, avgPrice: 220.5, currentPrice: currentData?.symbol === "TSLA" ? currentData.price : 195.20, pnl: -1265.00 },
        { symbol: "NVDA", name: "NVIDIA Corp.", shares: 40, avgPrice: 450.0, currentPrice: currentData?.symbol === "NVDA" ? currentData.price : 680.12, pnl: 9204.80 },
        { symbol: "0050.TW", name: "元大台灣50", shares: 2000, avgPrice: 135.5, currentPrice: currentData?.symbol === "0050." ? currentData.price : 142.80, pnl: 14600.00 },
    ];

    return (
        <div className="animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)]">
                        <PieChartIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">💼 AI 操盤室</span>
                    <span className="text-slate-500 font-semibold text-2xl">/ 我的投資組合</span>
                </h1>

                <button
                    onClick={triggerLiveSync}
                    disabled={isSyncing}
                    className="jelly-button py-2 px-4 flex items-center gap-2 text-sm font-bold text-slate-200 group border-white/10"
                >
                    <RefreshCw className={clsx("w-4 h-4 text-emerald-400 group-hover:text-emerald-300", isSyncing && "animate-spin")} />
                    即時更新報價
                </button>
            </div>

            {/* Total P&L and Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Total P&L Card */}
                <div className="vision-card p-8 relative overflow-hidden group lg:col-span-2 flex flex-col justify-center">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
                    
                    <p className="text-slate-400 font-semibold tracking-widest uppercase mb-4">總資產市值 (USD)</p>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-6 relative z-10">
                        <span className="text-5xl sm:text-6xl font-black tabular-nums text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <div className={clsx("flex items-center gap-2 px-4 py-2 rounded-2xl border w-fit", 
                            isUnrealizedPositive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,118,0.2)]" : "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.2)]"
                        )}>
                            {isUnrealizedPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                            <span className="text-xl font-bold tabular-nums tracking-wide">
                                {isUnrealizedPositive ? "+" : ""}${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Allocation Chart */}
                <div className="vision-card p-6 flex flex-col items-center justify-center relative overflow-hidden group mt-8 lg:mt-0 min-h-[250px]">
                    <h3 className="text-sm font-semibold text-slate-400 tracking-widest uppercase mb-2">資產配置比例</h3>
                    <div className="w-full h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: '科技股', value: 60, color: '#34d399' },
                                        { name: '金融股', value: 20, color: '#60a5fa' },
                                        { name: '現金', value: 20, color: '#94a3b8' },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {[
                                        { name: '科技股', value: 60, color: '#34d399' },
                                        { name: '金融股', value: 20, color: '#60a5fa' },
                                        { name: '現金', value: 20, color: '#94a3b8' },
                                    ].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-2">
                        {[
                            { name: '科技', value: 60, color: '#34d399' },
                            { name: '金融', value: 20, color: '#60a5fa' },
                            { name: '現金', value: 20, color: '#94a3b8' },
                        ].map(item => (
                            <div key={item.name} className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                {item.name} {item.value}%
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Holdings Table */}
            <div className="vision-card overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="p-4 text-sm font-semibold text-slate-400 tracking-wider">代號 / 名稱</th>
                                <th className="p-4 text-sm font-semibold text-slate-400 tracking-wider text-right">持有股數</th>
                                <th className="p-4 text-sm font-semibold text-slate-400 tracking-wider text-right">平均成本</th>
                                <th className="p-4 text-sm font-semibold text-slate-400 tracking-wider text-right">目前現價</th>
                                <th className="p-4 text-sm font-semibold text-slate-400 tracking-wider text-right">未實現損益</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockHoldings.map((stock) => (
                                <tr key={stock.symbol} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-4">
                                        <div className="font-black text-white">{stock.symbol}</div>
                                        <div className="text-xs text-slate-400 font-medium mt-0.5">{stock.name}</div>
                                    </td>
                                    <td className="p-4 text-right font-semibold text-slate-300 tabular-nums">{stock.shares.toLocaleString()}</td>
                                    <td className="p-4 text-right font-semibold text-slate-300 tabular-nums">${stock.avgPrice.toFixed(2)}</td>
                                    <td className="p-4 text-right font-black text-white tabular-nums">${stock.currentPrice.toFixed(2)}</td>
                                    <td className="p-4 text-right tabular-nums">
                                        <span className={clsx("font-bold px-3 py-1 rounded-lg text-sm",
                                            stock.pnl >= 0 ? "bg-emerald-500/20 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,118,0.3)]" : "bg-rose-500/20 text-rose-400 drop-shadow-[0_0_8px_rgba(225,29,72,0.3)]"
                                        )}>
                                            {stock.pnl >= 0 ? "+" : ""}{stock.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI Asset Checkup Report (Paywalled) */}
            <div className="vision-card p-1 mt-6 relative overflow-hidden group border-emerald-500/30">
                <div className="bg-black/40 backdrop-blur-md rounded-[22px] p-8">
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.4)]">
                            <Zap className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight text-gradient-silver">🤖 AI 資產健檢報告</h2>
                    </div>

                    <div className="relative z-10 text-lg">
                        <p className="text-slate-200 leading-relaxed mb-3 font-semibold text-[17px]">
                            您的科技股權重達 60%，在近期升息預期下風險較高，建議適度減碼或增加防禦型標的。
                        </p>

                        {/* Blurred Text Area */}
                        <div className="relative">
                            <p className="text-slate-400 leading-relaxed blur-md select-none opacity-50 font-medium">
                                考量到聯準會利率點陣圖可能釋出偏鷹訊號，建議將 15% 的科技股資金轉往公用事業或美債 ETF 以對沖下行風險。同時，演算法偵測到您持有的兩檔半導體設備股具高度連動性，請考慮執行部分獲利了結。
                            </p>

                            {/* Paywall Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/60 to-transparent pt-10">
                                <button
                                    onClick={() => setSubscriptionModalOpen(true)}
                                    className="jelly-button-cta mt-4 flex items-center gap-3 px-8 py-4 !rounded-full relative overflow-hidden group/btn shadow-[0_0_30px_rgba(52,211,118,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                                    <Lock className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_5px_rgba(52,211,118,0.8)]" />
                                    <span className="font-bold text-white tracking-wide text-[15px]">升級 PRO 解鎖完整 AI 調倉建議</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SubscriptionModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setSubscriptionModalOpen(false)}
            />
        </div>
    );
}
