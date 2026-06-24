import type { CSSProperties } from "react";

export const B = {
  azure: "#1B7FFD",
  sakura: "#F0A5B7",
  verdant: "#5AA864",
  solar: "#FFC605",
  tangerine: "#EA6D06",
};

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; text: string }> = {
    completed: { label: "Completed", bg: "#dcfce7", text: "#166534" },
    ongoing: { label: "Ongoing", bg: "#dbeafe", text: "#1e40af" },
    pending: { label: "Pending", bg: "#fef9c3", text: "#854d0e" },
    ready: { label: "Ready", bg: "#fce7f3", text: "#9d174d" },
    cancelled: { label: "Cancelled", bg: "#fee2e2", text: "#991b1b" },
  };
  const s = map[status] || map.pending;
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s?.bg, color: s?.text }}
    >
      {s?.label}
    </span>
  );
}

export const ff: CSSProperties = { fontFamily: "'Poppins', sans-serif" };
export const ffH: CSSProperties = { fontFamily: "'Fredoka', sans-serif" };