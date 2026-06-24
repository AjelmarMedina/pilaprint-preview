import { useNavigate } from "react-router";
import { Printer, Plus } from "lucide-react";
import { StatusBadge, ff, ffH } from "@/app/components/shared";
import { STUDENT_ORDERS } from "@/app/data";

export function StudentOrdersPage() {
  const nav = useNavigate();
  const filtered = STUDENT_ORDERS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800" style={ffH}>My Orders</h2>
        <button onClick={() => nav("/student/shops")} className="px-4 py-2 bg-[#1B7FFD] text-white text-sm font-bold rounded-xl flex items-center gap-2" style={ffH}><Plus size={16} /> New Order</button>
      </div>
      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0"><Printer size={22} className="text-[#1B7FFD]" /></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-gray-800" style={ff}>{order.service}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-sm text-gray-500" style={ff}>{order.id} · {order.pages} pages · {order.shop}</p>
                  <p className="text-xs text-gray-400 mt-0.5" style={ff}>{order.date}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold text-gray-800" style={ffH}>₱{order.amount}</p>
                <button className="mt-1 text-xs text-[#1B7FFD] hover:underline" style={ff}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
