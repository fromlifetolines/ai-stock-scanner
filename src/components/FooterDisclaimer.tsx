"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { SourcesModal } from "@/components/modals/SourcesModal";

export function FooterDisclaimer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="fixed bottom-0 left-0 right-0 py-2 px-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 z-50 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 sm:gap-6 pl-0 lg:pl-64">
            
            <p className="text-[10px] text-slate-500 tracking-wide text-center uppercase sm:text-left">
                ⚠️ 免責聲明：本工具由 AI 彙整公開數據生成，僅供學術與技術面研究參考，絕不構成任何投資買賣建議。
            </p>

            <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest hidden sm:block">Sources:</span>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-full transition-colors text-xs text-slate-400 group"
                >
                    <Link2 className="w-3 h-3 text-emerald-500/70 group-hover:text-emerald-400 transition-colors" />
                    <span className="font-medium">Google Finance</span>
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-full transition-colors text-xs text-slate-400 group hidden sm:flex"
                >
                    <Link2 className="w-3 h-3 text-purple-500/70 group-hover:text-purple-400 transition-colors" />
                    <span className="font-medium">Yahoo Finance</span>
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-full transition-colors text-xs text-slate-400 group"
                >
                    <span className="font-medium">+2</span>
                </button>
            </div>

            <SourcesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
