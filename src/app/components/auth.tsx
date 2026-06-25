import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Check, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { B, ff, ffH } from "@/app/components/shared";
import { UNIVERSITIES } from "@/app/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

const SUBSCRIPTION_PRICE = 1299;

const SUBSCRIPTION_FEATURES = [
  "Measure analytics and insights",
  "24/7 order tracking",
  "Manage your inventory and orders",
  "Real-time queue updates",
  "No hidden fees",
];

const SUBSCRIPTION_PAYMENT_METHODS = [
  { id: "gcash", label: "GCash", icon: "💙", detail: "Instant — No fees" },
  { id: "maya", label: "Maya", icon: "💚", detail: "Instant — No fees" },
  { id: "card", label: "Debit / Credit Card", icon: "💳", detail: "Visa, Mastercard, JCB" },
];

type SubscriptionStep = "plan" | "payment" | "confirm";

function BusinessSubscriptionModal({
  open,
  onOpenChange,
  onComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<SubscriptionStep>("plan");
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [processing, setProcessing] = useState(false);

  const reset = () => {
    setStep("plan");
    setPaymentMethod("gcash");
    setProcessing(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && !processing) reset();
    onOpenChange(next);
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("confirm");
    }, 1200);
  };

  const handleComplete = () => {
    reset();
    onComplete();
  };

  const steps: { id: SubscriptionStep; label: string }[] = [
    { id: "plan", label: "Plan" },
    { id: "payment", label: "Payment" },
    { id: "confirm", label: "Confirm" },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md p-0 gap-0 overflow-hidden border-0"
        onInteractOutside={(e) => processing && e.preventDefault()}
        onEscapeKeyDown={(e) => processing && e.preventDefault()}
      >
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogHeader className="text-left gap-1">
            <DialogTitle className="text-xl font-bold text-gray-900" style={ffH}>
              {step === "plan" && "Activate Your Partner Subscription"}
              {step === "payment" && "Complete Payment"}
              {step === "confirm" && "Subscription Active"}
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm" style={ff}>
              {step === "plan" && "Subscribe to access the PilaPrint business dashboard after verification."}
              {step === "payment" && "Choose a payment method for your first month."}
              {step === "confirm" && "Your shop registration and subscription are ready."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 mt-4">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    i <= stepIndex
                      ? "text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  style={i <= stepIndex ? { background: "linear-gradient(135deg, #EA6D06, #FFC605)" } : undefined}
                >
                  {i < stepIndex ? <Check size={14} strokeWidth={3} /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 rounded-full ${i < stepIndex ? "bg-[#EA6D06]" : "bg-gray-100"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          {step === "plan" && (
            <div className="space-y-4">
              <div
                className="rounded-2xl p-5 text-white"
                style={{ background: "linear-gradient(135deg, #EA6D06 0%, #FFC605 100%)" }}
              >
                <p className="text-white/80 text-sm mb-1" style={ff}>Partner Plan</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold" style={ffH}>₱{SUBSCRIPTION_PRICE.toLocaleString()}</span>
                  <span className="text-white/90 text-sm" style={ff}>/ month</span>
                </div>
                <p className="text-white/70 text-xs mt-2" style={ff}>No setup fee · Cancel anytime</p>
              </div>

              <ul className="space-y-2.5">
                {SUBSCRIPTION_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-700" style={ff}>
                    <div className="h-5 w-5 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#EA6D06]" strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400 leading-relaxed" style={ff}>
                Your shop details will be submitted for admin verification. Dashboard access begins once payment is confirmed.
              </p>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-4">
              <div className="space-y-2">
                {SUBSCRIPTION_PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    disabled={processing}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === m.id
                        ? "border-[#EA6D06] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${processing ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm" style={ff}>{m.label}</p>
                      <p className="text-xs text-gray-500">{m.detail}</p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        paymentMethod === m.id ? "border-[#EA6D06] bg-[#EA6D06]" : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={ff}>Partner subscription</span>
                  <span className="text-gray-700 font-medium" style={ff}>₱{SUBSCRIPTION_PRICE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={ff}>Billing cycle</span>
                  <span className="text-gray-700 font-medium" style={ff}>Monthly</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                  <span className="text-gray-800" style={ffH}>Due today</span>
                  <span className="text-[#EA6D06]" style={ffH}>₱{SUBSCRIPTION_PRICE.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="text-center py-2 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle size={36} className="text-green-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1" style={ffH}>Payment Successful!</p>
                <p className="text-sm text-gray-500 leading-relaxed" style={ff}>
                  Your subscription is active and your shop has been submitted for verification. You can access your dashboard while we review your application.
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-left space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={ff}>Plan</span>
                  <span className="text-gray-800 font-medium" style={ff}>Partner · Monthly</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={ff}>Amount paid</span>
                  <span className="text-gray-800 font-medium" style={ff}>₱{SUBSCRIPTION_PRICE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500" style={ff}>Payment method</span>
                  <span className="text-gray-800 font-medium" style={ff}>
                    {SUBSCRIPTION_PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
          {step === "plan" && (
            <>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-white transition-colors"
                style={ff}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep("payment")}
                className="flex-1 py-3 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 text-sm"
                style={{ background: "linear-gradient(135deg, #EA6D06, #FFC605)", ...ffH }}
              >
                Continue to Payment <ArrowRight size={16} />
              </button>
            </>
          )}

          {step === "payment" && (
            <>
              <button
                type="button"
                onClick={() => setStep("plan")}
                disabled={processing}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-white transition-colors disabled:opacity-50"
                style={ff}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePay}
                disabled={processing}
                className="flex-1 py-3 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 text-sm disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #EA6D06, #FFC605)", ...ffH }}
              >
                {processing ? "Processing…" : `Confirm & Pay ₱${SUBSCRIPTION_PRICE.toLocaleString()}`}
              </button>
            </>
          )}

          {step === "confirm" && (
            <button
              type="button"
              onClick={handleComplete}
              className="w-full py-3 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 text-sm"
              style={{ background: "linear-gradient(135deg, #EA6D06, #FFC605)", ...ffH }}
            >
              Go to Dashboard <ArrowRight size={16} />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

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
                <button
                  onClick={() => setSubscriptionOpen(true)}
                  className="w-full py-3.5 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
                  style={{ background: "linear-gradient(135deg, #EA6D06, #FFC605)", ...ffH, fontSize: "1rem" }}
                >
                  Submit for Verification
                </button>
              </div>
            </div>
          )}

          <BusinessSubscriptionModal
            open={subscriptionOpen}
            onOpenChange={setSubscriptionOpen}
            onComplete={() => {
              setSubscriptionOpen(false);
              nav("/business/dashboard");
            }}
          />

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