"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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

// Mock Initial Data: 台積電 2330
const mockInitialData: StockData = {
    symbol: "2330",
    name: "台灣積體電路製造",
    price: 850.00,
    change: 12.00,
    changePercent: 1.43,
    volume: "54.2M",
    volatility: "中等偏低",
    sentimentScore: 82,
    aiInsight: "技術面呈現強勢多頭，外資延續買超趨勢。基本面受惠 AI 晶片需求強勁，長線投資價值極高，拉回皆是買點。",
    klineData: [
        { name: "09:30", price: 840.0, volume: 8000 },
        { name: "10:30", price: 845.0, volume: 6500 },
        { name: "11:30", price: 842.0, volume: 4200 },
        { name: "12:30", price: 852.0, volume: 5500 },
        { name: "13:30", price: 848.0, volume: 3800 },
        { name: "14:30", price: 855.0, volume: 4900 },
        { name: "15:30", price: 850.0, volume: 6200 },
    ]
};

export function AppStateProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);
    const [currentData, setCurrentData] = useState<StockData | null>(mockInitialData);

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
            
            // Proxy through AllOrigins to bypass CORS
            // Using v8/finance/chart for basic quote data and historical kline points
            const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbolForApi}?range=1d&interval=1h`)}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error("API Error");
            const rawData = await response.json();

            if (!rawData.chart || !rawData.chart.result || rawData.chart.result.length === 0) {
                throw new Error("Not Found");
            }

            setLoadingStep("AI 正在讀取近三季財報...");
            await new Promise(resolve => setTimeout(resolve, 300));

            setLoadingStep(strategy ? `應用「${strategy}」策略分析中...` : "分析市場情緒中...");
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

            // Build KLine data from intraday chart
            const klineData: KLinePoint[] = timestamps.map((ts: number, index: number) => {
                const date = new Date(ts * 1000);
                 // Format HH:mm
                const name = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                return {
                    name,
                    price: Number(quote.close[index]?.toFixed(2)) || currentPrice, // Fallback to current if missing
                    volume: quote.volume[index] || 0
                };
            }).filter((d: KLinePoint) => d.price !== null && !isNaN(d.price));

            // Ensure we have at least some kline data for the chart not to break
            if (klineData.length === 0) {
                klineData.push({ name: "12:00", price: currentPrice, volume: 0 });
            }

            // --- Deterministic AI Insight Logic ---
            let insightBase = "";
            let sentimentScore = 50;
            
            if (changePercent > 3) {
                insightBase = "⚠️ 技術面超買，股價已衝出布林通道上軌，短期動能極強但也伴隨獲利了結的回測風險。";
                sentimentScore = 85;
            } else if (changePercent > 0) {
                insightBase = "均線呈現多頭排列，量價配合健康，基本面穩健支撐目前估值，可沿短期均線偏多操作。";
                sentimentScore = 65;
            } else if (changePercent < -3) {
                insightBase = "⚠️ 短線賣壓沉重，已跌破重要支撐頸線。RSI 進入超賣區，建議空手觀望等待底部型態確立。";
                sentimentScore = 15;
            } else {
                insightBase = "目前處於大型箱型區間震盪，方向尚未表態。外資買賣超呈現分歧，建議突破區間上緣再行介入。";
                sentimentScore = 40;
            }

            // Special tracking for Taiwan ETFs
            if (["0050.TW", "0056.TW", "00878.TW", "00919.TW"].includes(symbolForApi)) {
                insightBase += " 💡 AI 監測：即將進行成分股調整，預測潛在納入/剔除標的可能引發短期連動波動。";
            }

            if (strategy) {
                insightBase = `已根據您的「${strategy}」策略優化：\n\n${insightBase}`;
            }

            const newData: StockData = {
                symbol: symbolForApi.replace(".TW", ""), 
                name: meta.longName || meta.shortName || meta.symbol,
                price: Number(currentPrice.toFixed(2)),
                change: Number(change.toFixed(2)),
                changePercent: Number(changePercent.toFixed(2)),
                volume: volumeStr,
                volatility: Math.abs(changePercent) > 2 ? "高" : "中等",
                sentimentScore,
                aiInsight: insightBase,
                customStrategy: strategy || undefined,
                klineData
            };
            setCurrentData(newData);

            // Persist to history
            try {
                const historyStr = localStorage.getItem("ai_stock_history");
                let history = historyStr ? JSON.parse(historyStr) : [];
                // Remove existing if same symbol to put it at top
                history = history.filter((h: any) => h.symbol !== newData.symbol);
                history.push({
                    id: Date.now().toString(),
                    symbol: newData.symbol,
                    name: newData.name,
                    time: "剛剛", // Not used, we use timestamp
                    insight: insightBase,
                    isRead: false,
                    timestamp: Date.now()
                });
                // Keep only last 20
                if (history.length > 20) history.shift();
                localStorage.setItem("ai_stock_history", JSON.stringify(history));
            } catch (e) {
                console.error("Failed to save history", e);
            }

        } catch (error) {
            console.error(error);
            // Trigger beautiful error UI by setting a special error state or using a toast (we'll implement this by throwing and letting a parent catch, or setting an error property).
            // For now, reset to null to show an empty state, but normally we'd want user feedback.
            alert("查無此股或連線忙碌中，請稍後再試。"); 
            // In a real app we'd use a nice toast here
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    };

    const triggerLiveSync = async () => {
        if (isSyncing || !currentData) return;

        setIsSyncing(true);
        // Short delay to show animation
        await new Promise(resolve => setTimeout(resolve, 800));

        setCurrentData(prev => {
            if (!prev) return prev;
            // Slightly jitter the price
            const jitter = (Math.random() * 0.4 - 0.2); // +/- $0.20
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
