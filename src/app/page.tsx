"use client";

import { useState, useEffect } from "react";
import { TopMetrics } from "@/components/dashboard/TopMetrics";
import { KLineChart } from "@/components/dashboard/KLineChart";
import { SentimentGauge } from "@/components/dashboard/SentimentGauge";
import { FundamentalAnalysis } from "@/components/dashboard/FundamentalAnalysis";
import { DisclaimerModal } from "@/components/modals/DisclaimerModal";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";

export default function Home() {
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setSubscriptionModalOpen(true);
    window.addEventListener("open-subscription-modal", handleOpenModal);
    return () => window.removeEventListener("open-subscription-modal", handleOpenModal);
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
        <span className="text-emerald-300 font-extrabold tracking-widest text-xs bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)] uppercase">AAPL</span>
        <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">市場掃描</span>
        <span className="text-slate-500 font-semibold text-2xl">/ Apple Inc.</span>
      </h1>

      <TopMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KLineChart />
        <SentimentGauge />
      </div>

      <FundamentalAnalysis onUnlock={() => setSubscriptionModalOpen(true)} />

      {/* Modals */}
      <DisclaimerModal />
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
      />
    </div>
  );
}
