"use client";

import { useState, useEffect } from "react";
import { TopMetrics } from "@/components/dashboard/TopMetrics";
import { KLineChart } from "@/components/dashboard/KLineChart";
import { SentimentGauge } from "@/components/dashboard/SentimentGauge";
import { FundamentalAnalysis } from "@/components/dashboard/FundamentalAnalysis";
import { DisclaimerModal } from "@/components/modals/DisclaimerModal";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";
import { useAppState } from "@/lib/store";
import { RefreshCw, Zap } from "lucide-react";
import clsx from "clsx";

export default function Home() {
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const { currentData, isSyncing, triggerLiveSync } = useAppState();

  useEffect(() => {
    const handleOpenModal = () => setSubscriptionModalOpen(true);
    window.addEventListener("open-subscription-modal", handleOpenModal);
    return () => window.removeEventListener("open-subscription-modal", handleOpenModal);
  }, []);

  if (!currentData) return null;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header Area with Live Sync */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight flex-wrap">
          <span className="text-emerald-300 font-extrabold tracking-widest text-xs bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)] uppercase">
            {currentData.symbol}
          </span>
          <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">市場掃描</span>
          <span className="text-slate-500 font-semibold text-2xl truncate max-w-sm" title={currentData.name}>/ {currentData.name}</span>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 ml-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(52,211,118,1)]" />
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 hidden sm:inline-block">Live Sync</span>
          </div>
        </h1>

        {/* Refresh Button */}
        <button
          onClick={triggerLiveSync}
          disabled={isSyncing}
          className="jelly-button py-2 px-4 flex items-center gap-2 text-sm font-bold text-slate-200 group border-white/10 shrink-0"
        >
          <RefreshCw className={clsx("w-4 h-4 text-emerald-400 group-hover:text-emerald-300", isSyncing && "animate-spin")} />
          <span className="hidden sm:inline-block">AI 即時重算</span>
        </button>
      </div>

      <TopMetrics />

      {/* AI Flash Insight */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 p-[1px]">
        <div className="bg-black/80 backdrop-blur-xl rounded-[15px] p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.4)] shrink-0">
            <Zap className="w-6 h-6 text-yellow-950" />
          </div>
          <div>
            <h3 className="text-lg font-black text-yellow-400 mb-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">AI 閃電診斷 (AI Flash Insight)</h3>
            <p className="text-slate-300 font-medium leading-relaxed">
              {currentData.aiInsight}
            </p>
          </div>
        </div>
      </div>

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
