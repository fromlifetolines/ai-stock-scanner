"use client";

import { Lock, FileText, LineChart, BarChart3, Activity, Radar, Target, AlertTriangle } from "lucide-react";
import { useAppState } from "@/lib/store";
import clsx from "clsx";

export function FundamentalAnalysis({ onUnlock }: { onUnlock: () => void }) {
    const { isProUser, currentData } = useAppState();

    return (
        <div className="vision-card p-8 mt-6 col-span-1 lg:col-span-3 relative overflow-hidden group border-emerald-500/10">

            {/* Background Decor */}
            <div className="absolute -right-32 -top-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header Area */}
            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <FileText className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight text-gradient-silver">AI 深度洞察報告</h2>
            </div>

            {/* Default Introduction text */}
            <div className="relative z-10 text-lg mb-6">
                <p className="text-slate-200 leading-relaxed font-semibold">
                    {currentData ? `針對 ${currentData.name} (${currentData.symbol})：近期營運動能符合市場預期，短中期均線形成強力支撐，帶動整體籌碼集中度提升。` : "本季毛利率上升 2%，主因為高階晶片代工佔比提升及先進封裝產能開出，帶動整體 ASP (平均銷售單價) 增長。"}
                </p>
            </div>

            {/* Content Area */}
            {!isProUser ? (
                /* Blurred View & Paywall Overlay */
                <div className="relative mt-8 min-h-[300px] flex flex-col justify-end">
                    <p className="text-slate-400 leading-relaxed font-medium blur-[6px] select-none opacity-50 absolute inset-0 z-0">
                        此外，資本支出計畫雖維持不變，但在海外擴廠的補助確認入帳後，預計下半年自由現金流將迎來拐點。主力籌碼方面，外資連續三週站在買方，投信則呈現小幅調節，顯示長線資金正持續進駐。風險提示：須留意終端消費性電子需求復甦是否如預期。建議在 10 日線附近分批佈局，停損設於季線下方 3%。各種技術指標MACD/KD翻正，營收動能維持穩健增長趨勢不變。
                    </p>

                    <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/80 to-transparent pb-10 z-10 pointer-events-none">
                        <button
                            onClick={onUnlock}
                            className="jelly-button-cta pointer-events-auto flex flex-col items-center gap-1 px-8 py-4 !rounded-3xl relative overflow-hidden group/btn shadow-[0_0_40px_rgba(52,211,118,0.25)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                            <div className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_5px_rgba(52,211,118,0.8)]" />
                                <span className="font-black text-white tracking-wide text-[16px]">解鎖 PRO：查看 AI 精確進場點位與高階圖表</span>
                            </div>
                            <span className="text-xs text-emerald-100/70 font-medium tracking-wider mt-1">根據 20 種技術指標與基本面綜合計算</span>
                        </button>
                    </div>
                </div>
            ) : (
                /* PRO UNLOCKED VIEW */
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10 mt-4">
                    
                    {/* Section 1: Detailed K-Line & Tech Analysis */}
                    <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 tracking-wide">
                            <LineChart className="w-5 h-5" /> 深度技術指標剖析
                        </h3>
                        {/* Dynamic Mock Chart Background */}
                        <div className="h-32 bg-black/50 rounded-xl border border-white/5 mb-5 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent" />
                            <svg className="w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path d="M0,80 Q25,40 50,70 T100,20" fill="none" stroke="#34d399" strokeWidth="2" />
                                <path d="M0,90 Q25,60 50,80 T100,50" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
                                <path d="M0,100 Q25,80 50,90 T100,70" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
                            </svg>
                            <div className="absolute text-[11px] font-bold font-mono bottom-2 right-3 flex gap-3 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                                <span className="text-emerald-400 shrink-0">MACD</span>
                                <span className="text-amber-400 shrink-0">RSI</span>
                                <span className="text-blue-400 shrink-0">KD</span>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[15px]">
                            <span className="text-white font-black px-2 py-0.5 bg-white/10 rounded mr-2">技術面</span> 
                            K 線站穩 5/10/20 三線之上，MACD 柱狀圖翻正，量價配合極佳。短期動能強勁，RSI 進入強勢區間但未見背離。
                        </p>
                    </div>

                    {/* Section 2: Fundamental Insight & Block */}
                    <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <h3 className="text-blue-400 font-bold mb-5 flex items-center gap-2 tracking-wide">
                            <BarChart3 className="w-5 h-5" /> 財報核心數據近四季趨勢
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center">
                                <span className="text-xs text-slate-400 mb-1.5 font-bold tracking-widest">本益比 (P/E)</span>
                                <span className="text-2xl font-black text-white font-mono">15.4x</span>
                            </div>
                            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center">
                                <span className="text-xs text-slate-400 mb-1.5 font-bold tracking-widest">股價淨值比 (P/B)</span>
                                <span className="text-2xl font-black text-white font-mono">2.8x</span>
                            </div>
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center shadow-[inset_0_0_15px_rgba(52,211,118,0.05)] relative overflow-hidden group/stat">
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/50" />
                                <span className="text-xs text-emerald-500/70 mb-1.5 font-bold tracking-widest">毛利率</span>
                                <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">42.5%</span>
                            </div>
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center shadow-[inset_0_0_15px_rgba(52,211,118,0.05)] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/50" />
                                <span className="text-xs text-emerald-500/70 mb-1.5 font-bold tracking-widest">ROE</span>
                                <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">24.1%</span>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-[15px]">
                            <span className="text-white font-black px-2 py-0.5 bg-white/10 rounded mr-2">基本面</span> 
                            毛利結構改善，現金流充沛，估值低於同業平均，具備防禦性價值。預期下半年度受惠於新品拉貨效應，營收有望逐月走高。
                        </p>
                    </div>

                    {/* Section 3: Chip Radar (籌碼雷達) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            <h3 className="text-purple-400 font-bold mb-6 flex items-center gap-2 tracking-wide">
                                <Activity className="w-5 h-5" /> 法人動向雷達
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[13px] text-slate-400 font-bold tracking-wide">外資連續買力</span>
                                        <span className="text-emerald-400 font-black text-lg bg-emerald-500/10 px-2 py-0.5 rounded">+12,540 張</span>
                                    </div>
                                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5 relative">
                                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,118,0.8)]" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[13px] text-slate-400 font-bold tracking-wide">投信調節賣壓</span>
                                        <span className="text-rose-400 font-black text-lg bg-rose-500/10 px-2 py-0.5 rounded">-1,200 張</span>
                                    </div>
                                    <div className="w-full bg-slate-900 rounded-full h-2 flex justify-end overflow-hidden border border-white/5">
                                        <div className="bg-gradient-to-l from-rose-600 to-rose-400 h-2 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.8)]" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/10 border border-purple-500/20 rounded-2xl flex flex-col justify-center relative overflow-hidden group shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]">
                            <div className="absolute right-0 bottom-0 opacity-[0.05] blur-[1px] transform translate-x-4 translate-y-4">
                                <Radar className="w-[150px] h-[150px] text-purple-400 group-hover:scale-110 transition-transform duration-1000" />
                            </div>
                            <h3 className="text-purple-300 font-black mb-3 text-lg drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">主力判讀：</h3>
                            <p className="text-purple-100/90 leading-relaxed text-[15px] relative z-10 font-medium tracking-wide">
                                籌碼趨於集中，大戶持股比重連續兩週上升。<span className="text-white font-bold bg-white/10 px-1 rounded mx-1">散戶退場跡象明顯</span>，融資餘額加速穩定下降，有利於後續急拉。
                            </p>
                        </div>
                    </div>

                    {/* Section 4: Operational Strategy Suggestion */}
                    <div className="p-8 bg-gradient-to-br from-emerald-900/30 to-slate-900/80 border border-emerald-500/30 rounded-2xl relative overflow-hidden mt-6 shadow-[0_0_40px_rgba(52,211,118,0.1)]">
                        <div className="absolute top-0 right-0 p-4 opacity-10 blur-[2px] pointer-events-none">
                            <Target className="w-32 h-32 text-emerald-400" />
                        </div>
                        <h3 className="text-emerald-400 font-black mb-6 text-xl flex items-center gap-2 drop-shadow-[0_0_8px_rgba(52,211,118,0.5)]">
                            <Target className="w-6 h-6" /> AI 實戰操作策略
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
                            <div className="px-5 py-4 bg-black/60 border border-emerald-500/20 rounded-xl flex flex-col items-center sm:items-start shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                                <span className="text-[13px] text-slate-400 block mb-1.5 font-bold tracking-widest">預估支撐位</span>
                                <span className="font-mono font-black text-white text-2xl tracking-tighter">$148.50</span>
                            </div>
                            <div className="px-5 py-4 bg-black/60 border border-rose-500/20 rounded-xl flex flex-col items-center sm:items-start shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                                <span className="text-[13px] text-slate-400 block mb-1.5 font-bold tracking-widest">預估壓力位</span>
                                <span className="font-mono font-black text-white text-2xl tracking-tighter">$162.00</span>
                            </div>
                            <div className="px-5 py-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl shadow-[inset_0_0_15px_rgba(234,179,8,0.1),_0_0_15px_rgba(234,179,8,0.1)] flex flex-col items-center sm:items-start relative overflow-hidden group/stop">
                                <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/stop:animate-[shimmer_1.5s_infinite]" />
                                <span className="text-[13px] text-yellow-500/90 block mb-1.5 font-black tracking-widest">防守停損點</span>
                                <span className="font-mono font-black text-yellow-400 text-2xl tracking-tighter">$142.00</span>
                            </div>
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-start gap-2 pt-5 border-t border-white/10 relative z-10">
                            <AlertTriangle className="w-4 h-4 text-yellow-500/70 shrink-0 relative top-0.5" />
                            <p className="leading-relaxed font-medium tracking-wide">
                                ⚠️ 聲明：以上數據經由 AI 模型計算財報與技術指標之公開資料所得，為純粹之機率統計顯示，僅供數據參考模型，絕不代表任何實際投資買賣建議。
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
