import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Bell, Clock, FileText, LayoutDashboard, LogOut, Menu, Package, Plus, ShoppingBag, Wallet, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { ff, ffH } from "@/app/components/shared";

export function StudentDashboardLayout() {
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/student/dashboard", label: "Overview", icon: <LayoutDashboard size={18} />, end: true },
    { to: "/student/dashboard/orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
    { to: "/student/dashboard/wallet", label: "Wallet & Rewards", icon: <Wallet size={18} /> },
    { to: "/student/dashboard/queue", label: "Queue Monitor", icon: <Clock size={18} /> },
    { to: "/student/dashboard/documents", label: "Saved Files", icon: <FileText size={18} /> },
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
          {navItems.map((item: any) => (
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
