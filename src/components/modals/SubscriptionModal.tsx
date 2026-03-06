"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, CreditCard, Sparkles } from "lucide-react";

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const features = [
    "解鎖無限次數 AI 財報脫水報告",
    "主力籌碼動向即時追蹤",
    "VIP 專屬 Telegram 短線快訊群",
    "無廣告、極速運算伺服器優先權"
];

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="glass-card max-w-3xl w-full p-0 overflow-hidden relative border-emerald-500/30 z-10 flex flex-col md:flex-row shadow-[0_0_50px_rgba(16,185,129,0.15)]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-slate-900/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Side: Value Prop */}
                        <div className="flex-1 p-8 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wider mb-6">
                                <Sparkles className="w-4 h-4" />
                                PRO 專業版
                            </div>

                            <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                                解鎖華爾街級<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                    AI 投資算力
                                </span>
                            </h2>
                            <p className="text-slate-400 mb-8 font-medium">每天不到一杯咖啡錢，讓資料科學為您的資產增值。</p>

                            <ul className="space-y-4">
                                {features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="flex items-center gap-3 text-slate-300"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Side: Mock Checkout */}
                        <div className="w-full md:w-80 p-8 bg-slate-900 border-l border-slate-800 flex flex-col justify-center">
                            <div className="text-center mb-6">
                                <span className="text-5xl font-black text-white">
                                    $299
                                </span>
                                <span className="text-slate-500 font-medium ml-1">/ 月</span>
                                <p className="text-sm text-slate-400 mt-2">新台幣 NTD，隨時可取消</p>
                            </div>

                            {/* Stripe Mock UI */}
                            <div className="space-y-3 mb-6">
                                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-slate-500" />
                                    <div className="flex-1">
                                        <div className="h-2 w-24 bg-slate-800 rounded mb-1.5" />
                                        <div className="h-1.5 w-16 bg-slate-800 rounded" />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 relative overflow-hidden group">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Lock className="w-4 h-4" /> 確認升級並付款
                                </span>
                            </button>

                            <p className="text-[10px] text-center text-slate-500 mt-4 flex items-center justify-center gap-1">
                                Powered by <span className="font-bold text-slate-400 tracking-wider">Stripe</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Separate component to prevent hydration errors for the Lock icon
import { Lock } from "lucide-react";
