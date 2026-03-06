"use client";

import { Lock, FileText } from "lucide-react";

export function FundamentalAnalysis({ onUnlock }: { onUnlock: () => void }) {
    return (
        <div className="glass-card p-6 mt-6 col-span-1 lg:col-span-3 relative overflow-hidden group">

            {/* Background Decor */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                    <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white">AI 基本面脫水報告</h2>
            </div>

            {/* Content Area */}
            <div className="relative z-10">
                <p className="text-slate-300 leading-relaxed mb-2 font-medium">
                    本季毛利率上升 2%，主因為高階晶片代工佔比提升及先進封裝產能開出，帶動整體 ASP (平均銷售單價) 增長。
                </p>

                {/* Blurred Text Area */}
                <div className="relative">
                    <p className="text-slate-400 leading-relaxed blur-[6px] select-none opacity-60">
                        此外，資本支出計畫雖維持不變，但在海外擴廠的補助確認入帳後，預計下半年自由現金流將迎來拐點。主力籌碼方面，外資連續三週站在買方，投信則呈現小幅調節，顯示長線資金正持續進駐。風險提示：須留意終端消費性電子需求復甦是否如預期。
                    </p>

                    {/* Paywall Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent">
                        <button
                            onClick={onUnlock}
                            className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 border border-emerald-400/50"
                        >
                            <Lock className="w-4 h-4" />
                            解鎖完整 AI 財報解析與主力籌碼分析 - 每月僅 $299
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
