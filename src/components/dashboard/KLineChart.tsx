"use client";

import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Bar, Line } from "recharts";
import { Sparkles } from "lucide-react";
import { useAppState } from "@/lib/store";

export function KLineChart() {
    const { currentData } = useAppState();

    if (!currentData || !currentData.klineData) return null;

    return (
        <div className="vision-card p-6 h-[420px] flex flex-col relative col-span-1 lg:col-span-2 hover:bg-white/[0.04] transition-colors duration-300">
            {/* AI Summary Badge inside K-Line Chart */}
            <div className="absolute top-6 left-6 right-6 z-10 flex items-start gap-4">
                <div className="w-full">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-2xl p-4 flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-full shrink-0 shadow-[0_0_10px_rgba(52,211,118,0.3)]">
                            <Sparkles className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,118,0.8)]" />
                        </div>
                        <p className="text-sm font-medium text-slate-200 leading-relaxed">
                            <span className="text-emerald-400 font-extrabold mr-2 drop-shadow-[0_0_4px_rgba(52,211,118,0.5)]">🤖 AI 技術面大白話：</span>
                            目前位於季線之上，多頭排列但量能萎縮。短期遇前高阻力，建議拉回佈局。
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full mt-24 relative z-0">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={currentData.klineData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                        <YAxis yAxisId="right" orientation="right" display="none" />
                        <Tooltip
                            contentStyle={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#f8fafc", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                            itemStyle={{ color: "#34d399", fontWeight: "bold" }}
                        />
                        <Bar yAxisId="right" dataKey="volume" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.05)" opacity={0.8} barSize={20} radius={[4, 4, 0, 0]} />
                        <Line yAxisId="left" type="monotone" dataKey="price" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: "#000", strokeWidth: 2, stroke: "#34d399" }} activeDot={{ r: 6, fill: "#fff", stroke: "#34d399", strokeWidth: 3 }} style={{ filter: "drop-shadow(0px 4px 6px rgba(52,211,118,0.4))" }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
