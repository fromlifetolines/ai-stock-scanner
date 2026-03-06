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
}

interface AppStateContextType {
    // Search & Loading
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoading: boolean;
    loadingStep: string;
    handleSearch: (query: string, marketToken: string) => Promise<void>;

    // Live Sync
    isSyncing: boolean;
    triggerLiveSync: () => Promise<void>;

    // Data
    currentData: StockData | null;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Mock Initial Data
const mockInitialData: StockData = {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.43,
    change: 1.24,
    changePercent: 0.65,
    volume: "54.2M",
    volatility: "中等偏低",
    sentimentScore: 75,
    klineData: [
        { name: "09:30", price: 188.2, volume: 4000 },
        { name: "10:30", price: 188.8, volume: 3000 },
        { name: "11:30", price: 188.1, volume: 2000 },
        { name: "12:30", price: 189.5, volume: 2780 },
        { name: "13:30", price: 189.2, volume: 1890 },
        { name: "14:30", price: 190.1, volume: 2390 },
        { name: "15:30", price: 189.4, volume: 3490 },
    ]
};

export function AppStateProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);
    const [currentData, setCurrentData] = useState<StockData | null>(mockInitialData);

    const handleSearch = async (query: string, marketToken: string) => {
        if (!query.trim()) return;

        setIsLoading(true);
        setSearchQuery(query);

        // Mock Sequence
        setLoadingStep(`連線至 ${marketToken} 交易所...`);
        await new Promise(resolve => setTimeout(resolve, 800));

        setLoadingStep("AI 正在讀取近三季財報...");
        await new Promise(resolve => setTimeout(resolve, 1200));

        setLoadingStep("分析市場情緒中...");
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate mock new data based on query
        const basePrice = Math.random() * 500 + 50;
        const change = (Math.random() * 10 - 5);

        setCurrentData({
            symbol: query.toUpperCase().substring(0, 5),
            name: `${query.toUpperCase()} Corporation`,
            price: Number(basePrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number((change / basePrice * 100).toFixed(2)),
            volume: `${(Math.random() * 100).toFixed(1)}M`,
            volatility: Math.random() > 0.5 ? "高" : "中等偏低",
            sentimentScore: Math.floor(Math.random() * 100),
            klineData: mockInitialData.klineData.map(d => ({
                ...d,
                price: basePrice + (Math.random() * 10 - 5),
                volume: Math.floor(Math.random() * 5000 + 1000)
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
