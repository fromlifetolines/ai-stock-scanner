"use client";

import { Newspaper, Zap, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { SubscriptionModal } from "@/components/modals/SubscriptionModal";
import clsx from "clsx";
import { useAppState } from "@/lib/store";

interface NewsItem {
    id: string;
    title: string;
    time: string;
    source: string;
    sentiment: "positive" | "negative" | "neutral";
    sentimentLabel: string;
    isPremium: boolean;
    url: string;
}

export default function NewsPage() {
    const { currentData, isProUser } = useAppState();
    const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            await new Promise(r => setTimeout(r, 600)); // Simulate loading
            const fakeNews: NewsItem[] = [
                { id: "1", title: "輝達 (NVIDIA) 宣佈推出下一代 AI 晶片架構，算力大幅躍升", time: "2小時前", source: "華爾街日報", sentiment: "positive", sentimentLabel: "偏多", isPremium: false, url: "#" },
                { id: "2", title: "聯準會 (Fed) 暗示年內可能維持高利率，市場觀望情緒濃", time: "4小時前", source: "彭博社", sentiment: "negative", sentimentLabel: "偏空", isPremium: false, url: "#" },
                { id: "3", title: "台積電法說會釋出樂觀展望，資本支出提振供應鏈信心", time: "6小時前", source: "經濟日報", sentiment: "positive", sentimentLabel: "偏多", isPremium: false, url: "#" },
                { id: "4", title: "美國最新 CPI 數據略高於預期，抗通膨最後一哩路仍顛簸", time: "8小時前", source: "CNBC", sentiment: "negative", sentimentLabel: "偏空", isPremium: true, url: "#" },
                { id: "5", title: "蘋果 (Apple) 宣佈將大規模整合生成式 AI 進入下代 iOS 系列", time: "10小時前", source: "科技新報", sentiment: "positive", sentimentLabel: "偏多", isPremium: true, url: "#" }
            ];
            setNewsData(fakeNews);
            setIsLoading(false);
        };

        fetchNews();
    }, [currentData?.symbol, isProUser]);

    return (
        <div className="animate-in fade-in duration-700 max-w-5xl mx-auto pb-12">
            <h1 className="text-3xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,118,0.2)]">
                    <Newspaper className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-gradient-silver drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">每日時事</span>
                <span className="text-slate-500 font-semibold text-2xl hidden sm:inline-block">/ {currentData?.symbol || '市場'} AI 財經新聞</span>
            </h1>

            {/* AI Today's Market Summary Hero Card */}
            <div className="vision-card p-1 mb-10 relative overflow-hidden group border-emerald-500/30">
                <div className="bg-gradient-to-br from-emerald-900/40 via-black to-blue-900/20 backdrop-blur-xl rounded-[22px] p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_0_15px_rgba(52,211,118,0.4)]">
                            <Zap className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-yellow-400 tracking-tight drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">🤖 AI 今日市場總評</h2>
                    </div>
                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-semibold">
                        {currentData 
                            ? `針對 ${currentData.name} (${currentData.symbol}) 的近期動態：AI 綜合分析顯示，${currentData.sentimentScore > 60 ? '市場情緒偏多' : currentData.sentimentScore < 40 ? '市場情緒趨於謹慎' : '目前處於多空交戰中'}。建議搭配技術面訊號與下方即時新聞進行綜合判斷。`
                            : "今日資金流向半導體板塊，加權指數突破關鍵壓力位，建議留意落後補漲的中小型科技股，並避開近期融資餘額異常增加的傳產標的。"}
                    </p>
                </div>
            </div>

            {/* News Feed */}
            <div className="space-y-4 relative min-h-[400px]">
                {isLoading ? (
                    // Skeleton Loading
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="vision-card p-6 flex flex-col justify-between gap-4 animate-pulse">
                            <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
                            <div className="flex gap-4">
                                <div className="h-4 bg-white/5 rounded w-16"></div>
                                <div className="h-4 bg-white/5 rounded w-20"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    newsData.map((news) => (
                        <a 
                            key={news.id} 
                            href={news.isPremium ? "#" : news.url}
                            target={news.isPremium ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                if (news.isPremium) {
                                    e.preventDefault();
                                    setSubscriptionModalOpen(true);
                                }
                            }}
                            className={clsx(
                                "vision-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:bg-white/[0.08] block",
                                news.isPremium && "border-yellow-500/20 shadow-[0_0_15px_rgba(250,204,21,0.05)] select-none cursor-pointer"
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
                                "shrink-0 px-3 py-1.5 rounded-lg border font-bold text-sm flex items-center gap-2 max-w-fit mt-2 sm:mt-0",
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
                        </a>
                    ))
                )}

                {/* PRO Paywall Overlay for News */}
                {!isProUser && !isLoading && newsData.length > 3 && (
                    <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#0F172A] xl:from-slate-900 via-[#0F172A]/90 to-transparent flex flex-col items-center justify-end pb-8 z-10 pointer-events-none">
                        <button
                            onClick={() => setSubscriptionModalOpen(true)}
                            className="pointer-events-auto jelly-button-cta flex items-center gap-3 px-6 sm:px-8 py-4 !rounded-full relative overflow-hidden group shadow-[0_0_30px_rgba(52,211,118,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            <Lock className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_5px_rgba(52,211,118,0.8)]" />
                            <span className="font-bold text-white tracking-wide text-[14px] sm:text-[15px]">解鎖 PRO 閱讀獨家內部消息</span>
                        </button>
                        <p className="mt-4 text-xs font-semibold text-slate-500 tracking-widest uppercase">Premium Intelligence</p>
                    </div>
                )}
            </div>

            <SubscriptionModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setSubscriptionModalOpen(false)}
            />
        </div>
    );
}
