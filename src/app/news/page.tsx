"use client";

import { Newspaper, Zap, Lock } from "lucide-react";
import { useState } from "react";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";
import clsx from "clsx";

export default function NewsPage() {
    const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    const newsData = [
        { id: 1, title: "台積電法說會釋出利多，全年營收展望上修", time: "上午 10:30", source: "工商時報", sentiment: "positive", sentimentLabel: "極度看多", isPremium: false },
        { id: 2, title: "聯準會維持利率不變，點陣圖顯示降息時程延後", time: "上午 08:15", source: "Bloomberg", sentiment: "neutral", sentimentLabel: "情緒中立", isPremium: false },
        { id: 3, title: "長榮海運營收月增 15%，運價指數持續攀升", time: "昨天 15:40", source: "經濟日報", sentiment: "positive", sentimentLabel: "偏多", isPremium: false },
        { id: 4, title: "外資出具報告降評多檔 AI 概念股，強調估值過高", time: "昨天 13:20", source: "Reuters", sentiment: "negative", sentimentLabel: "短線偏空", isPremium: false },
        { id: 5, title: "【獨家內幕】蘋果供應鏈砍單疑雲，下半年訂單調整細節", time: "昨天 11:00", source: "內部情報", sentiment: "negative", sentimentLabel: "高度風險", isPremium: true },
        { id: 6, title: "【深度分析】AI 晶片下一代架構解析與台廠受惠名單", time: "昨天 09:30", source: "產業研究", sentiment: "positive", sentimentLabel: "長線看多", isPremium: true },
    ];

    return (
        <div className="animate-in fade-in duration-700 max-w-5xl mx-auto pb-12">
            <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)]">
                    <Newspaper className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">每日時事</span>
                <span className="text-slate-500 font-semibold text-2xl">/ AI 財經新聞</span>
            </h1>

            {/* AI Today's Market Summary Hero Card */}
            <div className="vision-card p-1 mb-10 relative overflow-hidden group border-emerald-500/30">
                <div className="bg-gradient-to-br from-emerald-900/40 via-black to-blue-900/20 backdrop-blur-xl rounded-[22px] p-8">
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.4)]">
                            <Zap className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        </div>
                        <h2 className="text-2xl font-black text-yellow-400 tracking-tight drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">🤖 AI 今日市場總評</h2>
                    </div>
                    <p className="text-lg text-slate-200 leading-relaxed font-semibold">
                        今日資金流向半導體板塊，加權指數突破關鍵壓力位，<span className="text-emerald-400">市場情緒偏向貪婪 (Greed)</span>。建議留意落後補漲的中小型科技股，並避開近期融資餘額異常增加的傳產標的。
                    </p>
                </div>
            </div>

            {/* News Feed */}
            <div className="space-y-4 relative">
                {newsData.map((news) => (
                    <div 
                        key={news.id} 
                        className={clsx(
                            "vision-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:bg-white/[0.04]",
                            news.isPremium && "border-yellow-500/20 shadow-[0_0_15px_rgba(250,204,21,0.05)]",
                            news.isPremium && "select-none"
                        )}
                    >
                        <div className={clsx("flex-1", news.isPremium && "blur-[6px] opacity-70")}>
                            <h3 className="text-lg font-bold text-white mb-2 leading-snug">{news.title}</h3>
                            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                <span>{news.time}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span>{news.source}</span>
                            </div>
                        </div>

                        {/* AI Sentiment Tag */}
                        <div className={clsx(
                            "shrink-0 px-3 py-1.5 rounded-lg border font-bold text-sm flex items-center gap-2",
                            news.isPremium && "blur-[6px] opacity-70",
                            news.sentiment === 'positive' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(52,211,118,0.1)]",
                            news.sentiment === 'negative' && "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_10px_rgba(225,29,72,0.1)]",
                            news.sentiment === 'neutral' && "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.1)]"
                        )}>
                            <div className={clsx(
                                "w-1.5 h-1.5 rounded-full",
                                news.sentiment === 'positive' && "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,118,1)]",
                                news.sentiment === 'negative' && "bg-rose-400 shadow-[0_0_8px_rgba(225,29,72,1)]",
                                news.sentiment === 'neutral' && "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,1)]"
                            )} />
                            AI 解讀: {news.sentimentLabel}
                        </div>
                    </div>
                ))}

                {/* PRO Paywall Overlay for News */}
                <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#0F172A] xl:from-slate-900 via-[#0F172A]/80 to-transparent flex flex-col items-center justify-end pb-8 z-10 pointer-events-none">
                    <button
                        onClick={() => setSubscriptionModalOpen(true)}
                        className="pointer-events-auto jelly-button-cta flex items-center gap-3 px-8 py-4 !rounded-full relative overflow-hidden group shadow-[0_0_30px_rgba(52,211,118,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        <Lock className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_5px_rgba(52,211,118,0.8)]" />
                        <span className="font-bold text-white tracking-wide text-[15px]">解鎖 PRO 閱讀獨家內部消息</span>
                    </button>
                    <p className="mt-4 text-xs font-semibold text-slate-500 tracking-widest uppercase">Premium Intelligence</p>
                </div>
            </div>

            <SubscriptionModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setSubscriptionModalOpen(false)}
            />
        </div>
    );
}
