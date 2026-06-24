import { useNavigate } from "react-router";
import { Bell, CheckCircle } from "lucide-react";
import { ff, ffH } from "@/app/components/shared";

export function StudentOrderSuccessPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-20 h-20 rounded-full bg-[#dcfce7] flex items-center justify-center mb-6"><CheckCircle size={44} className="text-[#5AA864]" /></div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center" style={ffH}>Order Confirmed! 🎉</h1>
      <p className="text-gray-500 mb-8 text-center max-w-sm" style={ff}>Your printing order has been placed. Here's your queue information.</p>

      <div className="w-full max-w-md rounded-3xl p-8 text-white text-center mb-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B7FFD 0%, #3B8FFD 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-blue-100 text-sm mb-1" style={ff}>YOUR QUEUE NUMBER</p>
          <p className="text-8xl font-bold my-3" style={ffH}>PP-108</p>
          <div className="bg-white/20 rounded-xl px-4 py-2 inline-block">
            <p className="text-sm font-semibold">PrintMaster Dasmariñas</p>
            <p className="text-xs text-blue-100">Estimated: 25–35 minutes</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Order Details</h3>
        <div className="space-y-2">
          {[
            { label: "Order ID", value: "PP-108" },
            { label: "Service", value: "B&W Printing, Spiral Binding" },
            { label: "Pages", value: "30 pages · 1 copy" },
            { label: "Total Paid", value: "₱90.00 via GCash" },
            { label: "Shop", value: "PrintMaster Dasmariñas" },
          ].map((d) => (
            <div key={d.label} className="flex justify-between py-1.5 border-b border-gray-50 text-sm">
              <span className="text-gray-500" style={ff}>{d.label}</span>
              <span className="font-semibold text-gray-800" style={ff}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md bg-[#FFF9E6] rounded-2xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <Bell size={18} className="text-[#FFC605] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700" style={ff}>You will receive a notification when your order is ready. Please bring queue number <strong>PP-108</strong> when claiming.</p>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-md">
        <button onClick={() => nav("/student/dashboard")} className="flex-1 py-3.5 bg-[#1B7FFD] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-md" style={ffH}>Go to Dashboard</button>
        <button onClick={() => nav("/student/shops")} className="flex-1 py-3.5 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all" style={ffH}>New Order</button>
      </div>
    </div>
  );
}
