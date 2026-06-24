import { Gift, Zap } from "lucide-react";
import { ff, ffH } from "@/app/components/shared";

export function StudentWalletPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800" style={ffH}>Wallet & Rewards</h2>
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-8" style={{ background: "linear-gradient(135deg, #1B7FFD 0%, #3B8FFD 100%)" }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[#FFC605]/20 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-blue-100 text-sm mb-1" style={ff}>Printing Wallet Balance</p>
          <p className="text-5xl font-bold text-white mb-4" style={ffH}>₱450.00</p>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white text-[#1B7FFD] font-bold rounded-xl text-sm shadow-md" style={ffH}>Load Wallet</button>
            <button className="px-6 py-2.5 bg-white/20 text-white font-medium rounded-xl text-sm" style={ff}>View History</button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center"><Gift size={20} className="text-[#FFC605]" /></div>
            <h3 className="font-bold text-gray-800" style={ffH}>Reward Points</h3>
          </div>
          <p className="text-4xl font-bold text-[#FFC605] mb-1" style={ffH}>320 pts</p>
          <p className="text-sm text-gray-500 mb-4" style={ff}>Earn 1 pt per ₱10 spent. Redeem for discounts!</p>
          <div className="bg-[#FFFBEB] rounded-xl p-3">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-600" style={ff}>Progress to Gold</span>
              <span className="font-semibold text-[#FFC605]">320 / 500 pts</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-[#FFC605]" style={{ width: "64%" }} /></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0E6] flex items-center justify-center"><Zap size={20} className="text-[#EA6D06]" /></div>
            <h3 className="font-bold text-gray-800" style={ffH}>Active Benefits</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: "Semester Discount", value: "10% off", badge: "Active" },
              { label: "Cashback Rate", value: "2% on GCash", badge: "Active" },
              { label: "Free Laminating", value: "1x per month", badge: "Available" },
            ].map((b) => (
              <div key={b.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-700" style={ff}>{b.label}</p>
                  <p className="text-xs text-gray-400">{b.value}</p>
                </div>
                <span className="text-xs bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded-full font-medium">{b.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
