import { useNavigate } from "react-router";
import { FileText, Package, Plus, Printer, TrendingUp, Wallet, Gift, History, Eye, Clock, CheckCircle, Zap } from "lucide-react";
import { B, StatusBadge, ff, ffH } from "@/app/components/shared";
import { STUDENT_ORDERS } from "@/app/data";

export function StudentDashboardPage() {
  const nav = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800" style={ffH}>Good morning, Maria! 👋</h2>
        <p className="text-gray-500 text-sm" style={ff}>Wednesday, June 18, 2026</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Orders", value: "2", icon: <Package size={18} />, color: B.azure, bg: "#EFF6FF" },
          { label: "Wallet Balance", value: "₱450", icon: <Wallet size={18} />, color: B.verdant, bg: "#F0FFF4" },
          { label: "Points", value: "320", icon: <Gift size={18} />, color: B.solar, bg: "#FFFBEB" },
          { label: "Total Orders", value: "14", icon: <History size={18} />, color: B.tangerine, bg: "#FFF7ED" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              <TrendingUp size={12} className="text-gray-300" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800" style={ffH}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight" style={ff}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800" style={ffH}>Active Orders</h3>
            <button onClick={() => nav("/student/dashboard/orders")} className="text-xs text-[#1B7FFD]" style={ff}>View all</button>
          </div>
          <div className="space-y-3">
            {STUDENT_ORDERS.filter((o) => ["ongoing", "pending"].includes(o.status)).map((order) => (
              <div key={order.id} className="flex items-center gap-2 sm:gap-4 p-3 rounded-xl bg-gray-50 hover:bg-[#F0F7FF] transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-[#1B7FFD] flex items-center justify-center text-white flex-shrink-0"><Printer size={16} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-800 truncate" style={ff}>{order.service}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-gray-500 truncate" style={ff}>{order.id} · {order.shop}</p>
                </div>
                <p className="hidden sm:block text-sm font-bold text-[#1B7FFD] flex-shrink-0" style={ffH}>₱{order.amount}</p>
              </div>
            ))}
          </div>
          <button onClick={() => nav("/student/shops")} className="w-full mt-4 py-3 bg-[#1B7FFD] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-100" style={ffH}>
            <Plus size={16} /> Place New Order
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B7FFD 0%, #3B8FFD 100%)" }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <p className="text-blue-100 text-xs mb-0.5 relative z-10" style={ff}>Current Queue</p>
            <p className="text-4xl font-bold mb-0.5 relative z-10" style={ffH}>PP-105</p>
            <p className="text-blue-100 text-xs mb-3 relative z-10" style={ff}>Thesis Binding · Now Serving PP-103</p>
            <div className="bg-white/20 rounded-xl px-3 py-2 text-xs font-medium relative z-10">Est. wait: ~15 minutes</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "New Order", icon: <Plus size={16} />, color: B.azure, path: "/student/shops" },
                { label: "Track Order", icon: <Eye size={16} />, color: B.verdant, path: "/student/dashboard/queue" },
                { label: "Add Funds", icon: <Wallet size={16} />, color: B.tangerine, path: "/student/dashboard/wallet" },
                { label: "My Files", icon: <FileText size={16} />, color: B.sakura, path: "/student/dashboard/documents" },
              ].map((a) => (
                <button key={a.label} onClick={() => nav(a.path)} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors" style={ff}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: a.color }}>{a.icon}</div>
                  <span className="text-xs text-gray-600 font-medium">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Transaction History</h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Order ID</th>
                <th className="text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Service</th>
                <th className="hidden sm:table-cell text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Shop</th>
                <th className="hidden sm:table-cell text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Date</th>
                <th className="text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Amount</th>
                <th className="text-xs font-medium text-gray-500 text-left py-2" style={ff}>Status</th>
              </tr>
            </thead>
            <tbody>
              {STUDENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-3 text-xs font-mono font-medium text-gray-700">{order.id}</td>
                  <td className="py-3 pr-3 text-xs text-gray-600 max-w-[120px] truncate" style={ff}>{order.service}</td>
                  <td className="hidden sm:table-cell py-3 pr-3 text-xs text-gray-500 truncate" style={ff}>{order.shop.split(" ")[0]}</td>
                  <td className="hidden sm:table-cell py-3 pr-3 text-xs text-gray-500" style={ff}>{order.date}</td>
                  <td className="py-3 pr-3 text-sm font-bold text-gray-800 whitespace-nowrap" style={ffH}>₱{order.amount}</td>
                  <td className="py-3"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
