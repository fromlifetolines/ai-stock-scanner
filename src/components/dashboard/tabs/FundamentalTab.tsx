"use client";

import { useAppState } from "@/lib/store";
import { BookOpen, Target, Newspaper, Lock } from "lucide-react";

export function FundamentalTab({ onUnlock }: { onUnlock: () => void }) {
    const { currentData } = useAppState();
    if (!currentData) return null;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Company Profile */}
                <div className="vision-card p-6 lg:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-400" />
                        公司短評與 AI 亮點
                    </h2>
                    <p className="text-slate-300 leading-relaxed text-sm mb-4">
                        {currentData.name} ({currentData.symbol}) 是一家在所屬行業具備領導地位的企業。AI 模型分析最新財報顯示，其核心業務的毛利率持續以超越同業平均水準的速度成長，主要受惠於終端市場需求強勁與供應鏈最適化。
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5">
                            <div className="text-xs text-slate-500 mb-1">本益比 (P/E)</div>
                            <div className="text-lg font-black text-white">24.5x</div>
                        </div>
                        <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5">
                            <div className="text-xs text-slate-500 mb-1">股東權益報酬 (ROE)</div>
                            <div className="text-lg font-black text-emerald-400">18.2%</div>
                        </div>
                        <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5">
                            <div className="text-xs text-slate-500 mb-1">營業利益率</div>
                            <div className="text-lg font-black text-white">32.4%</div>
                        </div>
                        <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5">
                            <div className="text-xs text-slate-500 mb-1">營收年增率 (YoY)</div>
                            <div className="text-lg font-black text-emerald-400">+15.8%</div>
                        </div>
                    </div>
                </div>

                {/* Competitor Analysis */}
                <div className="vision-card p-6">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-400" />
                        同業競爭力排行
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <span className="font-bold text-emerald-400 flex items-center gap-2"><span className="text-xs bg-emerald-400/20 px-1.5 rounded">1</span> {currentData.symbol}</span>
                            <span className="text-xs text-emerald-300">市佔龍頭</span>
                        </li>
                        <li className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                            <span className="font-semibold text-slate-300 flex items-center gap-2"><span className="text-xs bg-white/10 px-1.5 rounded">2</span> 競爭對手 A</span>
                            <span className="text-xs text-slate-500">追趕中</span>
                        </li>
                        <li className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                            <span className="font-semibold text-slate-300 flex items-center gap-2"><span className="text-xs bg-white/10 px-1.5 rounded">3</span> 競爭對手 B</span>
                            <span className="text-xs text-slate-500">利基市場</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Recent Major News Outline */}
            <div className="vision-card p-6 relative overflow-hidden group border-blue-500/20">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-blue-400" />
                    AI 提煉：近期重大基本面事件
                </h2>
                
                <div className="space-y-4 relative z-10">
                    <div className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        <div>
                            <h4 className="font-bold text-slate-200">最新季度法說會釋出超預期財測</h4>
                            <p className="text-sm text-slate-400 mt-1">管理層表示下半年訂單能見度高，上修全年資本支出與營收目標，優於外資圈預期。</p>
                        </div>
                    </div>
                </div>

                {/* Blurred Premium Area */}
                <div className="mt-4 relative">
                    <div className="flex gap-4 items-start blur-md opacity-40 select-none">
                        <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-200">內部大股東持股異動與供應鏈潛在風險</h4>
                            <p className="text-sm text-slate-400 mt-1">根據最新申報資料，部分高階主管於上月進行大額申讓。同時供應鏈傳出某關鍵零組件良率未達標，可能影響 Q4 旺季出貨排程...</p>
                        </div>
                    </div>
                    
                    {/* Paywall Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                        <button
                            onClick={onUnlock}
                            className="jelly-button-cta flex items-center gap-2 px-6 py-3 !rounded-full relative overflow-hidden shadow-[0_0_20px_rgba(52,211,118,0.15)] bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30"
                        >
                            <Lock className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white text-sm">解鎖 PRO 閱讀潛在隱患與深度分析</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
