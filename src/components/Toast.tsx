"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Toast() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const handleShowToast = (e: Event) => {
            const customEvent = e as CustomEvent<{ message: string }>;
            setMessage(customEvent.detail.message);
            setTimeout(() => {
                setMessage(null);
            }, 4000);
        };

        window.addEventListener('show-toast', handleShowToast);
        return () => window.removeEventListener('show-toast', handleShowToast);
    }, []);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed top-8 right-8 z-[150]"
                >
                    <div className="bg-gradient-to-r from-emerald-900/90 to-teal-900/90 backdrop-blur-xl border border-emerald-500/50 shadow-[0_0_30px_rgba(52,211,118,0.4)] px-6 py-4 rounded-2xl flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        <span className="text-white font-bold tracking-wide">{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
