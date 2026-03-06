"use client";

import { TopHeader } from "@/components/TopHeader";
import { Sidebar } from "@/components/Sidebar";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PieChart as PieChartIcon, TrendingUp, TrendingDown, RefreshCw, Zap, Lock, Plus, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppState } from "@/lib/store";
import clsx from "clsx";
import { useState, useEffect, useMemo } from "react";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";
import { motion } from "framer-motion";

interface Holding {
    symbol: string;
    name: string;
    shares: number;
    avgPrice: number;
    currentPrice: number;
}

export default function PortfolioPage() {
    const { isSyncing, triggerLiveSync, currentData, isProUser } = useAppState();
    const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    
    // Add form states
    const [addSymbol, setAddSymbol] = useState("");
    const [addShares, setAddShares] = useState("");
    const [addPrice, setAddPrice] = useState("");

    // Load holdings on mount
    useEffect(() => {
        const saved = localStorage.getItem("ai_stock_holdings");
        if (saved) {
            try {
                setHoldings(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse holdings");
            }
        } else {
            // Default demo data
            setHoldings([
                { symbol: "AAPL", name: "Apple Inc.", shares: 150, avgPrice: 175.2, currentPrice: 189.43 },
                { symbol: "2330.TW", name: "台灣積體電路製造", shares: 2000, avgPrice: 750.0, currentPrice: 850.00 },
            ]);
        }
    }, []);

    // Save holdings
    useEffect(() => {
        if (holdings.length > 0) {
            localStorage.setItem("ai_stock_holdings", JSON.stringify(holdings));
        }
    }, [holdings]);

    // Update current price if it matches global state
    useEffect(() => {
        if (currentData) {
            setHoldings(prev => prev.map(h => {
                if (h.symbol === currentData.symbol || h.symbol === `${currentData.symbol}.TW`) {
                    return { ...h, currentPrice: currentData.price, name: currentData.name };
                }
                return h;
            }));
        }
    }, [currentData]);

    const handleAddHolding = () => {
        if (!addSymbol || !addShares || !addPrice) return;
        
        const newHolding: Holding = {
            symbol: addSymbol.toUpperCase(),
            name: `${addSymbol.toUpperCase()} (待更新)`,
            shares: Number(addShares),
            avgPrice: Number(addPrice),
            currentPrice: Number(addPrice),
        };

        setHoldings(prev => [...prev, newHolding]);
        setIsAdding(false);
        setAddSymbol(""); setAddShares(""); setAddPrice("");
    };

    const removeHolding = (symbol: string) => {
        setHoldings(prev => prev.filter(h => h.symbol !== symbol));
    };

    // Calculate totals dynamically
    const enrichedHoldings = useMemo(() => {
        return holdings.map(h => ({
            ...h,
            pnl: (h.currentPrice - h.avgPrice) * h.shares,
            pnlPercent: h.avgPrice > 0 ? ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100 : 0,
            totalValue: h.currentPrice * h.shares
        }));
    }, [holdings]);

    const totalValue = enrichedHoldings.reduce((sum, h) => sum + h.totalValue, 0);
    const totalCost = enrichedHoldings.reduce((sum, h) => sum + (h.avgPrice * h.shares), 0);
    const totalPnL = totalValue - totalCost;
    const isUnrealizedPositive = totalPnL >= 0;

    // Dynamic Chart Data
    const chartData = useMemo(() => {
        if (enrichedHoldings.length === 0) return [{ name: 'Empty', value: 1, color: '#334155' }];
        
        const tech = enrichedHoldings.filter(h => ['AAPL', 'MSFT', 'NVDA', 'TSLA', '2330.TW', 'TSMC'].includes(h.symbol)).reduce((s, h) => s + h.totalValue, 0);
        const etf = enrichedHoldings.filter(h => h.symbol.includes('0050') || h.symbol.includes('SPY')).reduce((s, h) => s + h.totalValue, 0);
        const other = totalValue - tech - etf;

        const data = [];
        if (tech > 0) data.push({ name: '科技股', value: Number(((tech/totalValue)*100).toFixed(1)), color: '#34d399' });
        if (etf > 0) data.push({ name: 'ETF/大盤', value: Number(((etf/totalValue)*100).toFixed(1)), color: '#60a5fa' });
        if (other > 0) data.push({ name: '其他', value: Number(((other/totalValue)*100).toFixed(1)), color: '#94a3b8' });
        return data.length > 0 ? data : [{ name: 'Empty', value: 1, color: '#334155' }];
    }, [enrichedHoldings, totalValue]);

    return (
        <div className="animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                    <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)]">
                        <PieChartIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">💼 AI 操盤室</span>
                    <span className="text-slate-500 font-semibold text-2xl hidden sm:inline-block">/ 我的投資組合</span>
                </h1>

                <button
                    onClick={triggerLiveSync}
                    disabled={isSyncing}
                    className="jelly-button py-2 px-4 flex items-center gap-2 text-sm font-bold text-slate-200 group border-white/10 shrink-0"
                >
                    <RefreshCw className={clsx("w-4 h-4 text-emerald-400 group-hover:text-emerald-300", isSyncing && "animate-spin")} />
                    <span className="hidden sm:inline-block">即時更新報價</span>
                </button>
            </div>

            {/* Total P&L and Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Total P&L Card */}
                <div className="vision-card p-8 relative overflow-hidden group lg:col-span-2 flex flex-col justify-center min-h-[250px]">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
                    
                    <p className="text-slate-400 font-semibold tracking-widest uppercase mb-4">總資產市值 (USD/TWD)</p>
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
                <div className="vision-card p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                    <h3 className="text-sm font-semibold text-slate-400 tracking-widest uppercase mb-2">資產配置比例</h3>
                    <div className="w-full h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    formatter={(value: any) => [`${value}%`, '佔比']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                        {chartData.map(item => (
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
                <div className="p-4 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
                    <h3 className="font-bold text-white tracking-wide">當前持股明細</h3>
                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg transition-colors border border-emerald-500/30"
                    >
                        <Plus className="w-3 h-3" /> 新增部位
                    </button>
                </div>
                
                {isAdding && (
                    <div className="p-4 bg-black/40 border-b border-white/5 flex flex-wrap gap-4 items-end animate-in slide-in-from-top-2">
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-xs text-slate-400 mb-1">代號</label>
                            <input value={addSymbol} onChange={e => setAddSymbol(e.target.value)} type="text" className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-white text-sm outline-none focus:border-emerald-500/50" placeholder="e.g. 2330.TW" />
                        </div>
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-xs text-slate-400 mb-1">觸數</label>
                            <input value={addShares} onChange={e => setAddShares(e.target.value)} type="number" className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-white text-sm outline-none focus:border-emerald-500/50" placeholder="1000" />
                        </div>
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-xs text-slate-400 mb-1">成本均價</label>
                            <input value={addPrice} onChange={e => setAddPrice(e.target.value)} type="number" step="0.01" className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-white text-sm outline-none focus:border-emerald-500/50" placeholder="150.5" />
                        </div>
                        <button onClick={handleAddHolding} className="jelly-button py-2 px-6 h-[38px] text-sm text-emerald-400 border-emerald-500/30 whitespace-nowrap">
                            確認新增
                        </button>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-black/20">
                                <th className="p-4 text-xs font-semibold text-slate-500 tracking-wider">代號 / 名稱</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 tracking-wider text-right">持有股數</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 tracking-wider text-right">平均成本</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 tracking-wider text-right">目前現價</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 tracking-wider text-right">已實現/未實現</th>
                                <th className="p-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {enrichedHoldings.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-slate-500">尚無部位紀錄</td></tr>
                            ) : enrichedHoldings.map((stock) => (
                                <tr key={stock.symbol} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-4">
                                        <div className="font-black text-white text-sm">{stock.symbol}</div>
                                        <div className="text-xs text-slate-400 mt-0.5 truncate max-w-[150px]" title={stock.name}>{stock.name}</div>
                                    </td>
                                    <td className="p-4 text-right font-semibold text-slate-300 tabular-nums text-sm">{stock.shares.toLocaleString()}</td>
                                    <td className="p-4 text-right font-semibold text-slate-300 tabular-nums text-sm">${stock.avgPrice.toFixed(2)}</td>
                                    <td className="p-4 text-right font-black text-white tabular-nums text-sm">${stock.currentPrice.toFixed(2)}</td>
                                    <td className="p-4 text-right tabular-nums flex flex-col items-end gap-1">
                                        <span className={clsx("font-bold px-3 py-1 rounded-lg text-xs tracking-wider",
                                            stock.pnl >= 0 ? "bg-emerald-500/20 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,118,0.3)]" : "bg-rose-500/20 text-rose-400 drop-shadow-[0_0_8px_rgba(225,29,72,0.3)]"
                                        )}>
                                            {stock.pnl >= 0 ? "+" : ""}{stock.pnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                        <span className={clsx("text-[11px] font-bold px-1", 
                                            stock.pnlPercent >= 0 ? "text-emerald-500" : "text-rose-500"
                                        )}>
                                            {stock.pnlPercent >= 0 ? "+" : ""}{stock.pnlPercent.toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => removeHolding(stock.symbol)} className="text-slate-600 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI Asset Checkup Report (Paywalled) */}
            <div className="vision-card p-1 mt-6 relative overflow-hidden group border-emerald-500/30 mb-8">
                <div className="bg-black/40 backdrop-blur-md rounded-[22px] p-8">
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.4)]">
                            <Zap className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight text-gradient-silver">🤖 AI 資產健檢報告</h2>
                    </div>

                    <div className="relative z-10 text-lg">
                        <p className="text-slate-200 leading-relaxed mb-3 font-semibold text-[17px]">
                            {chartData.find(d => d.name === '科技股')?.value! > 50 
                                ? `您的科技股權重達 ${chartData.find(d => d.name === '科技股')?.value}%，在近期波動市況下風險較高，建議適度減碼或增加防禦型標的。`
                                : "資產配置相對均衡，符合當前 AI 基本面預期模型。"}
                        </p>

                        {/* Blurred Text Area (If NOT pro user) */}
                        <div className="relative mt-4">
                            <p className={clsx("leading-relaxed font-medium transition-all duration-500", 
                                isProUser ? "text-emerald-300/90" : "text-slate-400 blur-[5px] select-none opacity-50"
                            )}>
                                {isProUser 
                                    ? "已解鎖專屬情報：考量到聯準會利率點陣圖可能釋出偏鷹訊號，建議將 15% 的科技股資金轉往公用事業或美債 ETF 以對沖下行風險。同時，演算法偵測到您持有的兩檔半導體設備股具高度連動性，資金使用效率不彰，請考慮執行部分獲利了結並換股操作。"
                                    : "考量到聯準會利率點陣圖可能釋出偏鷹訊號，建議將 15% 的科技股資金轉往公用事業或美債 ETF 以對沖下行風險。同時，演算法偵測到您持有的兩檔半導體設備股具高度連動性，請考慮執行部分獲利了結。"
                                }
                            </p>

                            {/* Paywall Overlay */}
                            {!isProUser && (
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
                            )}
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
