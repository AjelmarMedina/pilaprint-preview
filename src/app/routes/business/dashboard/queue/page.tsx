import { useState } from "react";
import { B, ff, ffH } from "@/app/components/shared";

export function BusinessQueuePage() {
  const [serving, setServing] = useState("PP-101");
  const queue = [
    { id: "PP-101", customer: "Maria Santos", service: "Colored Printing" },
    { id: "PP-102", customer: "Juan Cruz", service: "Thesis Binding" },
    { id: "PP-103", customer: "Ana Reyes", service: "B&W Printing" },
    { id: "PP-104", customer: "Carlos Mendoza", service: "Laminating" },
    { id: "PP-105", customer: "Liza Reyes", service: "Spiral Binding" },
  ];
  const servingIdx = queue.findIndex((q) => q.id === serving);
  const current = queue[servingIdx];
  const next = queue[servingIdx + 1];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Queue Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-3xl p-8 text-white text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B7FFD 0%, #3B8FFD 100%)" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <p className="text-blue-100 text-sm mb-2 relative z-10" style={ff}>NOW SERVING</p>
          <p className="text-6xl font-bold mb-3 relative z-10" style={ffH}>{serving}</p>
          <p className="text-blue-100 text-sm mb-6 relative z-10" style={ff}>{current?.customer} · {current?.service}</p>
          <button onClick={() => { if (next) setServing(next.id); }} className="relative z-10 px-6 py-3 bg-white text-[#1B7FFD] font-bold rounded-xl hover:bg-gray-50 transition-all shadow-md text-sm" style={ffH}>Next Customer →</button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-1" style={ffH}>Next In Line</h3>
          <p className="text-4xl font-bold text-[#EA6D06] mb-2" style={ffH}>{next?.id ?? "—"}</p>
          <p className="text-sm text-gray-600" style={ff}>{next ? `${next.customer} · ${next.service}` : "Queue complete"}</p>
          <div className="mt-4 bg-[#FFF7ED] rounded-xl p-3">
            <p className="text-xs text-gray-600" style={ff}><span className="font-bold text-[#EA6D06]">{Math.max(0, queue.length - servingIdx - 1)} customers</span> waiting in queue</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Today's Stats</h3>
          <div className="space-y-3">
            {[
              { label: "Completed Pickups", value: "34", color: B.verdant },
              { label: "Waiting Customers", value: "4", color: B.solar },
              { label: "Active Orders", value: "8", color: B.azure },
              { label: "Avg. Wait Time", value: "18 min", color: B.tangerine },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-sm text-gray-500" style={ff}>{s.label}</span>
                <span className="text-lg font-bold" style={{ color: s.color, ...ffH }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Current Queue</h3>
        <div className="space-y-2">
          {queue.map((q) => {
            const isServing = q.id === serving;
            return (
              <div key={q.id} className={`flex items-center gap-4 p-4 rounded-xl ${isServing ? "bg-[#EFF6FF] border border-[#1B7FFD]/20" : "bg-gray-50"}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: isServing ? B.azure : "#d1d5db", ...ffH }}>{q.id.split("-")[1]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800 text-sm" style={ff}>{q.customer}</p>
                    {isServing && <span className="text-xs bg-[#1B7FFD] text-white px-2 py-0.5 rounded-full font-semibold">Now Serving</span>}
                  </div>
                  <p className="text-xs text-gray-500" style={ff}>{q.service}</p>
                </div>
                <span className="text-sm font-bold text-gray-500 font-mono">{q.id}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
