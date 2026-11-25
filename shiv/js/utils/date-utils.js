(function () {
  "use strict";
  const pad = n => String(n).padStart(2, "0");
  function toISODate(date) {
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }
  function formatDate(iso) {
    if (!iso) return "—";
    const parts = String(iso).split("-").map(Number);
    if (parts.length !== 3 || !parts.every(Number.isFinite)) return "—";
    const d = new Date(parts[0], parts[1]-1, parts[2]);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }
  function daysUntil(iso) {
    if (!iso) return null;
    const [y,m,d] = iso.split("-").map(Number);
    const target = new Date(y,m-1,d); target.setHours(0,0,0,0);
    const today = new Date(); today.setHours(0,0,0,0);
    return Math.round((target-today)/86400000);
  }
  function scheduleLabel(iso) {
    const days = daysUntil(iso);
    if (days === null) return "Date not set";
    if (days < 0) return `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}`;
    if (days === 0) return "Due today";
    if (days <= 30) return `Due in ${days} day${days === 1 ? "" : "s"}`;
    return `Scheduled`;
  }
  window.VRAFMDates = { toISODate, formatDate, daysUntil, scheduleLabel };
})();
