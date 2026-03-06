"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function SentimentGauge() {
    const score = 75; // 0-100 greedy score

    // Calculate rotation angle. -90deg is 0, 90deg is 100.
    const angle = -90 + (score / 100) * 180;

    return (
        <div className="glass-card p-6 flex flex-col items-center justify-between col-span-1 border-t-2 border-t-emerald-500/50">
            <h3 className="text-slate-400 font-medium w-full text-left mb-4">市場情緒指標 (Fear & Greed)</h3>

            {/* Semi-circle Gauge */}
            <div className="relative w-48 h-24 overflow-hidden mt-4">
                {/* Background track */}
                <div className="absolute w-48 h-48 rounded-full border-[1.5rem] border-slate-800" />

                {/* Gradient fill */}
                <div className="absolute w-48 h-48 rounded-full border-[1.5rem] border-transparent border-t-emerald-400 border-r-emerald-400 border-b-rose-400 border-l-yellow-400 opacity-80"
                    style={{ transform: 'rotate(-45deg)' }} />

                {/* Needle */}
                <motion.div
                    className="absolute bottom-0 left-1/2 w-1 h-20 -ml-0.5 origin-bottom bg-white rounded-t-full shadow-lg z-10"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: angle }}
                    transition={{ type: "spring", stiffness: 50, damping: 15, duration: 1.5 }}
                >
                    {/* Inner circle of needle */}
                    <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-white rounded-full border-4 border-slate-900" />
                </motion.div>
            </div>

            <div className="text-center mt-6">
                <span className="text-3xl font-bold text-white">{score}</span>
                <span className="ml-2 text-emerald-400 font-medium">貪婪 (Greed)</span>
            </div>

            {/* AI News Snippet */}
            <div className="mt-8 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 w-full">
                <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">AI 新聞快訊</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                    聯準會利率決策符合預期，科技股財報季開啟，市場資金回流半導體板塊，推升大盤情緒轉向樂觀貪婪。
                </p>
            </div>
        </div>
    );
}
