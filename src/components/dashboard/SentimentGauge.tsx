"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAppState } from "@/lib/store";

export function SentimentGauge() {
    const { currentData } = useAppState();
    const score = currentData?.sentimentScore || 50;
    const angle = -90 + (score / 100) * 180;

    return (
        <div className="vision-card p-6 flex flex-col items-center justify-between col-span-1 border-t-2 border-t-emerald-500/50 hover:bg-white/[0.04] transition-colors duration-300">
            <h3 className="text-slate-400 font-semibold w-full text-left mb-4 tracking-wide">市場情緒指標 (Fear & Greed)</h3>

            {/* Semi-circle Gauge */}
            <div className="relative w-48 h-24 overflow-hidden mt-6 drop-shadow-[0_0_15px_rgba(52,211,118,0.2)]">
                {/* Background track */}
                <div className="absolute w-48 h-48 rounded-full border-[1.5rem] border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]" />

                {/* Gradient fill */}
                <div className="absolute w-48 h-48 rounded-full border-[1.5rem] border-transparent border-t-emerald-400 border-r-emerald-400 border-b-rose-500 border-l-yellow-400 opacity-90 mix-blend-screen"
                    style={{ transform: 'rotate(-45deg)' }} />

                {/* Needle */}
                <motion.div
                    className="absolute bottom-0 left-1/2 w-1.5 h-20 -ml-[3px] origin-bottom bg-gradient-to-t from-white/20 to-white rounded-t-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: angle }}
                    transition={{ type: "spring", stiffness: 40, damping: 12, duration: 1.5 }}
                >
                    {/* Inner circle of needle */}
                    <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-white rounded-full border-4 border-black shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </motion.div>
            </div>

            <div className="text-center mt-6">
                <span className="text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{score}</span>
                <span className="ml-3 text-emerald-400 font-bold uppercase tracking-widest drop-shadow-[0_0_5px_rgba(52,211,118,0.5)]">貪婪 (Greed)</span>
            </div>

            {/* AI News Snippet */}
            <div className="mt-8 bg-white/5 p-4 rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] w-full">
                <div className="flex items-center gap-2 mb-2 text-yellow-400">
                    <Zap className="w-4 h-4 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                    <span className="text-xs font-black uppercase tracking-widest">AI 新聞快訊</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300 font-medium">
                    聯準會利率決策符合預期，科技股財報季開啟，市場資金回流半導體板塊，推升大盤情緒轉向樂觀貪婪。
                </p>
            </div>
        </div>
    );
}
