import { Users, AlertTriangle, MessageCircle, Phone, CheckSquare } from "lucide-react";

export default function GFMDashboard() {
  const stats = [
    { label: "My Batch", value: "25", desc: "Total Students", icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Today's Absentees", value: "3", desc: "12% of batch", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Pending Leave Req.", value: "2", desc: "Needs review", icon: CheckSquare, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const absentees = [
    { name: "Rahul Sharma", roll: "21", attendance: "75%", phone: "+91 9876543210" },
    { name: "Priya Singh", roll: "14", attendance: "68%", phone: "+91 9876543211" },
    { name: "Aman Gupta", roll: "03", attendance: "82%", phone: "+91 9876543212" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">GFM Overview</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Manage and track your assigned batch.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Today's Absentees</h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-3">
            {absentees.map((student, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40">
                <div className="mb-3 sm:mb-0">
                  <p className="font-medium text-slate-900 dark:text-white">{student.name} (Roll: {student.roll})</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${parseInt(student.attendance) < 75 ? "bg-red-500" : "bg-amber-500"}`}></span>
                    Overall: {student.attendance}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`tel:${student.phone}`} className="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                  <a href={`https://wa.me/${student.phone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 transition-colors flex items-center gap-1 text-xs font-semibold px-3">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Pending Leave Requests</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-100 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Priya Singh</p>
                <p className="text-xs text-slate-500 mt-1">Medical (2 days)</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Approve</button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition">Reject</button>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Aman Gupta</p>
                <p className="text-xs text-slate-500 mt-1">Personal (1 day)</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Approve</button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
