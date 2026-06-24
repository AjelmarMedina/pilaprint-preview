import { NavLink, Outlet, useNavigate } from "react-router";
import { Bell, BarChart2, Clock, LayoutDashboard, LogOut, Package, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { ff } from "@/app/components/shared";

export function BusinessDashboardLayout() {
  const nav = useNavigate();
  const tabs = [
    { to: "/business/dashboard", label: "Overview", icon: <LayoutDashboard size={16} />, end: true },
    { to: "/business/dashboard/transactions", label: "Transactions", icon: <ShoppingBag size={16} /> },
    { to: "/business/dashboard/analytics", label: "Analytics", icon: <BarChart2 size={16} /> },
    { to: "/business/dashboard/inventory", label: "Inventory", icon: <Package size={16} /> },
    { to: "/business/dashboard/queue", label: "Queue", icon: <Clock size={16} /> },
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
            {tabs.map((t: any) => (
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
