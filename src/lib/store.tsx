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

        // Mock Sequence (Total ~1.5s)
        setLoadingStep(`連線至 ${marketToken} 交易所...`);
        await new Promise(resolve => setTimeout(resolve, 500));

        setLoadingStep("AI 正在讀取近三季財報...");
        await new Promise(resolve => setTimeout(resolve, 500));

        setLoadingStep(strategy ? `應用「${strategy}」策略分析中...` : "分析市場情緒中...");
        await new Promise(resolve => setTimeout(resolve, 500));

        // Generate mock new data based on query
        const basePrice = Math.random() > 0.5 ? Math.random() * 800 + 50 : Math.random() * 100 + 10;
        const change = (Math.random() * 10 - 5);

        // Random insights
        const insights = [
            "技術面均線上彎呈現極強勢多頭，但籌碼面監測到主力正於高檔緩步出貨。若跌破短線防守價，建議適度減碼以鎖定獲利。",
            "目前處於大型箱型區間震盪，MACD 指標綠柱縮減即將黃金交叉。外資買盤尚未連續，建議空手觀望，突破區間上緣再行介入。",
            "基本面優異且估值偏低，AI 資金流向正顯示有被動型 ETF 買盤持續進駐，屬於價值投資絕佳買點，可分批佈局。",
            "短線乖離過大，技術面出現過熱訊號 (RSI > 80)。量能萎縮顯示追價意願不足，近期可能面臨大幅回檔修正風險。",
            "產業正處於復甦週期的初期階段，財報盈餘驚喜 (Earnings Surprise) 機率高。法人默默籌碼集中，突破前高指日可待。"
        ];
        
        // Add strategy prefix if provided
        let randomInsight = insights[Math.floor(Math.random() * insights.length)];
        if (strategy) {
            randomInsight = `已根據您的「${strategy}」策略優化：\n\n${randomInsight}`;
        }

        setCurrentData({
            symbol: query.toUpperCase().substring(0, 5),
            name: `${query.toUpperCase()} Corporation`,
            price: Number(basePrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number((change / basePrice * 100).toFixed(2)),
            volume: `${(Math.random() * 100).toFixed(1)}M`,
            volatility: Math.random() > 0.5 ? "高" : "中等偏低",
            sentimentScore: Math.floor(Math.random() * 100),
            aiInsight: randomInsight,
            customStrategy: strategy || undefined,
            klineData: mockInitialData.klineData.map(d => ({
                ...d,
                price: basePrice + (Math.random() * (basePrice * 0.05) - (basePrice * 0.025)), // +/- 2.5% variation
                volume: Math.floor(Math.random() * 10000 + 1000)
            }))
        });

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
