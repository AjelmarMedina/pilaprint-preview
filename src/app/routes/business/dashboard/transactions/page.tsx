import { useState } from "react";
import { Download } from "lucide-react";
import { B, StatusBadge, ff, ffH } from "@/app/components/shared";
import { BIZ_ORDERS } from "@/app/data";

export function BusinessTransactionsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? BIZ_ORDERS : BIZ_ORDERS.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Transactions</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50" style={ff}><Download size={14} /> Export</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: BIZ_ORDERS.length, color: B.azure },
          { label: "Completed", value: BIZ_ORDERS.filter((o) => o.status === "completed").length, color: B.verdant },
          { label: "Ongoing", value: BIZ_ORDERS.filter((o) => o.status === "ongoing").length, color: B.azure },
          { label: "Pending", value: BIZ_ORDERS.filter((o) => o.status === "pending").length, color: B.solar },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: s.color, ...ffH }}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5" style={ff}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "ongoing", "ready", "completed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? "bg-[#EA6D06] text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-[#EA6D06] hover:text-[#EA6D06]"}`} style={ff}>{f}</button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Order ID", "Customer", "Service", "Payment", "Amount", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-xs font-medium text-gray-500 text-left px-5 py-3.5" style={ff}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono font-semibold text-gray-700">{o.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-700" style={ff}>{o.customer}</td>
                  <td className="px-5 py-4 text-sm text-gray-600" style={ff}>{o.service}</td>
                  <td className="px-5 py-4 text-sm text-gray-500" style={ff}>{o.payment}</td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-800" style={ffH}>₱{o.amount}</td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4"><button className="text-xs text-[#EA6D06] font-semibold hover:underline" style={ff}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
