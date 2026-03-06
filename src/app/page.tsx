"use client";

import { useState, useEffect } from "react";
import { TopMetrics } from "@/components/dashboard/TopMetrics";
import { KLineChart } from "@/components/dashboard/KLineChart";
import { SentimentGauge } from "@/components/dashboard/SentimentGauge";
import { FundamentalAnalysis } from "@/components/dashboard/FundamentalAnalysis";
import { TechnicalTab } from "@/components/dashboard/tabs/TechnicalTab";
import { FundamentalTab } from "@/components/dashboard/tabs/FundamentalTab";
import { DisclaimerModal } from "@/components/modals/DisclaimerModal";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";
import { useAppState } from "@/lib/store";
import { RefreshCw, Zap, LayoutDashboard, LineChart, FileText } from "lucide-react";
import clsx from "clsx";

export default function Home() {
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'technical' | 'fundamental'>('dashboard');
  const { currentData, isSyncing, triggerLiveSync, isLoading } = useAppState();

  useEffect(() => {
    const handleOpenModal = () => setSubscriptionModalOpen(true);
    window.addEventListener("open-subscription-modal", handleOpenModal);
    return () => window.removeEventListener("open-subscription-modal", handleOpenModal);
  }, []);

  if (isLoading) {
    return (
        <div className="animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="h-10 bg-white/5 rounded-lg w-1/2 max-w-md animate-pulse border border-white/5"></div>
                <div className="h-10 bg-white/5 rounded-xl w-32 animate-pulse border border-white/5 shrink-0"></div>
            </div>

            {/* Tab Navigation Skeleton */}
            <div className="h-12 bg-white/5 rounded-2xl w-[340px] mb-8 animate-pulse border border-white/5 mx-auto lg:mx-0"></div>

            {/* Top Metrics Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="h-[120px] bg-white/5 rounded-[22px] animate-pulse border border-emerald-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"></div>
                <div className="h-[120px] bg-white/5 rounded-[22px] animate-pulse border border-white/5"></div>
                <div className="h-[120px] bg-white/5 rounded-[22px] animate-pulse border border-white/5"></div>
            </div>

            {/* AI Flash Insight Skeleton */}
            <div className="h-28 bg-white/5 rounded-[22px] mb-8 animate-pulse border border-emerald-500/10"></div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 h-[400px] bg-white/5 rounded-[22px] animate-pulse border border-white/5"></div>
                <div className="h-[400px] bg-white/5 rounded-[22px] animate-pulse border border-white/5"></div>
            </div>
        </div>
    );
  }

  if (!currentData) {
      return (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 min-h-[50vh] animate-in fade-in">
              <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-xl font-semibold">請在上方搜尋股票代號開始分析</p>
          </div>
      );
  }

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

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mb-8 bg-white/[0.02] p-1.5 rounded-2xl w-fit border border-white/5 mx-auto lg:mx-0">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={clsx(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
            activeTab === 'dashboard' ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.2)]" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
          )}
        >
          <LayoutDashboard className="w-4 h-4" /> 即時概覽
        </button>
        <button
          onClick={() => setActiveTab('technical')}
          className={clsx(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
            activeTab === 'technical' ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.2)]" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
          )}
        >
          <LineChart className="w-4 h-4" /> 技術面深研
        </button>
        <button
          onClick={() => setActiveTab('fundamental')}
          className={clsx(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
            activeTab === 'fundamental' ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.2)]" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
          )}
        >
          <FileText className="w-4 h-4" /> 基本面脫水
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-500">
              <TopMetrics />

              {/* AI Flash Insight */}
              <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 p-[1px]">
                  <div className="bg-black/80 backdrop-blur-xl rounded-[15px] p-6 flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.4)] shrink-0">
                      <Zap className="w-6 h-6 text-yellow-950" />
                  </div>
                  <div>
                      <h3 className="text-lg font-black text-yellow-400 mb-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">AI 閃電診斷 (AI Flash Insight)</h3>
                      <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
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
          </div>
      )}

      {activeTab === 'technical' && <TechnicalTab />}
      
      {activeTab === 'fundamental' && <FundamentalTab onUnlock={() => setSubscriptionModalOpen(true)} />}

      {/* Modals */}
      <DisclaimerModal />
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
      />
    </div>
  );
}
