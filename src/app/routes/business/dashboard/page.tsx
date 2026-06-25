import { useState } from "react";
import { useNavigate } from "react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle, Clock, RefreshCw, ShoppingBag, TrendingUp } from "lucide-react";
import { B, StatusBadge, ff, ffH } from "@/app/components/shared";
import { BIZ_ORDERS, REVENUE_DATA, SERVICE_DATA } from "@/app/data";

export function BusinessDashboardPage() {
  const navigate = useNavigate();
  
  const handleOrderClick = (orderId: string) => {
    navigate(`/business/dashboard/orders/`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Shop Dashboard</h1>
          <p className="text-gray-500 text-sm" style={ff}>Wednesday, June 18, 2026 · Today's Performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors" style={ff}><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders Today", value: "47", sub: "+12 from yesterday", icon: <ShoppingBag size={20} />, color: B.azure, bg: "#EFF6FF" },
          { label: "Total Revenue", value: "₱5,200", sub: "Est. net: ₱3,400", icon: <TrendingUp size={20} />, color: B.verdant, bg: "#F0FFF4" },
          { label: "Pending Orders", value: "8", sub: "Requires processing", icon: <Clock size={20} />, color: B.solar, bg: "#FFFBEB" },
          { label: "Completed Today", value: "34", sub: "5 cancelled", icon: <CheckCircle size={20} />, color: B.tangerine, bg: "#FFF7ED" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <p className="text-2xl font-bold text-gray-800" style={ffH}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5" style={ff}>{s.label}</p>
            <p className="text-xs mt-1 font-semibold" style={{ color: s.color, ...ff }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Revenue vs. Expenses (This Week)</h3>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `₱${v}`} />
              <Tooltip formatter={(v: number, name: string) => [`₱${v.toLocaleString()}`, name === "revenue" ? "Revenue" : "Expenses"]} />
              <Area key="area-revenue" type="monotone" dataKey="revenue" stroke="#1B7FFD" fill="#1B7FFD" fillOpacity={0.12} strokeWidth={2} />
              <Area key="area-expenses" type="monotone" dataKey="expenses" stroke="#EA6D06" fill="#EA6D06" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Service Breakdown</h3>
          <div className="flex rounded-full h-4 overflow-hidden mb-4 gap-0.5">
            {SERVICE_DATA.map((s) => (
              <div key={`stack-${s.name}`} className="h-full" style={{ width: `${s.value}%`, background: s.color }} title={`${s.name}: ${s.value}%`} />
            ))}
          </div>
          <div className="space-y-1.5">
            {SERVICE_DATA.map((s) => (
              <div key={`legend-${s.name}`} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-gray-600" style={ff}>{s.name}</span>
                </div>
                <span className="font-bold text-gray-700">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800" style={ffH}>Recent Orders</h3>
          <span className="text-xs text-[#EA6D06] font-semibold cursor-pointer" style={ff}>View all</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Order ID", "Customer", "Service", "Payment", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-xs font-medium text-gray-500 text-left py-2 pr-6" style={ff}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BIZ_ORDERS.slice(0, 4).map((o) => (
                <tr 
                  key={o.id} 
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleOrderClick(o.id)}
                >
                  <td className="py-3 pr-6 text-sm font-mono font-semibold text-gray-700">{o.id}</td>
                  <td className="py-3 pr-6 text-sm text-gray-700" style={ff}>{o.customer}</td>
                  <td className="py-3 pr-6 text-sm text-gray-600" style={ff}>{o.service}</td>
                  <td className="py-3 pr-6 text-sm text-gray-500" style={ff}>{o.payment}</td>
                  <td className="py-3 pr-6 text-sm font-bold text-gray-800" style={ffH}>₱{o.amount}</td>
                  <td className="py-3"><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
