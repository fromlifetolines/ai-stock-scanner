import { TrendingUp, Activity, BarChart2 } from "lucide-react";
import clsx from "clsx";
import { useAppState } from "@/lib/store";

interface MetricProps {
    title: string;
    value: string;
    change: string;
    isPositive?: boolean;
    icon: React.ElementType;
}

function MetricCard({ title, value, change, isPositive, icon: Icon }: MetricProps) {
    return (
        <div className="vision-card p-6 relative overflow-hidden group hover:bg-white/[0.04] transition-colors duration-300">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity blur-sm">
                <Icon className="w-24 h-24 text-white" />
            </div>
            <div className="flex items-center gap-3 mb-4 text-slate-400 relative z-10">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <Icon className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,118,0.6)]" />
                </div>
                <span className="font-semibold text-sm tracking-widest uppercase">{title}</span>
            </div>
            <div className="flex items-baseline gap-3 relative z-10">
                <span className="text-4xl font-black tracking-tighter text-white tabular-nums">{value}</span>
                {change && (
                    <span
                        className={clsx(
                            "text-sm font-bold flex items-center gap-1",
                            isPositive ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,118,0.3)]" : "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]",
                            isPositive === undefined && "text-slate-400"
                        )}
                    >
                        {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
                        {!isPositive && isPositive !== undefined && <TrendingUp className="w-3.5 h-3.5 rotate-180" />}
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}

export function TopMetrics() {
    const { currentData } = useAppState();

    if (!currentData) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
                title={`${currentData.symbol} 目前股價`}
                value={`$${currentData.price.toFixed(2)}`}
                change={`${currentData.change > 0 ? '+' : ''}${currentData.change.toFixed(2)} (${currentData.changePercent > 0 ? '+' : ''}${currentData.changePercent.toFixed(2)}%)`}
                isPositive={currentData.change >= 0}
                icon={Activity}
            />
            <MetricCard
                title="24h 交易量"
                value={currentData.volume}
                change="較昨日 +12%"
                isPositive={true}
                icon={BarChart2}
            />
            <MetricCard
                title="AI 預測波動率"
                value={currentData.volatility}
                change="穩定區間"
                isPositive={undefined}
                icon={TrendingUp}
            />
        </div>
    );
}
