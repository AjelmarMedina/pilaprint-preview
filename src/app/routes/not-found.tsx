import { useNavigate } from "react-router";
import { ff, ffH } from "@/app/components/shared";

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
