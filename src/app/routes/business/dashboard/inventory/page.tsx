import { AlertTriangle, Package } from "lucide-react";
import { B, ff, ffH } from "@/app/components/shared";
import { INVENTORY } from "@/app/data";

export function BusinessInventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Inventory</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#EA6D06] text-white rounded-xl text-sm font-bold shadow-md" style={ffH}><Package size={14} /> Add Stock</button>
      </div>
      <div className="bg-[#FFF9E6] border border-[#FFC605]/30 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-[#FFC605] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-gray-800" style={ff}>Low Stock Alert</p>
          <p className="text-xs text-gray-600" style={ff}>Black Ink Cartridge and Color Ink Cartridge are running low. Consider restocking soon to avoid operational delays.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INVENTORY.map((item) => {
          const isLow = item.stock <= item.low;
          const pct = Math.min(100, (item.stock / (item.low * 3)) * 100);
          return (
            <div key={item.item} className={`bg-white rounded-2xl border shadow-sm p-5 ${isLow ? "border-[#FFC605]/40" : "border-gray-100"}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: item.color }}><Package size={18} /></div>
                {isLow && <span className="text-xs bg-[#FEF9C3] text-[#854D0E] px-2 py-0.5 rounded-full font-semibold">Low Stock</span>}
              </div>
              <p className="font-bold text-gray-800 text-sm mb-0.5" style={ff}>{item.item}</p>
              <p className="text-2xl font-bold mb-2" style={{ ...ffH, color: isLow ? "#EA6D06" : "#1a1a2e" }}>
                {item.stock} <span className="text-sm font-normal text-gray-400">{item.unit}</span>
              </p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: isLow ? "#EA6D06" : item.color }} />
              </div>
              <p className="text-xs text-gray-400" style={ff}>Low threshold: {item.low} {item.unit}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
