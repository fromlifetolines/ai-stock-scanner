"use client";

import { X, ExternalLink, Link2 } from "lucide-react";

interface SourcesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SourcesModal({ isOpen, onClose }: SourcesModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />
                    <h2 className="text-xl font-bold text-white flex items-center gap-3 relative z-10">
                        <Link2 className="w-5 h-5 text-blue-400" />
                        AI 數據參考來源 (Data Sources)
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                    <p className="text-sm text-slate-400 mb-6">
                        本平台的 AI 分析報告係根據以下公開資訊來源彙整計算而成。點擊連結可前往原始網頁（此為展示用假資料）。
                    </p>

                    <a href="#" onClick={(e) => e.preventDefault()} className="block p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-200 mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    Google Finance
                                </h3>
                                <p className="text-xs text-slate-500">提供即時股價、K 線圖與基礎市場指標數據。</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                    </a>

                    <a href="#" onClick={(e) => e.preventDefault()} className="block p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-200 mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                                    Yahoo Finance
                                </h3>
                                <p className="text-xs text-slate-500">提供外資法人動向、籌碼面分析與歷史財報數據。</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
                        </div>
                    </a>

                    <a href="#" onClick={(e) => e.preventDefault()} className="block p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-200 mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    公開資訊觀測站 (TWSE)
                                </h3>
                                <p className="text-xs text-slate-500">提供台股上市櫃公司最新營收、法說會簡報與重大訊息公告。</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                        </div>
                    </a>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    );
}
