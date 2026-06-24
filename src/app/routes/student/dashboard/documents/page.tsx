import { useNavigate } from "react-router";
import { Download, FileText, Upload } from "lucide-react";
import { B, ff, ffH } from "@/app/components/shared";

export function StudentDocumentsPage() {
  const nav = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800" style={ffH}>Saved Files</h2>
        <button onClick={() => nav("/student/order")} className="px-4 py-2 bg-[#1B7FFD] text-white text-sm font-bold rounded-xl flex items-center gap-2" style={ffH}><Upload size={16} /> Upload File</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "Thesis_Chapter1.pdf", size: "2.4 MB", type: "PDF", date: "Jun 15, 2026", color: B.azure },
          { name: "Research_Presentation.pptx", size: "5.1 MB", type: "PPT", date: "Jun 12, 2026", color: B.tangerine },
          { name: "Lab_Report_Final.docx", size: "1.2 MB", type: "DOCX", date: "Jun 10, 2026", color: B.verdant },
          { name: "Cover_Page_Formatted.pdf", size: "0.8 MB", type: "PDF", date: "Jun 8, 2026", color: B.azure },
          { name: "Group_Project_Slides.pptx", size: "7.3 MB", type: "PPT", date: "Jun 5, 2026", color: B.tangerine },
          { name: "Appendix_Tables.pdf", size: "1.5 MB", type: "PDF", date: "Jun 3, 2026", color: B.azure },
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
