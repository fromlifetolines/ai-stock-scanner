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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="glass-card max-w-lg w-full p-8 shadow-2xl relative border-rose-500/30">

                {/* Warning Icon Deco */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-rose-500/10 rounded-full border border-rose-500/20">
                        <AlertTriangle className="w-10 h-10 text-rose-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-white mb-4">免責聲明與風險告知</h2>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 mb-6 max-h-48 overflow-y-auto text-sm text-slate-300 leading-relaxed space-y-3">
                    <p>
                        歡迎使用 <strong>AI Stock Scanner (AI股票搜尋器)</strong>。本工具提供之所有內容、數據分析與 AI 生成摘要，均源自公開資訊與演算法模型，<strong>僅供學術與技術面研究參考，絕不構成任何投資、買賣或財務建議。</strong>
                    </p>
                    <p>
                        金融市場瞬息萬變，AI 模型可能存在誤差與滯後性。投資人應根據自身風險承受能力，獨立判斷並自負盈虧。本平台不對任何因依賴本系統資訊而導致的直接或間接交易損失負責。
                    </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group mb-8 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="mt-0.5">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-slate-900"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                        我已詳細閱讀上述免責聲明，了解並同意承擔所有相關投資風險。
                    </span>
                </label>

                <button
                    onClick={handleAgree}
                    disabled={!agreed}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all ${agreed
                            ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        }`}
                >
                    我同意並進入系統
                </button>
            </div>
        </div>
    );
}
