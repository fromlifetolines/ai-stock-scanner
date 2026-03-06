"use client";

import { Lock, FileText } from "lucide-react";

export function FundamentalAnalysis({ onUnlock }: { onUnlock: () => void }) {
    return (
        <div className="vision-card p-8 mt-6 col-span-1 lg:col-span-3 relative overflow-hidden group">

            {/* Background Decor */}
            <div className="absolute -right-32 -top-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <FileText className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight text-gradient-silver">AI 基本面脫水報告</h2>
            </div>

            {/* Content Area */}
            <div className="relative z-10 text-lg">
                <p className="text-slate-200 leading-relaxed mb-3 font-semibold">
                    本季毛利率上升 2%，主因為高階晶片代工佔比提升及先進封裝產能開出，帶動整體 ASP (平均銷售單價) 增長。
                </p>

                {/* Blurred Text Area */}
                <div className="relative">
                    <p className="text-slate-400 leading-relaxed blur-md select-none opacity-50 font-medium">
                        此外，資本支出計畫雖維持不變，但在海外擴廠的補助確認入帳後，預計下半年自由現金流將迎來拐點。主力籌碼方面，外資連續三週站在買方，投信則呈現小幅調節，顯示長線資金正持續進駐。風險提示：須留意終端消費性電子需求復甦是否如預期。
                    </p>

                    {/* Paywall Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/40 to-transparent">
                        <button
                            onClick={onUnlock}
                            className="jelly-button-cta mt-8 flex items-center gap-3 px-8 py-4 !rounded-full relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                            <Lock className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_5px_rgba(52,211,118,0.8)]" />
                            <span className="font-bold text-white tracking-wide text-[15px]">解鎖完整 AI 財報解析與主力籌碼分析 - 每月僅 $299</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
