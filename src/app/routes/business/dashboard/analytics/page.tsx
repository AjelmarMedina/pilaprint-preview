import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { B, ff, ffH } from "@/app/components/shared";
import { REVENUE_DATA, SERVICE_DATA, WEEKLY_DATA } from "@/app/data";

export function BusinessAnalyticsPage() {
  const [period, setPeriod] = useState("daily");
  const data = period === "daily" ? REVENUE_DATA : WEEKLY_DATA;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Sales Analytics</h1>
        <div className="flex gap-2">
          {["daily", "weekly", "monthly"].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${period === p ? "bg-[#EA6D06] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#EA6D06]"}`} style={ff}>{p}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-1" style={ffH}>Revenue Trend</h3>
        <p className="text-sm text-gray-500 mb-5" style={ff}>June 2026 · Total: ₱106,000</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart key={period} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey={period === "daily" ? "day" : "week"} tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#1B7FFD" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Best-Selling Services</h3>
          <div className="space-y-3">
            {SERVICE_DATA.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600" style={ff}>{s.name}</span>
                  <span className="font-bold text-gray-800">{s.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Peak Hours</h3>
          <div className="space-y-3">
            {[
              { time: "7:00–9:00 AM", orders: 42, pct: 85 },
              { time: "11:00 AM–1:00 PM", orders: 38, pct: 76 },
              { time: "3:00–5:00 PM", orders: 50, pct: 100 },
              { time: "6:00–8:00 PM", orders: 29, pct: 58 },
            ].map((h) => (
              <div key={h.time}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500" style={ff}>{h.time}</span>
                  <span className="font-bold text-gray-700">{h.orders} orders</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-[#FFC605]" style={{ width: `${h.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#FFF9E6] rounded-xl p-3 text-xs text-center font-medium text-gray-700" style={ff}>Peak: <strong>3:00–5:00 PM</strong> daily</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Monthly Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Total Revenue", value: "₱106,000", color: B.azure },
              { label: "Total Expenses", value: "₱38,200", color: B.tangerine },
              { label: "Net Profit", value: "₱67,800", color: B.verdant },
              { label: "Total Orders", value: "855", color: B.solar },
              { label: "Avg. Order", value: "₱124", color: B.sakura },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-sm text-gray-500" style={ff}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color: s.color, ...ffH }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
