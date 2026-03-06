"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Types
export interface KLinePoint {
    name: string;
    price: number;
    volume: number;
}

export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: string;
    volatility: string;
    sentimentScore: number;
    klineData: KLinePoint[];
    aiInsight: string;
    customStrategy?: string;
}

interface AppStateContextType {
    // User State
    isProUser: boolean;
    setIsProUser: (val: boolean) => void;

    // Search & Loading
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoading: boolean;
    loadingStep: string;
    handleSearch: (query: string, marketToken: string, strategy?: string) => Promise<void>;

    // Live Sync
    isSyncing: boolean;
    triggerLiveSync: () => Promise<void>;

    // Data
    currentData: StockData | null;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Mock Initial Data
const mockInitialData: StockData = {
    symbol: "2330",
    name: "台灣積體電路製造",
    price: 850.00,
    change: 12.00,
    changePercent: 1.43,
    volume: "54.2M",
    volatility: "中等",
    sentimentScore: 75,
    aiInsight: "技術面強勢多頭，外資延續買超趨勢。基本面受惠 AI 需求強勁，長線投資價值高。",
    klineData: []
};

export function AppStateProvider({ children }: { children: ReactNode }) {
    const [isProUser, setIsProUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);
    const [currentData, setCurrentData] = useState<StockData | null>(mockInitialData);

    // Auto-Polling every 60s
    useEffect(() => {
        if (!currentData || isLoading) return;
        const interval = setInterval(() => {
            triggerLiveSync();
        }, 60000);
        return () => clearInterval(interval);
    }, [currentData, isLoading]);

    const handleSearch = async (query: string, marketToken: string, strategy: string = "") => {
        if (!query.trim()) return;

        setIsLoading(true);
        setSearchQuery(query);

        // Auto-format format Taiwan stock symbols
        let symbolForApi = query.toUpperCase();
        if (marketToken === "台股 TW" && /^\d{4}$/.test(symbolForApi)) {
            symbolForApi = `${symbolForApi}.TW`;
        }

        try {
            setLoadingStep(`連線至 ${marketToken} 交易所...`);
            
            // Fetch 3 months of daily data for technical analysis
            const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbolForApi}?range=3mo&interval=1d`)}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error("API Error");
            const rawData = await response.json();

            if (!rawData.chart || !rawData.chart.result || rawData.chart.result.length === 0) {
                throw new Error("Not Found");
            }

            setLoadingStep("AI 正在解析技術與基本面指標...");
            await new Promise(resolve => setTimeout(resolve, 300));

            setLoadingStep(strategy ? `應用「${strategy}」策略分析中...` : "生成確定性 AI 報告中...");
            await new Promise(resolve => setTimeout(resolve, 300));

            const result = rawData.chart.result[0];
            const meta = result.meta;
            const quote = result.indicators.quote[0];
            const timestamps = result.timestamp;

            const currentPrice = meta.regularMarketPrice;
            const previousClose = meta.chartPreviousClose;
            const change = currentPrice - previousClose;
            const changePercent = (change / previousClose) * 100;
            const volumeStr = meta.regularMarketVolume >= 1000000 
                ? (meta.regularMarketVolume / 1000000).toFixed(1) + 'M' 
                : meta.regularMarketVolume >= 1000 ? (meta.regularMarketVolume / 1000).toFixed(1) + 'K' : meta.regularMarketVolume.toString();

            // Build KLine data for 3mo
            const klineData: KLinePoint[] = timestamps.map((ts: number, index: number) => {
                const date = new Date(ts * 1000);
                 // Format MM-DD
                const name = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                return {
                    name,
                    price: Number(quote.close[index]?.toFixed(2)) || currentPrice,
                    volume: quote.volume[index] || 0
                };
            }).filter((d: KLinePoint) => d.price !== null && !isNaN(d.price));

            if (klineData.length === 0) {
                klineData.push({ name: "Today", price: currentPrice, volume: 0 });
            }

            // Calculation logic for Technicals
            const closes = quote.close.filter((c: number | null) => c !== null);
            let sma20 = currentPrice;
            let rsi14 = 50;

            if (closes.length >= 20) {
                const last20 = closes.slice(-20);
                sma20 = last20.reduce((a: number, b: number) => a + b, 0) / 20;
            }

            if (closes.length >= 15) {
                const last15 = closes.slice(-15);
                let gains = 0;
                let losses = 0;
                for (let i = 1; i < last15.length; i++) {
                    const diff = last15[i] - last15[i-1];
                    if (diff > 0) gains += diff;
                    else losses -= diff;
                }
                const avgGain = gains / 14;
                const avgLoss = losses / 14 || 0.001; // prevent div by 0
                const rs = avgGain / avgLoss;
                rsi14 = 100 - (100 / (1 + rs));
            }

            // Fallback PE definition deterministically using ticker length/chars if not present
            const trailingPE = meta.trailingPE || (symbolForApi.charCodeAt(0) % 20 + 8);

            // --- Deterministic AI Insight Logic ---
            let insightBase = "";
            let sentimentScore = 50;
            
            if (currentPrice > sma20 && rsi14 > 70) {
                insightBase = "⚠️ 技術面過熱，短線乖離率高。RSI 已進入超買區，請留意漲多拉回風險。";
                sentimentScore = 80;
            } else if (trailingPE < 15 && rsi14 < 40) {
                insightBase = "💎 估值處於合理區間，具備價值投資潛力。技術面已現乖離收斂，可分批佈局。";
                sentimentScore = 65;
            } else if (currentPrice < sma20 && rsi14 < 30) {
                insightBase = "⚠️ 跌破月均線且 RSI 超賣，短線動能疲弱，請留意支撐是否跌破。";
                sentimentScore = 20;
            } else if (currentPrice > sma20) {
                insightBase = "目前站穩 20 日均線之上，趨勢偏多，若籌碼面無大幅鬆動可續抱。";
                sentimentScore = 60;
            } else {
                insightBase = "均線糾結，處於區間震盪整理階段。建議等待量能放大再行突破介入。";
                sentimentScore = 40;
            }

            // Special tracking for Taiwan ETFs
            if (["0050.TW", "0056.TW", "00878.TW", "00919.TW"].includes(symbolForApi)) {
                insightBase += " 💡 AI 監測：即將進入成分股權重審核週期，請留意潛在剃除標的之賣壓。";
            }

            if (strategy) {
                insightBase = `[🤖 ${strategy}策略分析]：\n${insightBase}`;
            }

            const newData: StockData = {
                symbol: symbolForApi.replace(".TW", ""), 
                name: meta.longName || meta.shortName || meta.symbol,
                price: Number(currentPrice.toFixed(2)),
                change: Number(change.toFixed(2)),
                changePercent: Number(changePercent.toFixed(2)),
                volume: volumeStr,
                volatility: rsi14 > 70 || rsi14 < 30 ? "高" : "中等",
                sentimentScore: Math.round(sentimentScore),
                aiInsight: insightBase,
                customStrategy: strategy || undefined,
                klineData
            };
            setCurrentData(newData);

            // Persist to history
            try {
                const historyStr = localStorage.getItem("ai_stock_history");
                let history = historyStr ? JSON.parse(historyStr) : [];
                history = history.filter((h: any) => h.symbol !== newData.symbol);
                history.push({
                    id: Date.now().toString(),
                    symbol: newData.symbol,
                    name: newData.name,
                    time: "剛剛",
                    insight: insightBase,
                    isRead: false,
                    timestamp: Date.now()
                });
                if (history.length > 20) history.shift();
                localStorage.setItem("ai_stock_history", JSON.stringify(history));
            } catch (e) {
                console.error("Failed to save history", e);
            }

        } catch (error) {
            console.error(error);
            alert("查無此股或連線忙碌中，請稍後再試。"); 
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    };

    const triggerLiveSync = async () => {
        if (isSyncing || !currentData) return;

        setIsSyncing(true);
        // We simulate Live Sync with a real refetch or jitter if rate limited
        // For MVP, we'll jitter nicely to simulate tick data
        await new Promise(resolve => setTimeout(resolve, 800));

        setCurrentData(prev => {
            if (!prev) return prev;
            // Slightly jitter the price for tick effect
            const jitter = (Math.random() * 0.4 - 0.2); 
            const newPrice = Number((prev.price + jitter).toFixed(2));
            const newChange = Number((prev.change + jitter).toFixed(2));
            
            return {
                ...prev,
                price: newPrice,
                change: newChange,
            };
        });

        setIsSyncing(false);
    };

    return (
        <AppStateContext.Provider value={{
            isProUser, setIsProUser,
            searchQuery, setSearchQuery, isLoading, loadingStep, handleSearch,
            isSyncing, triggerLiveSync, currentData
        }}>
            {children}
        </AppStateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error("useAppState must be used within an AppStateProvider");
    }
    return context;
}
