import { TrendingUp, Activity, BarChart2 } from "lucide-react";
import clsx from "clsx";

interface MetricProps {
    title: string;
    value: string;
    change: string;
    isPositive?: boolean;
    icon: React.ElementType;
}

function MetricCard({ title, value, change, isPositive, icon: Icon }: MetricProps) {
    return (
        <div className="glass-card p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-16 h-16" />
            </div>
            <div className="flex items-center gap-3 mb-3 text-slate-400">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                    <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-medium text-sm tracking-wide">{title}</span>
            </div>
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
                {change && (
                    <span
                        className={clsx(
                            "text-sm font-semibold flex items-center gap-1",
                            isPositive ? "text-emerald-400" : "text-rose-400",
                            isPositive === undefined && "text-slate-400"
                        )}
                    >
                        {isPositive && <TrendingUp className="w-3 h-3" />}
                        {!isPositive && isPositive !== undefined && <TrendingUp className="w-3 h-3 rotate-180" />}
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}

export function TopMetrics() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <MetricCard
                title="AAPL 目前股價"
                value="$189.43"
                change="+1.24 (0.65%)"
                isPositive={true}
                icon={Activity}
            />
            <MetricCard
                title="24h 交易量"
                value="54.2M"
                change="較昨日 +12%"
                isPositive={true}
                icon={BarChart2}
            />
            <MetricCard
                title="AI 預測波動率"
                value="中等偏低"
                change="穩定區間"
                isPositive={undefined}
                icon={TrendingUp}
            />
        </div>
    );
}
