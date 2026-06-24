import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Clock, MapPin, Printer, Search, Star } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { B, ff, ffH } from "@/app/components/shared";
import { SHOPS, UNIVERSITIES } from "@/app/data";

export function StudentShopsPage() {
  const nav = useNavigate();
  const [selectedUni, setSelectedUni] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = SHOPS.filter(
    (s) => (selectedUni === "all" || s.university === selectedUni) &&
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => nav("/student/dashboard")} className="p-2 rounded-lg hover:bg-gray-100"><ChevronRight size={20} className="rotate-180 text-gray-600" /></button>
            <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-9 w-auto object-contain" />
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search shops..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1B7FFD]/30 w-36 sm:w-52" style={ff} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1" style={ffH}>Find a Printing Shop</h1>
          <p className="text-gray-500 text-sm" style={ff}>Browse verified printing shops near your university</p>
        </div>
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setSelectedUni("all")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedUni === "all" ? "bg-[#1B7FFD] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#1B7FFD] hover:text-[#1B7FFD]"}`} style={ff}>All Universities</button>
          {UNIVERSITIES.slice(0, 7).map((u) => (
            <button key={u.abbr} onClick={() => setSelectedUni(u.abbr)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedUni === u.abbr ? "bg-[#1B7FFD] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#1B7FFD] hover:text-[#1B7FFD]"}`} style={ff}>{u.abbr}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((shop) => (
            <div key={shop.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer group" onClick={() => nav("/student/order")}>
              <div className="h-24 flex items-center justify-center relative" style={{ background: `${shop.color}18` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ background: shop.color }}><Printer size={26} /></div>
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 bg-white rounded-full px-2 py-0.5 shadow-sm">
                    <Star size={11} className="text-[#FFC605] fill-[#FFC605]" />
                    <span className="text-xs font-bold text-gray-700">{shop.rating}</span>
                    <span className="text-xs text-gray-400">({shop.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#1B7FFD] transition-colors" style={ffH}>{shop.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin size={11} /><span style={ff}>{shop.distance}</span>
                  <span className="mx-1.5">·</span>
                  <Clock size={11} /><span style={ff}>{shop.hours}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {shop.services.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${shop.color}18`, color: shop.color, ...ff }}>{s}</span>
                  ))}
                  {shop.services.length > 3 && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">+{shop.services.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500" style={ff}>From <span className="font-bold text-gray-800">₱{shop.priceFrom}/page</span></p>
                  <button className="px-4 py-1.5 text-sm font-bold text-white rounded-xl" style={{ background: shop.color, ...ffH }}>Order Now</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <Printer size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500" style={ff}>No shops found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
