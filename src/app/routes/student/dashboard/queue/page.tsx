import { CheckCircle, Clock, CreditCard, MapPin, Package, QrCode } from "lucide-react";
import { B, ff, ffH } from "@/app/components/shared";

export function StudentQueuePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800" style={ffH}>Queue Monitor</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl p-8 text-white text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B7FFD 0%, #3B8FFD 100%)" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <p className="text-blue-100 text-sm mb-2 relative z-10" style={ff}>YOUR QUEUE NUMBER</p>
          <p className="text-7xl font-bold mb-2 relative z-10" style={ffH}>PP-105</p>
          <p className="text-blue-100 mb-4 relative z-10" style={ff}>Thesis Binding · PrintMaster Dasmariñas</p>
          <div className="bg-white/20 rounded-xl px-4 py-3 relative z-10">
            <p className="text-sm font-medium">Now Serving: <span className="font-bold text-[#FFC605]">PP-103</span></p>
            <p className="text-xs text-blue-100 mt-0.5">Estimated wait: ~15 minutes</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Pickup Details</h3>
          <div className="space-y-3">
            {[
              { label: "Order ID", value: "PP-105", icon: <QrCode size={15} /> },
              { label: "Shop", value: "PrintMaster Dasmariñas", icon: <MapPin size={15} /> },
              { label: "Service", value: "Thesis Binding (Softbound)", icon: <Package size={15} /> },
              { label: "Amount Paid", value: "₱350.00 via GCash", icon: <CreditCard size={15} /> },
              { label: "Status", value: "Processing", icon: <Clock size={15} /> },
            ].map((d) => (
              <div key={d.label} className="flex items-start gap-3 py-2 border-b border-gray-50">
                <div className="mt-0.5 text-[#1B7FFD] flex-shrink-0">{d.icon}</div>
                <div>
                  <p className="text-xs text-gray-400" style={ff}>{d.label}</p>
                  <p className="text-sm font-medium text-gray-700" style={ff}>{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-5" style={ffH}>Order Progress</h3>
        <div className="flex items-start">
          {[
            { label: "Order Placed", sub: "Jun 17, 2:30 PM", done: true },
            { label: "Payment Confirmed", sub: "Jun 17, 2:31 PM", done: true },
            { label: "Processing", sub: "In progress", current: true },
            { label: "Ready for Pickup", sub: "Est. 3:00 PM" },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex-1 flex items-start">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step.done ? "bg-[#5AA864]" : step.current ? "bg-[#1B7FFD] ring-4 ring-[#1B7FFD]/20" : "bg-gray-200"}`}>
                  {step.done ? <CheckCircle size={16} className="text-white" /> : <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <p className={`text-xs font-medium text-center px-1 ${step.done || step.current ? "text-gray-800" : "text-gray-400"}`} style={ff}>{step.label}</p>
                <p className="text-[10px] text-gray-400 text-center mt-0.5" style={ff}>{step.sub}</p>
              </div>
              {i < arr.length - 1 && <div className={`h-0.5 flex-1 mt-4 ${step.done ? "bg-[#5AA864]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
