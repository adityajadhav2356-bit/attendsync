import { Calendar, CheckCircle2, XCircle, Clock, User, Phone } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const stats = [
    { label: "Overall Attendance", value: "85%", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Total Present", value: "102 Days", icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "Total Absent", value: "18 Days", icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Pending Requests", value: "1", icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome back, Aaditya Jadhav!</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
              PRN: RBT24CS081
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/30">
              <User className="w-4 h-4" />
              GFM: Prof. Rutuja Khedkar
            </span>
          </div>
        </div>
        <Link href="/student/requests" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-xl font-medium shadow-md transition-all flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Submit Absence Reason
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card shadow-sm border-slate-200/60 bg-white/70 backdrop-blur-xl p-6 flex items-start gap-4 hover:scale-[1.02] transition-transform duration-300">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card shadow-sm border-slate-200/60 bg-white/70 backdrop-blur-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Attendance</h3>
            <Link href="/student/attendance" className="text-sm text-indigo-600 font-medium hover:underline">View Full Log</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-zinc-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${item % 3 === 0 ? "bg-red-500" : "bg-emerald-500 shadow-sm shadow-emerald-200"}`} />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-zinc-100">October {20 - item}, 2026</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">Regular Classes</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item % 3 === 0 ? "bg-red-50 text-red-600 border border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50" : "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50"}`}>
                  {item % 3 === 0 ? "Absent" : "Present"}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card shadow-sm border-slate-200/60 bg-white/70 backdrop-blur-xl p-6">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Leave Requests</h3>
             <Link href="/student/requests" className="text-sm text-indigo-600 font-medium hover:underline">Manage</Link>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm text-slate-800 dark:text-white">Medical Leave</p>
                <span className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] uppercase font-bold rounded-lg mt-0.5">Pending</span>
              </div>
              <p className="text-xs text-slate-500">Oct 15 - Oct 16</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm text-slate-800 dark:text-white">Family Event</p>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] uppercase font-bold rounded-lg mt-0.5">Approved</span>
              </div>
              <p className="text-xs text-slate-500">Sep 28</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
