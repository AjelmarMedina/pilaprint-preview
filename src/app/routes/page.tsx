import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  ArrowRight, 
  Menu, 
  Printer,
  X,
  FileText,
  CheckCircle,
  Upload,
  Wallet,
  Clock,
  Bell,
  CreditCard,
  Star,
  MapPin,
  Package,
  Users
} from 'lucide-react';
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { B, ff, ffH } from "@/app/components/shared";
import { UNIVERSITIES } from "@/app/data";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "../components/footer";

export function LandingPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-[#FEFDF8]" style={ff}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 px-4 overflow-hidden">
        <div className="absolute top-24 right-8 w-36 h-36 rounded-full bg-[#FFC605]/25 pointer-events-none" />
        <div className="absolute top-48 right-52 w-14 h-14 bg-[#F0A5B7]/40 rotate-45 pointer-events-none" />
        <div className="absolute bottom-12 left-8 w-24 h-24 rounded-full bg-[#5AA864]/20 pointer-events-none" />
        <div className="absolute top-36 left-24 w-10 h-10 bg-[#EA6D06]/20 rotate-12 pointer-events-none" />
        <div className="absolute top-16 left-1/2 w-6 h-6 rounded-full bg-[#F0A5B7]/50 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-14 items-center">
          <div>
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
                { val: "12+",  label: "Universities",    color: B.azure },
                { val: "50+",  label: "Partner Shops",   color: B.tangerine },
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
                  <ImageWithFallback src={logoFull} alt="PilaPrint" className="animate-slow-bounce left-1/2 -translate-x-1/2 -translate-y-[12%] h-32 md:h-40 lg:h-64 drop-shadow-xl/25 absolute w-auto object-contain" />
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
                    <p className="text-xs text-gray-500 mb-0.5">Queue No.</p>
                    <p className="text-xl font-bold text-[#FFC605]" style={ffH}>PP-105</p>
                  </div>
                  <div className="flex-1 bg-[#F0F7FF] rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Wallet</p>
                    <p className="text-xl font-bold text-[#1B7FFD]" style={ffH}>₱450</p>
                  </div>
                  <div className="flex-1 bg-[#F0FFF4] rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Points</p>
                    <p className="text-xl font-bold text-[#5AA864]" style={ffH}>320</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-[#FFC605] rounded-2xl p-3 shadow-lg"><CheckCircle size={22} className="text-white" /></div>
              <div className="absolute -bottom-4 -left-4 bg-[#F0A5B7] rounded-xl p-2.5 shadow-lg"><Upload size={18} className="text-white" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section id="universities" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={ffH}>Serving Students From</h2>
            <p className="text-gray-500 text-sm" style={ff}>Trusted by students across Dasmariñas, Cavite</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {UNIVERSITIES.map((u: any) => (
              <div key={u.abbr} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: u.color, ...ffH }}>{u.abbr}</div>
                <p className="text-xs text-gray-600 text-center leading-tight" style={ff}>{u.name?.split("–")[0].trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={ffH}>How PilaPrint Works</h2>
            <p className="text-gray-500 text-sm" style={ff}>From upload to pickup in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose a Shop",      desc: "Select your university and browse verified printing shops nearby.",             icon: <MapPin size={28} />,       color: B.azure,     bg: "#EFF6FF" },
              { step: "02", title: "Upload & Customize", desc: "Upload your files, select printing specs, and choose a package.",               icon: <Upload size={28} />,       color: B.tangerine, bg: "#FFF7ED" },
              { step: "03", title: "Pay & Pick Up",      desc: "Pay via GCash, Maya, or cash. Get your queue number and pick up when ready!",   icon: <CheckCircle size={28} />,  color: B.verdant,   bg: "#F0FFF4" },
            ].map((s) => (
              <div key={s.step} className="relative text-center p-7 rounded-3xl" style={{ background: s.bg }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg" style={{ background: s.color }}>{s.icon}</div>
                <div className="absolute top-4 right-4 text-5xl font-bold opacity-10" style={{ color: s.color, ...ffH }}>{s.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={ffH}>{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={ff}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={ffH}>Everything You Need</h2>
            <p className="text-gray-500 text-sm" style={ff}>Built for students. Powered by technology.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <FileText size={22} />,    title: "Smart File Checker",    desc: "Auto-detects resolution, page size, margins, and format issues before printing.",                     color: B.azure },
              { icon: <Package size={22} />,     title: "Thesis Packages",       desc: "Bundled proposal, defense, and final manuscript packages to save time.",                              color: B.verdant },
              { icon: <Users size={22} />,       title: "Group Orders",          desc: "Members upload individually — system consolidates into one order and billing.",                       color: B.tangerine },
              { icon: <Wallet size={22} />,      title: "Printing Wallet",       desc: "Load credits for faster checkout with cashback, loyalty points, and discounts.",                     color: B.solar },
              { icon: <Clock size={22} />,       title: "Real-Time Queue",       desc: "Get your queue number and estimated claim time the moment your order is ready.",                     color: B.sakura },
              { icon: <Bell size={22} />,        title: "Instant Notifications", desc: "Receive updates at every stage — from processing to ready for pickup.",                              color: B.azure },
              { icon: <CreditCard size={22} />,  title: "Flexible Payments",     desc: "Pay via GCash, Maya, debit/credit cards, or cash upon pickup.",                                     color: B.tangerine },
              { icon: <Star size={22} />,        title: "Shop Ratings",          desc: "Choose shops by ratings, reviews, distance, and services offered.",                                 color: B.verdant },
            ].map((f) => (
              <div key={f.title} className="p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white" style={{ background: f.color }}>{f.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1" style={ffH}>{f.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed" style={ff}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-6 sm:p-12 relative overflow-hidden text-center" style={{ background: "linear-gradient(135deg, #1B7FFD 0%, #3B8FFD 100%)" }}>
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-[#FFC605]/30 pointer-events-none" />
            <div className="relative z-10">
              <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-12 w-auto object-contain mx-auto mb-6 brightness-0 invert" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={ffH}>Ready to Print Smarter?</h2>
              <p className="text-blue-100 mb-8 text-lg" style={ff}>Join thousands of students already using PilaPrint across Dasmariñas, Cavite.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => nav("/student/login")} className="px-8 py-4 bg-white text-[#1B7FFD] font-bold rounded-2xl hover:bg-gray-50 transition-all text-lg shadow-lg" style={ffH}>Sign Up as Student</button>
                <button onClick={() => nav("/business/login")} className="px-8 py-4 bg-[#EA6D06] text-white font-bold rounded-2xl hover:bg-orange-600 transition-all text-lg" style={ffH}>Register Your Shop</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}