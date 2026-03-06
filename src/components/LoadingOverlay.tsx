"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/lib/store";
import { Cpu } from "lucide-react";

export function LoadingOverlay() {
    const { isLoading, loadingStep } = useAppState();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl pointer-events-auto"
                >
                    <div className="vision-card w-full max-w-sm p-8 flex flex-col items-center justify-center overflow-hidden relative shadow-[0_0_80px_rgba(52,211,118,0.2)] border-emerald-500/30">
                        {/* Scanning beam effect */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(52,211,118,0.8)]"
                            animate={{ y: [0, 200, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />

                        {/* Hexagon/Tech Icon glow */}
                        <div className="relative mb-8">
                            <motion.div
                                className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                            <div className="p-4 bg-white/5 border border-emerald-500/30 rounded-2xl relative z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                                <Cpu className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                            </div>
                        </div>

                        {/* Text Status */}
                        <motion.p
                            key={loadingStep} // Animate text changes
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 tracking-wider text-center"
                        >
                            {loadingStep}
                        </motion.p>

                        {/* Progress bar dummy */}
                        <div className="w-full h-1.5 bg-black/50 rounded-full mt-6 overflow-hidden border border-white/5 shadow-inner">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "easeInOut" }} // Roughly matches total mock wait
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
