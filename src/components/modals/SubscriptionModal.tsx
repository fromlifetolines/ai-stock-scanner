"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, CreditCard, Sparkles, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useAppState } from "@/lib/store";

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
    const { setIsProUser } = useAppState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubscribe = () => {
        setIsProcessing(true);
        // Simulate Stripe network request
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            
            // Wait for success animation, then close and unlock
            setTimeout(() => {
                onClose();
                setIsProUser(true);
                // Reset state for next time
                setTimeout(() => setIsSuccess(false), 500);
                
                window.dispatchEvent(new CustomEvent('show-toast', { 
                    detail: { message: "🎉 歡迎加入 PRO 菁英俱樂部！華爾街級算力已全面解鎖。" } 
                }));
            }, 800);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                        className="vision-card max-w-4xl w-full p-0 overflow-hidden relative z-10 flex flex-col md:flex-row shadow-[0_0_80px_rgba(52,211,118,0.15)]"
                    >
                        <button
                            aria-label="Close Modal"
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-slate-300 hover:text-white transition-colors backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Side: Value Prop */}
                        <div className="flex-1 p-10 bg-transparent relative overflow-hidden">
                            <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-black tracking-widest mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_0_10px_rgba(52,211,118,0.2)]">
                                <Sparkles className="w-4 h-4" />
                                PRO 專業版
                            </div>

                            <h2 className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                                解鎖華爾街級<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 drop-shadow-[0_0_15px_rgba(52,211,118,0.4)]">
                                    AI 投資算力
                                </span>
                            </h2>
                            <p className="text-slate-300 mb-10 font-medium text-lg">每天不到一杯咖啡錢，讓資料科學為您的資產增值。</p>

                            <ul className="space-y-6">
                                {features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex items-center gap-4 text-slate-200 font-semibold"
                                    >
                                        <div className="p-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-[0_0_8px_rgba(52,211,118,0.2)]">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Side: Mock Checkout */}
                        <div className="w-full md:w-[380px] p-10 bg-white/[0.02] border-l border-white/5 flex flex-col justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                            <div className="text-center mb-8 relative z-10">
                                <span className="text-6xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                    $299
                                </span>
                                <span className="text-slate-400 font-bold ml-2 text-lg">/ 月</span>
                                <p className="text-sm text-slate-400 mt-4 font-medium">新台幣 NTD，隨時可取消</p>
                            </div>

                            {/* Stripe Mock UI */}
                            <div className="space-y-4 mb-8 relative z-10">
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                                    <CreditCard className="w-6 h-6 text-slate-400" />
                                    <div className="flex-1">
                                        <div className="h-2.5 w-32 bg-white/10 rounded-full mb-2" />
                                        <div className="h-2 w-20 bg-white/5 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <button 
                                    onClick={handleSubscribe}
                                    disabled={isProcessing || isSuccess}
                                    className={`jelly-button-cta w-full py-4 text-lg font-bold text-white relative overflow-hidden group transition-all duration-300 border border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-[0_0_60px_rgba(52,211,118,0.5)] ring-4 ring-transparent hover:ring-emerald-500/20 hover:scale-[1.03] active:scale-[0.97] ${
                                        isSuccess ? "!bg-emerald-500 !border-emerald-400 !shadow-[0_0_50px_rgba(52,211,118,0.8)] scale-[1.02]" : ""
                                    } ${
                                        isProcessing ? "opacity-90 cursor-wait hover:scale-100" : ""
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {!isProcessing && !isSuccess && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                    )}
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" /> 
                                                <span>連線至 Stripe 授權中...</span>
                                            </>
                                        ) : isSuccess ? (
                                            <>
                                                <CheckCircle2 className="w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" /> 
                                                <span className="tracking-wide">付款成功！</span>
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" /> 
                                                <span>確認升級並付款</span>
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>

                            <p className="text-xs text-center text-slate-500 mt-6 flex items-center justify-center gap-1.5 font-medium relative z-10">
                                Powered by <span className="font-black text-slate-300 tracking-widest uppercase">Stripe</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
