import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/wordmark.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ff } from "./shared";

export function Navbar() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => nav("/")}>
            <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-16 w-auto object-contain drop-shadow-lg/15" />
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