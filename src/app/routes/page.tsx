import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Menu, Printer, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { B, ff, ffH } from "./shared";

function Navbar() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => nav("/")}>
            <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-10 w-auto object-contain" />
          </button>
          <div className="hidden md:flex items-center gap-6">
            {["Features", "How It Works", "Universities"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-gray-600 hover:text-[#1B7FFD] transition-colors" style={ff}>
                {l}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => nav("/business/login")} className="px-4 py-2 text-sm font-semibold text-[#EA6D06] border-2 border-[#EA6D06] rounded-xl hover:bg-[#EA6D06] hover:text-white transition-all" style={ff}>
              Partner Shop
            </button>
            <button onClick={() => nav("/student/login")} className="px-4 py-2 text-sm font-semibold text-white bg-[#1B7FFD] rounded-xl hover:bg-blue-600 transition-all shadow-md" style={ff}>
              Student Login
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-2">
            <button onClick={() => nav("/student/login")} className="w-full py-2.5 text-white bg-[#1B7FFD] rounded-xl font-semibold text-sm" style={ff}>
              Student Login
            </button>
            <button onClick={() => nav("/business/login")} className="w-full py-2.5 text-[#EA6D06] border-2 border-[#EA6D06] rounded-xl font-semibold text-sm" style={ff}>
              Partner Shop
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#FEFDF8]" style={ff}>
      <Navbar />

      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 overflow-hidden">
        <div className="absolute top-24 right-8 w-36 h-36 rounded-full bg-[#FFC605]/25 pointer-events-none" />
        <div className="absolute top-48 right-52 w-14 h-14 bg-[#F0A5B7]/40 rotate-45 pointer-events-none" />
        <div className="absolute bottom-12 left-8 w-24 h-24 rounded-full bg-[#5AA864]/20 pointer-events-none" />
        <div className="absolute top-36 left-24 w-10 h-10 bg-[#EA6D06]/20 rotate-12 pointer-events-none" />
        <div className="absolute top-16 left-1/2 w-6 h-6 rounded-full bg-[#F0A5B7]/50 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1B7FFD]/10 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#1B7FFD] animate-pulse" />
              <span className="text-sm text-[#1B7FFD] font-medium" style={ff}>Now serving Dasmariñas, Cavite</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6" style={ffH}>
              Your Campus{" "}<span className="text-[#1B7FFD]">Printing</span>,{" "}<br />
              <span className="text-[#EA6D06]">Simplified.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg" style={ff}>
              Upload, order, and pick up your prints without the hassle. PilaPrint connects Dasmariñas university students with trusted nearby printing shops.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={() => nav("/student/login")} className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1B7FFD] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 text-lg" style={ffH}>
                Get Started Free <ArrowRight size={20} />
              </button>
              <button onClick={() => nav("/business/login")} className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#EA6D06] font-bold border-2 border-[#EA6D06] rounded-2xl hover:bg-[#EA6D06] hover:text-white transition-all text-lg" style={ffH}>
                Partner Your Shop
              </button>
            </div>
            <div className="flex gap-4 sm:gap-10">
              {[
                { val: "12+", label: "Universities", color: B.azure },
                { val: "50+", label: "Partner Shops", color: B.tangerine },
                { val: "10k+", label: "Students Served", color: B.verdant },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold" style={{ color: s.color, ...ffH }}>{s.val}</p>
                  <p className="text-sm text-gray-500" style={ff}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-8 w-auto object-contain" />
                  <span className="text-xs bg-[#dcfce7] text-[#166534] px-2.5 py-0.5 rounded-full font-semibold">● Live</span>
                </div>
                <div className="bg-[#F8FAFF] rounded-2xl p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-3" style={ff}>Your Order Status</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1B7FFD] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Printer size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800" style={ff}>Thesis Binding – PP-105</p>
                      <p className="text-xs text-gray-500">PrintMaster Dasmariñas</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {["Placed", "Processing", "Ready"].map((step, i) => (
                      <div key={step} className="flex-1 text-center">
                        <div className={`w-full h-1.5 rounded-full mb-1 ${i < 2 ? "bg-[#1B7FFD]" : "bg-gray-200"}`} />
                        <p className={`text-[10px] font-medium ${i < 2 ? "text-[#1B7FFD]" : "text-gray-400"}`}>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-[#FFF9E6] rounded-xl p-3">
                    <p className="text-[10px] text-[#EA6D06] font-semibold mb-1">ETA</p>
                    <p className="text-xs text-gray-600">Ready in 15 mins</p>
                  </div>
                  <div className="flex-1 bg-[#F0FFF4] rounded-xl p-3">
                    <p className="text-[10px] text-[#5AA864] font-semibold mb-1">Wallet</p>
                    <p className="text-xs text-gray-600">₱450 balance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
