"use client";

import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Bar, Line } from "recharts";
import { Sparkles } from "lucide-react";

// Dummy data for K-Line style placeholder (Using Bar for volume, Line for trend)
const data = [
    { name: "09:30", price: 188.2, volume: 4000 },
    { name: "10:30", price: 188.8, volume: 3000 },
    { name: "11:30", price: 188.1, volume: 2000 },
    { name: "12:30", price: 189.5, volume: 2780 },
    { name: "13:30", price: 189.2, volume: 1890 },
    { name: "14:30", price: 190.1, volume: 2390 },
    { name: "15:30", price: 189.4, volume: 3490 },
];

export function KLineChart() {
    return (
        <div className="glass-card p-6 h-[420px] flex flex-col relative col-span-1 lg:col-span-2">
            {/* AI Summary Badge inside K-Line Chart */}
            <div className="absolute top-6 left-6 right-6 z-10 flex items-start gap-4">
                <div className="glass-border-glow rounded-xl w-full">
                    <div className="bg-slate-900/80 backdrop-blur border border-emerald-500/20 rounded-xl p-3 flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-full shrink-0">
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-300">
                            <span className="text-emerald-400 font-bold mr-2">🤖 AI 技術面大白話：</span>
                            目前位於季線之上，多頭排列但量能萎縮。短期遇前高阻力，建議拉回佈局。
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full mt-20">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                        <YAxis yAxisId="right" orientation="right" display="none" />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", color: "#f8fafc" }}
                            itemStyle={{ color: "#34d399" }}
                        />
                        {/* Dummy representation of Price & Volume */}
                        <Bar yAxisId="right" dataKey="volume" fill="#0f172a" stroke="#1e293b" opacity={0.5} barSize={20} />
                        <Line yAxisId="left" type="monotone" dataKey="price" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: "#0f172a", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
