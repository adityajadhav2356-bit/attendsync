import { Filter, Search, Download } from "lucide-react";

export default function StudentAttendancePage() {
  const allRecords = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    date: new Date(2026, 9, 30 - i).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    type: "Regular Day",
    status: Math.random() > 0.15 ? "Present" : "Absent",
    markedBy: "Faculty Autoupdate"
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Attendance Log</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">View your complete day-to-day attendance history.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition">
              <Download className="w-4 h-4" />
              Export
            </button>
        </div>
      </div>

      <div className="glass-card shadow-sm border-slate-200/60 bg-white/70 backdrop-blur-xl p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-white/50">
           <div className="relative flex-1 max-w-sm">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="Search by date or type..." className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-zinc-900/80 border-b border-slate-200 dark:border-zinc-800">
                <th className="p-4 font-semibold text-slate-600 dark:text-zinc-400 text-sm">Date</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-zinc-400 text-sm">Class Type</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-zinc-400 text-sm text-center">Status</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-zinc-400 text-sm text-right">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {allRecords.map((record, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-zinc-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                  <td className="p-4 font-medium text-slate-800 dark:text-zinc-300">{record.date}</td>
                  <td className="p-4 text-slate-600 dark:text-zinc-400">{record.type}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block w-20 text-center ${record.status === "Absent" ? "bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/30 dark:text-red-400" : "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 text-sm text-right">{record.markedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
