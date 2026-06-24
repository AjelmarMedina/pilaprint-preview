import { useNavigate } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { B, ff, ffH } from "@/app/components/shared";
import { UNIVERSITIES } from "@/app/data";

type StudentAuthViewProps = {
  mode: "login" | "register";
};

export function StudentAuthView({ mode }: StudentAuthViewProps) {
  const nav = useNavigate();
  const isRegister = mode === "register";

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
                  { label: "Full Name",     placeholder: "Juan dela Cruz",        type: "text" },
                  { label: "Email Address", placeholder: "you@university.edu.ph", type: "email" },
                  { label: "Mobile Number", placeholder: "09XX XXX XXXX",         type: "tel" },
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

type BusinessAuthViewProps = {
  mode: "login" | "register";
};

export function BusinessAuthView({ mode }: BusinessAuthViewProps) {
  const nav = useNavigate();
  const isRegister = mode === "register";

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
            {[
              "Access the digital order management dashboard",
              "Real-time sales analytics and profit tracking",
              "Inventory monitoring with low-stock alerts",
              "Automated queue management system",
            ].map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="mt-0.5 h-[18px] w-[18px] rounded-full border border-white flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </div>
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
                  { label: "Business Name", placeholder: "PrintMaster Dasmariñas", type: "text" },
                  { label: "Store Location", placeholder: "123 Aguinaldo Hwy, Dasmariñas", type: "text" },
                  { label: "Contact Number", placeholder: "09XX XXX XXXX", type: "tel" },
                  { label: "Email Address", placeholder: "shop@email.com", type: "email" },
                  { label: "BIR / TIN Number", placeholder: "XXX-XXX-XXX-000", type: "text" },
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