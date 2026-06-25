import { useState } from "react";
import { useNavigate } from "react-router";
import { AlertTriangle, ArrowRight, CheckCircle, ChevronRight, FileText, Upload, Zap } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { ff, ffH } from "@/app/components/shared";

export function StudentOrderFlowPage() {
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
                    { check: "File Format", status: "pass", detail: "PDF — Supported" },
                    { check: "Resolution", status: "pass", detail: "300 DPI — Print Ready" },
                    { check: "Paper Size", status: "pass", detail: "A4 — Detected" },
                    { check: "Margins", status: "warn", detail: "Bottom margin slightly narrow (0.8cm)" },
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
                {["Thesis_Chapter1.pdf", "Research_Presentation.pptx", "Lab_Report_Final.docx"].map((f) => (
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
                  {["A4", "Letter", "Legal"].map((size) => (
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
                { id: "gcash", label: "GCash", icon: "💙", detail: "Instant — No fees" },
                { id: "maya", label: "Maya", icon: "💚", detail: "Instant — No fees" },
                { id: "wallet", label: "Printing Wallet", icon: "👛", detail: "Balance: ₱450.00" },
                { id: "card", label: "Debit / Credit Card", icon: "💳", detail: "Visa, Mastercard, JCB" },
                { id: "cod", label: "Cash upon Pickup", icon: "💵", detail: "Pay at the shop" },
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" style={ff}>Voucher Code</label>
              <input type="text" placeholder="Enter your voucher code..." className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7FFD]/30 focus:border-[#1B7FFD] transition-all" style={ff} />
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
