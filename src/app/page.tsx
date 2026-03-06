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
    <div className="animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-emerald-400 font-extrabold tracking-widest text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">AAPL</span>
        市場掃描 <span className="text-slate-500 font-medium">/ Apple Inc.</span>
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
