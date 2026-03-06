"use client";

import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export function DisclaimerModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        // Check local storage for previous agreement
        const hasAgreed = localStorage.getItem("ai-stock-scanner-disclaimer");
        if (!hasAgreed) {
            setIsOpen(true);
        }
    }, []);

    const handleAgree = () => {
        if (agreed) {
            localStorage.setItem("ai-stock-scanner-disclaimer", "true");
            setIsOpen(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4">
            <div className="vision-card max-w-lg w-full p-8 relative overflow-hidden border-rose-500/20 shadow-[0_0_50px_rgba(225,29,72,0.15)]">

                {/* Warning Icon Deco */}
                <div className="flex justify-center mb-6 relative z-10">
                    <div className="p-4 bg-rose-500/10 rounded-[2rem] border border-rose-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <AlertTriangle className="w-12 h-12 text-rose-500 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]" />
                    </div>
                </div>

                <h2 className="text-2xl font-black text-center text-white mb-6 tracking-tight text-gradient-silver">免責聲明與風險告知</h2>

                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] mb-8 max-h-48 overflow-y-auto text-sm text-slate-300 leading-relaxed space-y-4 font-medium relative z-10">
                    <p>
                        歡迎使用 <strong className="text-white">AI Stock Scanner (AI股票搜尋器)</strong>。本工具提供之所有內容、數據分析與 AI 生成摘要，均源自公開資訊與演算法模型，<strong className="text-rose-400">僅供學術與技術面研究參考，絕不構成任何投資、買賣或財務建議。</strong>
                    </p>
                    <p>
                        金融市場瞬息萬變，AI 模型可能存在誤差與滯後性。投資人應根據自身風險承受能力，獨立判斷並自負盈虧。本平台不對任何因依賴本系統資訊而導致的直接或間接交易損失負責。
                    </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group mb-10 p-4 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5 relative z-10">
                    <div className="mt-0.5">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-white/20 bg-black/50 text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-black transition-all cursor-pointer"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                    </div>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors leading-snug">
                        我已詳細閱讀上述免責聲明，了解並同意承擔所有相關投資風險。
                    </span>
                </label>

                <div className="relative z-10">
                    <button
                        onClick={handleAgree}
                        disabled={!agreed}
                        className={`w-full py-4 text-base font-bold transition-all duration-300 ${agreed
                                ? "jelly-button-cta text-white"
                                : "jelly-button opacity-50 text-slate-400 cursor-not-allowed border-none shadow-none bg-white/5"
                            }`}
                    >
                        我同意並進入系統
                    </button>
                </div>
            </div>
        </div>
    );
}
