import { useState } from "react";
import {
  createBrowserRouter, useNavigate, Outlet, NavLink, useLocation,
} from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/image-3.png";
import {
  Upload, FileText, CreditCard, Bell, Star, MapPin, Printer,
  Package, Clock, CheckCircle, BarChart2, Wallet, Gift, Users,
  Menu, X, ArrowRight, LogOut, Search, TrendingUp, AlertTriangle,
  ChevronRight, LayoutDashboard, ShoppingBag, History, QrCode,
  Plus, Eye, Download, RefreshCw, Zap,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ─── Brand Colors ─────────────────────────────────────────────────────────────

const B = {
  azure:     "#1B7FFD",
  sakura:    "#F0A5B7",
  verdant:   "#5AA864",
  solar:     "#FFC605",
  tangerine: "#EA6D06",
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const UNIVERSITIES = [
  { abbr: "NU-D",    name: "National University – Dasmariñas",           color: B.azure },
  { abbr: "DLSU-D",  name: "De La Salle University – Dasmariñas",        color: B.verdant },
  { abbr: "EAC",     name: "Emilio Aguinaldo College – Cavite",           color: B.tangerine },
  { abbr: "NCST",    name: "National College of Science & Technology",    color: B.sakura },
  { abbr: "AISAT",   name: "AISAT College",                               color: B.solar },
  { abbr: "CVSU",    name: "CVSU Dasma",                                  color: B.verdant },
  { abbr: "SJC-PCU", name: "Saint Jude Dasma PCU",                        color: B.azure },
  { abbr: "TUP",     name: "Technological University Philippines",         color: B.tangerine },
  { abbr: "KLD",     name: "KLD College",                                 color: B.sakura },
  { abbr: "MOL",     name: "MOL Magsaysay",                               color: B.solar },
  { abbr: "DLSHI",   name: "De La Salle Health Sciences Institute",       color: B.azure },
  { abbr: "FEPC",    name: "FEPC",                                        color: B.verdant },
];

const SHOPS = [
  { id: 1, name: "PrintMaster Dasmariñas", university: "NU-D",   distance: "150m from NU-D",   rating: 4.8, reviews: 234, services: ["B&W Printing","Color Printing","Binding","Laminating"],          hours: "7:00 AM – 9:00 PM",  priceFrom: 2,   color: B.azure },
  { id: 2, name: "Quick Copy Hub",          university: "DLSU-D", distance: "200m from DLSU-D", rating: 4.6, reviews: 189, services: ["B&W Printing","Color Printing","Thesis Packages","Scanning"],     hours: "8:00 AM – 8:00 PM",  priceFrom: 1.5, color: B.verdant },
  { id: 3, name: "Campus Print Station",    university: "EAC",    distance: "80m from EAC",     rating: 4.9, reviews: 312, services: ["All Services","Thesis Packages","Group Orders"],                  hours: "7:30 AM – 10:00 PM", priceFrom: 2,   color: B.tangerine },
  { id: 4, name: "UniPrint Express",        university: "NCST",   distance: "300m from NCST",   rating: 4.5, reviews: 156, services: ["B&W Printing","Color Printing","Binding"],                        hours: "8:00 AM – 7:00 PM",  priceFrom: 1.5, color: B.sakura },
  { id: 5, name: "TUP Copy Center",         university: "TUP",    distance: "50m from TUP",     rating: 4.7, reviews: 201, services: ["B&W Printing","Scanning","Laminating","Spiral Binding"],          hours: "7:00 AM – 8:00 PM",  priceFrom: 1.5, color: B.solar },
  { id: 6, name: "AcadPrint CVSU",          university: "CVSU",   distance: "120m from CVSU",   rating: 4.4, reviews: 98,  services: ["B&W Printing","Color Printing","Thesis Binding"],                 hours: "8:00 AM – 6:00 PM",  priceFrom: 2,   color: B.verdant },
];

const STUDENT_ORDERS = [
  { id: "PP-108", service: "Defense Package",  pages: 80, amount: 850, status: "pending",   shop: "PrintMaster Dasmariñas", date: "Jun 18, 2026" },
  { id: "PP-105", service: "Thesis Binding",   pages: 80, amount: 350, status: "ongoing",   shop: "Quick Copy Hub",          date: "Jun 17, 2026" },
  { id: "PP-104", service: "Colored Printing", pages: 15, amount: 120, status: "completed", shop: "PrintMaster Dasmariñas", date: "Jun 17, 2026" },
  { id: "PP-103", service: "Laminating",       pages: 5,  amount: 75,  status: "completed", shop: "UniPrint Express",        date: "Jun 15, 2026" },
];

const BIZ_ORDERS = [
  { id: "PP-104", customer: "Maria Santos",    service: "Colored Printing",  payment: "GCash", amount: 120,  status: "completed" },
  { id: "PP-105", customer: "Juan dela Cruz",  service: "Thesis Binding",    payment: "Cash",  amount: 350,  status: "ongoing" },
  { id: "PP-106", customer: "Ana Reyes",       service: "B&W Printing",      payment: "Maya",  amount: 45,   status: "pending" },
  { id: "PP-107", customer: "Carlos Mendoza",  service: "Laminating",        payment: "GCash", amount: 75,   status: "ready" },
  { id: "PP-108", customer: "Liza Cruz",       service: "Defense Package",   payment: "Card",  amount: 850,  status: "completed" },
];

const REVENUE_DATA = [
  { day: "Mon", revenue: 3200, expenses: 900  },
  { day: "Tue", revenue: 4100, expenses: 1100 },
  { day: "Wed", revenue: 3800, expenses: 950  },
  { day: "Thu", revenue: 5200, expenses: 1800 },
  { day: "Fri", revenue: 6100, expenses: 2000 },
  { day: "Sat", revenue: 7200, expenses: 2200 },
  { day: "Sun", revenue: 4500, expenses: 1200 },
];

const WEEKLY_DATA = [
  { week: "Week 1", revenue: 22000 },
  { week: "Week 2", revenue: 28000 },
  { week: "Week 3", revenue: 25000 },
  { week: "Week 4", revenue: 31000 },
];

const SERVICE_DATA = [
  { name: "B&W Print",   value: 38, color: B.azure },
  { name: "Color Print", value: 27, color: B.tangerine },
  { name: "Binding",     value: 20, color: B.verdant },
  { name: "Laminating",  value: 10, color: B.solar },
  { name: "Scanning",    value: 5,  color: B.sakura },
];

const INVENTORY = [
  { item: "A4 Bond Paper (500s)",   stock: 12, unit: "reams",  low: 5,  color: B.azure },
  { item: "Black Ink Cartridge",    stock: 3,  unit: "pcs",    low: 3,  color: B.tangerine },
  { item: "Color Ink Cartridge",    stock: 2,  unit: "sets",   low: 3,  color: B.sakura },
  { item: "Spiral Coil (A4)",       stock: 45, unit: "pcs",    low: 20, color: B.verdant },
  { item: "Laminating Film (100s)", stock: 8,  unit: "packs",  low: 5,  color: B.solar },
  { item: "Softcover Board",        stock: 18, unit: "pcs",    low: 10, color: B.azure },
];

// ─── Shared Utilities ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; text: string }> = {
    completed: { label: "Completed", bg: "#dcfce7", text: "#166534" },
    ongoing:   { label: "Ongoing",   bg: "#dbeafe", text: "#1e40af" },
    pending:   { label: "Pending",   bg: "#fef9c3", text: "#854d0e" },
    ready:     { label: "Ready",     bg: "#fce7f3", text: "#9d174d" },
    cancelled: { label: "Cancelled", bg: "#fee2e2", text: "#991b1b" },
  };
  const s = map[status] || map.pending;
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.text }}>
      {s.label}
    </span>
  );
}

const ff  = { fontFamily: "'Poppins', sans-serif" };
const ffH = { fontFamily: "'Fredoka', sans-serif" };

// ─── Navbar ───────────────────────────────────────────────────────────────────

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
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-gray-600 hover:text-[#1B7FFD] transition-colors" style={ff}>{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => nav("/business/login")} className="px-4 py-2 text-sm font-semibold text-[#EA6D06] border-2 border-[#EA6D06] rounded-xl hover:bg-[#EA6D06] hover:text-white transition-all" style={ff}>Partner Shop</button>
            <button onClick={() => nav("/student/login")} className="px-4 py-2 text-sm font-semibold text-white bg-[#1B7FFD] rounded-xl hover:bg-blue-600 transition-all shadow-md" style={ff}>Student Login</button>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-2">
            <button onClick={() => nav("/student/login")} className="w-full py-2.5 text-white bg-[#1B7FFD] rounded-xl font-semibold text-sm" style={ff}>Student Login</button>
            <button onClick={() => nav("/business/login")} className="w-full py-2.5 text-[#EA6D06] border-2 border-[#EA6D06] rounded-xl font-semibold text-sm" style={ff}>Partner Shop</button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

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
            {UNIVERSITIES.map((u) => (
              <div key={u.abbr} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ background: u.color, ...ffH }}>{u.abbr}</div>
                <p className="text-xs text-gray-600 text-center leading-tight" style={ff}>{u.name.split("–")[0].trim()}</p>
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
              { step: "01", title: "Choose a Shop",      desc: "Select your university and browse verified printing shops nearby.",                                            icon: <MapPin size={28} />,       color: B.azure,     bg: "#EFF6FF" },
              { step: "02", title: "Upload & Customize", desc: "Upload your files, select printing specs, and choose a package.",                                             icon: <Upload size={28} />,       color: B.tangerine, bg: "#FFF7ED" },
              { step: "03", title: "Pay & Pick Up",      desc: "Pay via GCash, Maya, or cash. Get your queue number and pick up when ready!",                                icon: <CheckCircle size={28} />,  color: B.verdant,   bg: "#F0FFF4" },
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-10 w-auto object-contain mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed" style={ff}>The campus printing platform for students in Dasmariñas, Cavite.</p>
          </div>
          {[
            { title: "Students", links: ["Sign Up","Browse Shops","Track Order","Wallet"] },
            { title: "Business", links: ["Partner with Us","Dashboard","Analytics","Support"] },
            { title: "Company",  links: ["About Us","Terms & Conditions","Privacy Policy","Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-4" style={ffH}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors" style={ff}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm" style={ff}>© 2026 PilaPrint. All rights reserved. Made with love for students in Dasmariñas, Cavite.</p>
        </div>
      </footer>
    </div>
  );
}

// ─── Student Auth ─────────────────────────────────────────────────────────────

export function StudentAuthPage() {
  const location = useLocation();
  const nav = useNavigate();
  const isRegister = location.pathname === "/student/register";

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#1B7FFD] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#FFC605]/20 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <button onClick={() => nav("/")} className="relative z-10">
          <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-12 w-auto object-contain brightness-0 invert" />
        </button>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4" style={ffH}>Print Smarter, Not Harder.</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8" style={ff}>Access nearby printing shops, track your orders, and manage your printing wallet — all in one place.</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Active Shops",   value: "50+",  color: B.solar },
              { label: "Universities",   value: "12",   color: B.sakura },
              { label: "Orders Today",   value: "2.4k", color: B.verdant },
              { label: "Happy Students", value: "10k+", color: B.solar },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold" style={{ color: s.color, ...ffH }}>{s.value}</p>
                <p className="text-blue-100 text-sm" style={ff}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-blue-200 text-sm relative z-10" style={ff}>© 2026 PilaPrint. For Students.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[#FEFDF8]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <button onClick={() => nav("/")}><ImageWithFallback src={logoFull} alt="PilaPrint" className="h-10 w-auto object-contain" /></button>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button onClick={() => nav("/student/login")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${!isRegister ? "bg-white text-[#1B7FFD] shadow-sm" : "text-gray-500 hover:text-gray-700"}`} style={ff}>Sign In</button>
            <button onClick={() => nav("/student/register")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${isRegister ? "bg-white text-[#1B7FFD] shadow-sm" : "text-gray-500 hover:text-gray-700"}`} style={ff}>Create Account</button>
          </div>

          {!isRegister ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1" style={ffH}>Welcome back! 👋</h1>
              <p className="text-gray-500 text-sm mb-6" style={ff}>Sign in to your PilaPrint account</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" style={ff}>Email Address</label>
                  <input type="email" placeholder="you@university.edu.ph" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7FFD]/30 focus:border-[#1B7FFD] transition-all" style={ff} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" style={ff}>Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7FFD]/30 focus:border-[#1B7FFD] transition-all" style={ff} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer" style={ff}><input type="checkbox" className="rounded" /> Remember me</label>
                  <a href="#" className="text-sm text-[#1B7FFD] hover:underline" style={ff}>Forgot password?</a>
                </div>
                <button onClick={() => nav("/student/dashboard")} className="w-full py-3.5 bg-[#1B7FFD] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-100" style={{ ...ffH, fontSize: "1rem" }}>Sign In</button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1" style={ffH}>Create Your Account 🎓</h1>
              <p className="text-gray-500 text-sm mb-6" style={ff}>Join PilaPrint today — it's free!</p>
              <div className="space-y-4">
                {[
                  { label: "Full Name",      placeholder: "Juan dela Cruz",          type: "text" },
                  { label: "Email Address",  placeholder: "you@university.edu.ph",   type: "email" },
                  { label: "Mobile Number",  placeholder: "09XX XXX XXXX",           type: "tel" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" style={ff}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7FFD]/30 focus:border-[#1B7FFD] transition-all" style={ff} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" style={ff}>University</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7FFD]/30 focus:border-[#1B7FFD] transition-all" style={ff}>
                    <option value="">Select your university</option>
                    {UNIVERSITIES.map((u) => <option key={u.abbr} value={u.abbr}>{u.name}</option>)}
                  </select>
                </div>
                <button onClick={() => nav("/student/dashboard")} className="w-full py-3.5 bg-[#1B7FFD] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-100" style={{ ...ffH, fontSize: "1rem" }}>Create Account</button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500" style={ff}>
              Are you a printing shop?{" "}
              <button onClick={() => nav("/business/login")} className="text-[#EA6D06] font-semibold hover:underline">Register here</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Student Dashboard — sub-views ────────────────────────────────────────────

export function StudentOverview() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800" style={ffH}>Good morning, Maria! 👋</h2>
        <p className="text-gray-500 text-sm" style={ff}>Wednesday, June 18, 2026</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Orders",  value: "2",     icon: <Package size={18} />, color: B.azure,     bg: "#EFF6FF" },
          { label: "Wallet Balance", value: "₱450",  icon: <Wallet size={18} />,  color: B.verdant,   bg: "#F0FFF4" },
          { label: "Points",         value: "320",    icon: <Gift size={18} />,    color: B.solar,     bg: "#FFFBEB" },
          { label: "Total Orders",   value: "14",     icon: <History size={18} />, color: B.tangerine, bg: "#FFF7ED" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              <TrendingUp size={12} className="text-gray-300" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800" style={ffH}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight" style={ff}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800" style={ffH}>Active Orders</h3>
            <button onClick={() => nav("/student/dashboard/orders")} className="text-xs text-[#1B7FFD]" style={ff}>View all</button>
          </div>
          <div className="space-y-3">
            {STUDENT_ORDERS.filter((o) => ["ongoing","pending"].includes(o.status)).map((order) => (
              <div key={order.id} className="flex items-center gap-2 sm:gap-4 p-3 rounded-xl bg-gray-50 hover:bg-[#F0F7FF] transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-[#1B7FFD] flex items-center justify-center text-white flex-shrink-0"><Printer size={16} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-800 truncate" style={ff}>{order.service}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-xs text-gray-500 truncate" style={ff}>{order.id} · {order.shop}</p>
                </div>
                <p className="hidden sm:block text-sm font-bold text-[#1B7FFD] flex-shrink-0" style={ffH}>₱{order.amount}</p>
              </div>
            ))}
          </div>
          <button onClick={() => nav("/student/shops")} className="w-full mt-4 py-3 bg-[#1B7FFD] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-100" style={ffH}>
            <Plus size={16} /> Place New Order
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B7FFD 0%, #3B8FFD 100%)" }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <p className="text-blue-100 text-xs mb-0.5 relative z-10" style={ff}>Current Queue</p>
            <p className="text-4xl font-bold mb-0.5 relative z-10" style={ffH}>PP-105</p>
            <p className="text-blue-100 text-xs mb-3 relative z-10" style={ff}>Thesis Binding · Now Serving PP-103</p>
            <div className="bg-white/20 rounded-xl px-3 py-2 text-xs font-medium relative z-10">Est. wait: ~15 minutes</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "New Order", icon: <Plus size={16} />,    color: B.azure,     path: "/student/shops" },
                { label: "Track Order",icon: <Eye size={16} />,    color: B.verdant,   path: "/student/dashboard/queue" },
                { label: "Add Funds", icon: <Wallet size={16} />,  color: B.tangerine, path: "/student/dashboard/wallet" },
                { label: "My Files",  icon: <FileText size={16} />,color: B.sakura,    path: "/student/dashboard/documents" },
              ].map((a) => (
                <button key={a.label} onClick={() => nav(a.path)} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors" style={ff}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: a.color }}>{a.icon}</div>
                  <span className="text-xs text-gray-600 font-medium">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Transaction History</h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Order ID</th>
                <th className="text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Service</th>
                <th className="hidden sm:table-cell text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Shop</th>
                <th className="hidden sm:table-cell text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Date</th>
                <th className="text-xs font-medium text-gray-500 text-left py-2 pr-3" style={ff}>Amount</th>
                <th className="text-xs font-medium text-gray-500 text-left py-2" style={ff}>Status</th>
              </tr>
            </thead>
            <tbody>
              {STUDENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-3 text-xs font-mono font-medium text-gray-700">{order.id}</td>
                  <td className="py-3 pr-3 text-xs text-gray-600 max-w-[120px] truncate" style={ff}>{order.service}</td>
                  <td className="hidden sm:table-cell py-3 pr-3 text-xs text-gray-500 truncate" style={ff}>{order.shop.split(" ")[0]}</td>
                  <td className="hidden sm:table-cell py-3 pr-3 text-xs text-gray-500" style={ff}>{order.date}</td>
                  <td className="py-3 pr-3 text-sm font-bold text-gray-800 whitespace-nowrap" style={ffH}>₱{order.amount}</td>
                  <td className="py-3"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function StudentOrders() {
  const nav = useNavigate();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? STUDENT_ORDERS : STUDENT_ORDERS.filter((o) => o.status === filter);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800" style={ffH}>My Orders</h2>
        <button onClick={() => nav("/student/shops")} className="px-4 py-2 bg-[#1B7FFD] text-white text-sm font-bold rounded-xl flex items-center gap-2" style={ffH}><Plus size={16} /> New Order</button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all","pending","ongoing","completed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? "bg-[#1B7FFD] text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-[#1B7FFD] hover:text-[#1B7FFD]"}`} style={ff}>{f}</button>
        ))}
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

export function StudentWallet() {
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
              { label: "Semester Discount", value: "10% off",        badge: "Active" },
              { label: "Cashback Rate",     value: "2% on GCash",    badge: "Active" },
              { label: "Free Laminating",   value: "1x per month",   badge: "Available" },
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

export function StudentQueue() {
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
              { label: "Order ID",     value: "PP-105",                      icon: <QrCode size={15} /> },
              { label: "Shop",         value: "PrintMaster Dasmariñas",      icon: <MapPin size={15} /> },
              { label: "Service",      value: "Thesis Binding (Softbound)",   icon: <Package size={15} /> },
              { label: "Amount Paid",  value: "₱350.00 via GCash",           icon: <CreditCard size={15} /> },
              { label: "Status",       value: "Processing",                   icon: <Clock size={15} /> },
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
            { label: "Order Placed",       sub: "Jun 17, 2:30 PM", done: true },
            { label: "Payment Confirmed",  sub: "Jun 17, 2:31 PM", done: true },
            { label: "Processing",         sub: "In progress",      current: true },
            { label: "Ready for Pickup",   sub: "Est. 3:00 PM" },
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

export function StudentDocuments() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800" style={ffH}>Saved Files</h2>
        <button onClick={() => nav("/student/order")} className="px-4 py-2 bg-[#1B7FFD] text-white text-sm font-bold rounded-xl flex items-center gap-2" style={ffH}><Upload size={16} /> Upload File</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Thesis_Chapter1.pdf",         size: "2.4 MB", type: "PDF",  date: "Jun 15, 2026", color: B.azure },
          { name: "Research_Presentation.pptx",  size: "5.1 MB", type: "PPT",  date: "Jun 12, 2026", color: B.tangerine },
          { name: "Lab_Report_Final.docx",        size: "1.2 MB", type: "DOCX", date: "Jun 10, 2026", color: B.verdant },
          { name: "Cover_Page_Formatted.pdf",     size: "0.8 MB", type: "PDF",  date: "Jun 8, 2026",  color: B.azure },
          { name: "Group_Project_Slides.pptx",    size: "7.3 MB", type: "PPT",  date: "Jun 5, 2026",  color: B.tangerine },
          { name: "Appendix_Tables.pdf",          size: "1.5 MB", type: "PDF",  date: "Jun 3, 2026",  color: B.azure },
        ].map((f) => (
          <div key={f.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: f.color, ...ffH }}>{f.type}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate" style={ff}>{f.name}</p>
                <p className="text-xs text-gray-400">{f.size} · {f.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => nav("/student/order")} className="flex-1 py-1.5 bg-[#EFF6FF] text-[#1B7FFD] text-xs font-semibold rounded-lg hover:bg-[#DBEAFE] transition-colors" style={ff}>Print this</button>
              <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"><Download size={14} className="text-gray-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Student Dashboard Layout ─────────────────────────────────────────────────

export function StudentDashboardLayout() {
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/student/dashboard",           label: "Overview",        icon: <LayoutDashboard size={18} />, end: true },
    { to: "/student/dashboard/orders",    label: "My Orders",        icon: <ShoppingBag size={18} /> },
    { to: "/student/dashboard/wallet",    label: "Wallet & Rewards", icon: <Wallet size={18} /> },
    { to: "/student/dashboard/queue",     label: "Queue Monitor",    icon: <Clock size={18} /> },
    { to: "/student/dashboard/documents", label: "Saved Files",      icon: <FileText size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        <div className="p-5 border-b border-gray-100">
          <button onClick={() => nav("/")}><ImageWithFallback src={logoFull} alt="PilaPrint" className="h-9 w-auto object-contain" /></button>
        </div>
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1B7FFD] flex items-center justify-center text-white font-bold">M</div>
            <div>
              <p className="text-sm font-semibold text-gray-800" style={ff}>Maria Santos</p>
              <p className="text-xs text-gray-500" style={ff}>NU-Dasmariñas</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-[#EFF6FF] text-[#1B7FFD]" : "text-gray-600 hover:bg-gray-50"}`
              }
              style={ff}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button onClick={() => nav("/student/shops")} className="w-full py-2.5 bg-[#1B7FFD] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-100" style={ffH}><Plus size={16} /> New Order</button>
          <button onClick={() => nav("/")} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors" style={ff}><LogOut size={16} /> Sign Out</button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EA6D06] rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1B7FFD] flex items-center justify-center text-white text-sm font-bold">M</div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── Shop Browser ─────────────────────────────────────────────────────────────

export function ShopBrowserPage() {
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

// ─── Order Flow ───────────────────────────────────────────────────────────────

export function OrderFlowPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [fileChecked, setFileChecked] = useState(false);
  const [colorMode, setColorMode] = useState("bw");
  const [sides, setSides] = useState("single");
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState("A4");
  const [binding, setBinding] = useState("none");
  const [paymentMethod, setPaymentMethod] = useState("gcash");

  const total = () => {
    const base = colorMode === "bw" ? 2 : 5;
    const sidesMult = sides === "double" ? 0.8 : 1;
    const bindingCost = binding === "spiral" ? 30 : binding === "softbound" ? 80 : binding === "hardbound" ? 150 : 0;
    return Math.round(base * 30 * copies * sidesMult) + bindingCost;
  };

  const steps = ["Upload File", "Customize", "Payment", "Confirm"];

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button onClick={() => step > 1 ? setStep((s) => s - 1) : nav("/student/shops")} className="p-2 rounded-lg hover:bg-gray-100"><ChevronRight size={20} className="rotate-180 text-gray-600" /></button>
          <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-8 w-auto object-contain" />
          <div className="ml-auto text-sm text-gray-500" style={ff}>Step {step} of 4</div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-1.5 rounded-full transition-all ${i < step ? "bg-[#1B7FFD]" : "bg-gray-200"}`} />
                <p className={`hidden sm:block text-xs ${i < step ? "text-[#1B7FFD] font-semibold" : "text-gray-400"}`} style={ff}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {step === 1 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Upload Your File</h1>
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 sm:p-12 text-center hover:border-[#1B7FFD] transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1B7FFD] transition-colors">
                <Upload size={28} className="text-[#1B7FFD] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-700 mb-1" style={ffH}>Drop your file here</h3>
              <p className="text-gray-500 text-sm mb-4" style={ff}>PDF, DOCX, PPT, or Image files up to 50MB</p>
              <button className="px-6 py-2 bg-[#1B7FFD] text-white text-sm font-semibold rounded-xl" style={ff}>Browse Files</button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center"><Zap size={15} className="text-[#1B7FFD]" /></div>
                <h3 className="font-bold text-gray-800" style={ffH}>Smart File Checker</h3>
                <span className="ml-auto text-xs bg-[#EFF6FF] text-[#1B7FFD] px-2 py-0.5 rounded-full font-semibold">Auto-scan</span>
              </div>
              {!fileChecked ? (
                <div>
                  <p className="text-sm text-gray-500 mb-3" style={ff}>Upload a file to automatically check for print quality issues.</p>
                  <button onClick={() => setFileChecked(true)} className="text-sm text-[#1B7FFD] underline" style={ff}>Demo: Load Thesis_Chapter1.pdf</button>
                </div>
              ) : (
                <div className="space-y-2">
                  {[
                    { check: "File Format",   status: "pass", detail: "PDF — Supported" },
                    { check: "Resolution",    status: "pass", detail: "300 DPI — Print Ready" },
                    { check: "Paper Size",    status: "pass", detail: "A4 — Detected" },
                    { check: "Margins",       status: "warn", detail: "Bottom margin slightly narrow (0.8cm)" },
                    { check: "Missing Pages", status: "pass", detail: "All 45 pages present" },
                  ].map((c) => (
                    <div key={c.check} className="flex items-center gap-3 py-1.5">
                      {c.status === "pass" ? <CheckCircle size={16} className="text-[#5AA864] flex-shrink-0" /> : <AlertTriangle size={16} className="text-[#FFC605] flex-shrink-0" />}
                      <div>
                        <p className="text-sm font-medium text-gray-700" style={ff}>{c.check}</p>
                        <p className="text-xs text-gray-400">{c.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Or Choose from Saved Files</h3>
              <div className="space-y-2">
                {["Thesis_Chapter1.pdf","Research_Presentation.pptx","Lab_Report_Final.docx"].map((f) => (
                  <button key={f} onClick={() => setFileChecked(true)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#EFF6FF] border border-transparent hover:border-[#1B7FFD]/20 transition-all text-left">
                    <FileText size={15} className="text-[#1B7FFD] flex-shrink-0" />
                    <span className="text-sm text-gray-700 flex-1" style={ff}>{f}</span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-4 bg-[#1B7FFD] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2" style={{ ...ffH, fontSize: "1.05rem" }}>
              Continue <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Customize Your Order</h1>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Print Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ id: "bw", label: "Black & White", price: "₱2/page", icon: "◑" }, { id: "color", label: "Colored", price: "₱5/page", icon: "🌈" }].map((t) => (
                  <button key={t.id} onClick={() => setColorMode(t.id)} className={`p-4 rounded-xl border-2 transition-all text-left ${colorMode === t.id ? "border-[#1B7FFD] bg-[#EFF6FF]" : "border-gray-200 hover:border-gray-300"}`}>
                    <p className="text-2xl mb-2">{t.icon}</p>
                    <p className="font-bold text-gray-800 text-sm" style={ff}>{t.label}</p>
                    <p className="text-xs text-gray-500">{t.price}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Print Sides</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ id: "single", label: "Single-Sided" }, { id: "double", label: "Double-Sided", note: "20% off" }].map((s) => (
                  <button key={s.id} onClick={() => setSides(s.id)} className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${sides === s.id ? "border-[#1B7FFD] bg-[#EFF6FF]" : "border-gray-200 hover:border-gray-300"}`}>
                    <span className="font-medium text-gray-800 text-sm" style={ff}>{s.label}</span>
                    {s.note && <span className="text-xs bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded-full">{s.note}</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Paper Size</h3>
                <div className="space-y-2">
                  {["A4","Letter","Legal"].map((size) => (
                    <button key={size} onClick={() => setPaperSize(size)} className={`w-full py-2.5 px-3 rounded-xl border transition-all text-sm text-left font-medium ${paperSize === size ? "border-[#1B7FFD] bg-[#EFF6FF] text-[#1B7FFD]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`} style={ff}>{size}</button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Copies</h3>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => setCopies((c) => Math.max(1, c - 1))} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-colors text-lg">−</button>
                  <span className="text-3xl font-bold text-gray-800 flex-1 text-center" style={ffH}>{copies}</span>
                  <button onClick={() => setCopies((c) => c + 1)} className="w-10 h-10 rounded-xl bg-[#1B7FFD] flex items-center justify-center font-bold text-white hover:bg-blue-600 transition-colors text-lg">+</button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3" style={ffH}>Binding (Optional)</h3>
              <div className="grid grid-cols-2 gap-2">
                {[{ id: "none", label: "No Binding", price: "Free" }, { id: "spiral", label: "Spiral Binding", price: "+₱30" }, { id: "softbound", label: "Softbound", price: "+₱80" }, { id: "hardbound", label: "Hardbound", price: "+₱150" }].map((b) => (
                  <button key={b.id} onClick={() => setBinding(b.id)} className={`p-3 rounded-xl border-2 transition-all text-left ${binding === b.id ? "border-[#1B7FFD] bg-[#EFF6FF]" : "border-gray-200 hover:border-gray-300"}`}>
                    <p className="font-semibold text-gray-800 text-sm" style={ff}>{b.label}</p>
                    <p className="text-xs text-gray-500">{b.price}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#F0F7FF] rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800" style={ffH}>Order Total</p>
                <p className="text-xs text-gray-500" style={ff}>{colorMode === "bw" ? "B&W" : "Colored"} · {sides}-sided · {copies} {copies > 1 ? "copies" : "copy"} · {paperSize}</p>
              </div>
              <p className="text-3xl font-bold text-[#1B7FFD]" style={ffH}>₱{total()}</p>
            </div>
            <button onClick={() => setStep(3)} className="w-full py-4 bg-[#1B7FFD] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2" style={{ ...ffH, fontSize: "1.05rem" }}>
              Continue to Payment <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Choose Payment Method</h1>
            <div className="space-y-3">
              {[
                { id: "gcash",  label: "GCash",                icon: "💙", detail: "Instant — No fees" },
                { id: "maya",   label: "Maya",                  icon: "💚", detail: "Instant — No fees" },
                { id: "wallet", label: "Printing Wallet",       icon: "👛", detail: "Balance: ₱450.00" },
                { id: "card",   label: "Debit / Credit Card",   icon: "💳", detail: "Visa, Mastercard, JCB" },
                { id: "cod",    label: "Cash upon Pickup",      icon: "💵", detail: "Pay at the shop" },
              ].map((m) => (
                <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === m.id ? "border-[#1B7FFD] bg-[#EFF6FF]" : "border-gray-200 hover:border-gray-300"}`}>
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-800 text-sm" style={ff}>{m.label}</p>
                    <p className="text-xs text-gray-500">{m.detail}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${paymentMethod === m.id ? "border-[#1B7FFD] bg-[#1B7FFD]" : "border-gray-300"}`}>
                    {paymentMethod === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500" style={ff}>Printing (30 pages)</span><span className="text-gray-700 font-medium" style={ff}>₱{colorMode === "bw" ? 60 : 150}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500" style={ff}>Binding</span><span className="text-gray-700 font-medium" style={ff}>{binding === "none" ? "Free" : `₱${binding === "spiral" ? 30 : binding === "softbound" ? 80 : 150}`}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500" style={ff}>Copies (×{copies})</span><span className="text-gray-700 font-medium" style={ff}>×{copies}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500" style={ff}>Service Fee</span><span className="text-gray-700 font-medium" style={ff}>Free</span></div>
                <div className="border-t border-gray-100 pt-3 mt-1 flex justify-between font-bold">
                  <span className="text-gray-800" style={ffH}>Total</span>
                  <span className="text-[#1B7FFD] text-lg" style={ffH}>₱{total()}</span>
                </div>
              </div>
            </div>
            <button onClick={() => nav("/student/order/success")} className="w-full py-4 bg-[#1B7FFD] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2" style={{ ...ffH, fontSize: "1.05rem" }}>
              Confirm & Pay ₱{total()} <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Order Queue (Success) ────────────────────────────────────────────────────

export function OrderQueuePage() {
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
            { label: "Order ID",    value: "PP-108" },
            { label: "Service",     value: "B&W Printing, Spiral Binding" },
            { label: "Pages",       value: "30 pages · 1 copy" },
            { label: "Total Paid",  value: "₱90.00 via GCash" },
            { label: "Shop",        value: "PrintMaster Dasmariñas" },
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

// ─── Business Auth ────────────────────────────────────────────────────────────

export function BusinessAuthPage() {
  const location = useLocation();
  const nav = useNavigate();
  const isRegister = location.pathname === "/business/register";

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #EA6D06 0%, #FFC605 100%)" }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <button onClick={() => nav("/")} className="relative z-10">
          <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-12 w-auto object-contain brightness-0 invert" />
        </button>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4" style={ffH}>Grow Your Printing Business.</h2>
          <p className="text-orange-100 text-lg leading-relaxed mb-8" style={ff}>Join PilaPrint's partner network and reach thousands of students across Dasmariñas, Cavite.</p>
          <div className="space-y-3">
            {["Access the digital order management dashboard","Real-time sales analytics and profit tracking","Inventory monitoring with low-stock alerts","Automated queue management system"].map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-white flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm" style={ff}>{b}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-orange-100 text-sm relative z-10" style={ff}>© 2026 PilaPrint. For Business Partners.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[#FEFDF8]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <button onClick={() => nav("/")}><ImageWithFallback src={logoFull} alt="PilaPrint" className="h-10 w-auto object-contain" /></button>
          </div>
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button onClick={() => nav("/business/login")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${!isRegister ? "bg-white text-[#EA6D06] shadow-sm" : "text-gray-500 hover:text-gray-700"}`} style={ff}>Sign In</button>
            <button onClick={() => nav("/business/register")} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${isRegister ? "bg-white text-[#EA6D06] shadow-sm" : "text-gray-500 hover:text-gray-700"}`} style={ff}>Register Shop</button>
          </div>

          {!isRegister ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1" style={ffH}>Welcome back! 🏪</h1>
              <p className="text-gray-500 text-sm mb-6" style={ff}>Sign in to your shop dashboard</p>
              <div className="space-y-4">
                <input type="email" placeholder="shop@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA6D06]/30 focus:border-[#EA6D06] transition-all" style={ff} />
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA6D06]/30 focus:border-[#EA6D06] transition-all" style={ff} />
                <button onClick={() => nav("/business/dashboard")} className="w-full py-3.5 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg" style={{ background: "linear-gradient(135deg, #EA6D06, #FFC605)", ...ffH, fontSize: "1rem" }}>
                  Sign In to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1" style={ffH}>Register Your Shop 🏪</h1>
              <p className="text-gray-500 text-sm mb-6" style={ff}>Submit for admin verification. Activation within 24 hours.</p>
              <div className="space-y-4">
                {[
                  { label: "Business Name",   placeholder: "PrintMaster Dasmariñas",      type: "text" },
                  { label: "Store Location",  placeholder: "123 Aguinaldo Hwy, Dasmariñas", type: "text" },
                  { label: "Contact Number",  placeholder: "09XX XXX XXXX",               type: "tel" },
                  { label: "Email Address",   placeholder: "shop@email.com",              type: "email" },
                  { label: "BIR / TIN Number",placeholder: "XXX-XXX-XXX-000",             type: "text" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" style={ff}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA6D06]/30 focus:border-[#EA6D06] transition-all" style={ff} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" style={ff}>Operating Hours</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="time" defaultValue="07:00" className="px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA6D06]/30" />
                    <input type="time" defaultValue="21:00" className="px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA6D06]/30" />
                  </div>
                </div>
                <button onClick={() => nav("/business/dashboard")} className="w-full py-3.5 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg" style={{ background: "linear-gradient(135deg, #EA6D06, #FFC605)", ...ffH, fontSize: "1rem" }}>
                  Submit for Verification
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500" style={ff}>
              Are you a student?{" "}
              <button onClick={() => nav("/student/login")} className="text-[#1B7FFD] font-semibold hover:underline">Sign up here</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Business Dashboard — sub-views ──────────────────────────────────────────

export function BizOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Shop Dashboard</h1>
          <p className="text-gray-500 text-sm" style={ff}>Wednesday, June 18, 2026 · Today's Performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors" style={ff}><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders Today", value: "47",    sub: "+12 from yesterday",    icon: <ShoppingBag size={20} />, color: B.azure,     bg: "#EFF6FF" },
          { label: "Total Revenue",      value: "₱5,200",sub: "Est. net: ₱3,400",      icon: <TrendingUp size={20} />,  color: B.verdant,   bg: "#F0FFF4" },
          { label: "Pending Orders",     value: "8",     sub: "Requires processing",    icon: <Clock size={20} />,       color: B.solar,     bg: "#FFFBEB" },
          { label: "Completed Today",    value: "34",    sub: "5 cancelled",            icon: <CheckCircle size={20} />, color: B.tangerine, bg: "#FFF7ED" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <p className="text-2xl font-bold text-gray-800" style={ffH}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5" style={ff}>{s.label}</p>
            <p className="text-xs mt-1 font-semibold" style={{ color: s.color, ...ff }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Revenue vs. Expenses (This Week)</h3>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `₱${v}`} />
              <Tooltip formatter={(v: number, name: string) => [`₱${v.toLocaleString()}`, name === "revenue" ? "Revenue" : "Expenses"]} />
              <Area key="area-revenue"  type="monotone" dataKey="revenue"  stroke="#1B7FFD" fill="#1B7FFD" fillOpacity={0.12} strokeWidth={2} />
              <Area key="area-expenses" type="monotone" dataKey="expenses" stroke="#EA6D06" fill="#EA6D06" fillOpacity={0.1}  strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Service Breakdown</h3>
          <div className="flex rounded-full h-4 overflow-hidden mb-4 gap-0.5">
            {SERVICE_DATA.map((s) => (
              <div key={`stack-${s.name}`} className="h-full" style={{ width: `${s.value}%`, background: s.color }} title={`${s.name}: ${s.value}%`} />
            ))}
          </div>
          <div className="space-y-1.5">
            {SERVICE_DATA.map((s) => (
              <div key={`legend-${s.name}`} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-gray-600" style={ff}>{s.name}</span>
                </div>
                <span className="font-bold text-gray-700">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800" style={ffH}>Recent Orders</h3>
          <span className="text-xs text-[#EA6D06] font-semibold cursor-pointer" style={ff}>View all</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Order ID","Customer","Service","Payment","Amount","Status"].map((h) => (
                  <th key={h} className="text-xs font-medium text-gray-500 text-left py-2 pr-6" style={ff}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BIZ_ORDERS.slice(0, 4).map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-6 text-sm font-mono font-semibold text-gray-700">{o.id}</td>
                  <td className="py-3 pr-6 text-sm text-gray-700" style={ff}>{o.customer}</td>
                  <td className="py-3 pr-6 text-sm text-gray-600" style={ff}>{o.service}</td>
                  <td className="py-3 pr-6 text-sm text-gray-500" style={ff}>{o.payment}</td>
                  <td className="py-3 pr-6 text-sm font-bold text-gray-800" style={ffH}>₱{o.amount}</td>
                  <td className="py-3"><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function BizTransactions() {
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
          { label: "Total Orders", value: BIZ_ORDERS.length,                                            color: B.azure },
          { label: "Completed",    value: BIZ_ORDERS.filter((o) => o.status === "completed").length,    color: B.verdant },
          { label: "Ongoing",      value: BIZ_ORDERS.filter((o) => o.status === "ongoing").length,      color: B.azure },
          { label: "Pending",      value: BIZ_ORDERS.filter((o) => o.status === "pending").length,      color: B.solar },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: s.color, ...ffH }}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5" style={ff}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all","pending","ongoing","ready","completed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? "bg-[#EA6D06] text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-[#EA6D06] hover:text-[#EA6D06]"}`} style={ff}>{f}</button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Order ID","Customer","Service","Payment","Amount","Status","Actions"].map((h) => (
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

export function BizAnalytics() {
  const [period, setPeriod] = useState("daily");
  const data = period === "daily" ? REVENUE_DATA : WEEKLY_DATA;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Sales Analytics</h1>
        <div className="flex gap-2">
          {["daily","weekly","monthly"].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${period === p ? "bg-[#EA6D06] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#EA6D06]"}`} style={ff}>{p}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-1" style={ffH}>Revenue Trend</h3>
        <p className="text-sm text-gray-500 mb-5" style={ff}>June 2026 · Total: ₱106,000</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart key={period} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey={period === "daily" ? "day" : "week"} tick={{ fontSize: 11, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#1B7FFD" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Best-Selling Services</h3>
          <div className="space-y-3">
            {SERVICE_DATA.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600" style={ff}>{s.name}</span>
                  <span className="font-bold text-gray-800">{s.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Peak Hours</h3>
          <div className="space-y-3">
            {[
              { time: "7:00–9:00 AM",      orders: 42, pct: 85  },
              { time: "11:00 AM–1:00 PM",  orders: 38, pct: 76  },
              { time: "3:00–5:00 PM",      orders: 50, pct: 100 },
              { time: "6:00–8:00 PM",      orders: 29, pct: 58  },
            ].map((h) => (
              <div key={h.time}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500" style={ff}>{h.time}</span>
                  <span className="font-bold text-gray-700">{h.orders} orders</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-[#FFC605]" style={{ width: `${h.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#FFF9E6] rounded-xl p-3 text-xs text-center font-medium text-gray-700" style={ff}>Peak: <strong>3:00–5:00 PM</strong> daily</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4" style={ffH}>Monthly Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Total Revenue",  value: "₱106,000", color: B.azure },
              { label: "Total Expenses", value: "₱38,200",  color: B.tangerine },
              { label: "Net Profit",     value: "₱67,800",  color: B.verdant },
              { label: "Total Orders",   value: "855",       color: B.solar },
              { label: "Avg. Order",     value: "₱124",      color: B.sakura },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-sm text-gray-500" style={ff}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color: s.color, ...ffH }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BizInventory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800" style={ffH}>Inventory</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#EA6D06] text-white rounded-xl text-sm font-bold shadow-md" style={ffH}><Plus size={14} /> Add Stock</button>
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

export function BizQueue() {
  const [serving, setServing] = useState("PP-101");
  const queue = [
    { id: "PP-101", customer: "Maria Santos",   service: "Colored Printing" },
    { id: "PP-102", customer: "Juan Cruz",       service: "Thesis Binding" },
    { id: "PP-103", customer: "Ana Reyes",       service: "B&W Printing" },
    { id: "PP-104", customer: "Carlos Mendoza",  service: "Laminating" },
    { id: "PP-105", customer: "Liza Reyes",      service: "Spiral Binding" },
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
              { label: "Completed Pickups", value: "34",    color: B.verdant },
              { label: "Waiting Customers", value: "4",     color: B.solar },
              { label: "Active Orders",     value: "8",     color: B.azure },
              { label: "Avg. Wait Time",    value: "18 min",color: B.tangerine },
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

// ─── Business Dashboard Layout ────────────────────────────────────────────────

export function BusinessDashboardLayout() {
  const nav = useNavigate();
  const tabs = [
    { to: "/business/dashboard",               label: "Overview",      icon: <LayoutDashboard size={16} />, end: true },
    { to: "/business/dashboard/transactions",   label: "Transactions",  icon: <ShoppingBag size={16} /> },
    { to: "/business/dashboard/analytics",      label: "Analytics",     icon: <BarChart2 size={16} /> },
    { to: "/business/dashboard/inventory",      label: "Inventory",     icon: <Package size={16} /> },
    { to: "/business/dashboard/queue",          label: "Queue",         icon: <Clock size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => nav("/")}><ImageWithFallback src={logoFull} alt="PilaPrint" className="h-9 w-auto object-contain" /></button>
            <div className="hidden md:flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5AA864]" />
              <span className="text-xs font-medium text-gray-600 ml-1" style={ff}>PrintMaster Dasmariñas</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EA6D06] rounded-full" />
            </button>
            <button onClick={() => nav("/")} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" style={ff}><LogOut size={15} /> Sign Out</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-gray-100">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${isActive ? "border-[#EA6D06] text-[#EA6D06]" : "border-transparent text-gray-500 hover:text-gray-700"}`
                }
                style={ff}
              >
                {t.icon} {t.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}

// ─── 404 ──────────────────────────────────────────────────────────────────────

export function NotFoundPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-[#FEFDF8] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-bold text-[#1B7FFD] mb-4" style={ffH}>404</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-2" style={ffH}>Page not found</h1>
      <p className="text-gray-500 mb-8" style={ff}>This page doesn't exist. Let's get you back on track.</p>
      <button onClick={() => nav("/")} className="px-6 py-3 bg-[#1B7FFD] text-white font-bold rounded-xl hover:bg-blue-600 transition-all" style={ffH}>Back to Home</button>
    </div>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  { path: "/",                    Component: LandingPage },
  { path: "/student/login",       Component: StudentAuthPage },
  { path: "/student/register",    Component: StudentAuthPage },
  {
    path: "/student/dashboard",
    Component: StudentDashboardLayout,
    children: [
      { index: true,              Component: StudentOverview },
      { path: "orders",           Component: StudentOrders },
      { path: "wallet",           Component: StudentWallet },
      { path: "queue",            Component: StudentQueue },
      { path: "documents",        Component: StudentDocuments },
    ],
  },
  { path: "/student/shops",              Component: ShopBrowserPage },
  { path: "/student/order",             Component: OrderFlowPage },
  { path: "/student/order/success",     Component: OrderQueuePage },
  { path: "/business/login",            Component: BusinessAuthPage },
  { path: "/business/register",         Component: BusinessAuthPage },
  {
    path: "/business/dashboard",
    Component: BusinessDashboardLayout,
    children: [
      { index: true,              Component: BizOverview },
      { path: "transactions",     Component: BizTransactions },
      { path: "analytics",        Component: BizAnalytics },
      { path: "inventory",        Component: BizInventory },
      { path: "queue",            Component: BizQueue },
    ],
  },
  { path: "*",                    Component: NotFoundPage },
]);

// ─── App ──────────────────────────────────────────────────────────────────────

