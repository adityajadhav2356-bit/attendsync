"use client";

import { Search, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function GFMBatchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const batch = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    name: `Student ${i + 1}`,
    roll: `${20 + i}`,
    attendance: `${Math.floor(Math.random() * 30 + 70)}%`,
    phone: `+91 987654320${i}`,
  }));

  const filteredItems = batch.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Batch Tracker (SE-Computer A)</h1>

      <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-white/50">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search student name or roll..." className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-zinc-900/80 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600">Roll No.</th>
                <th className="p-4 font-semibold text-slate-600">Name</th>
                <th className="p-4 font-semibold text-slate-600">Attendance</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(student => (
                <tr key={student.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-800">{student.roll}</td>
                  <td className="p-4 font-medium text-slate-700">{student.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${parseInt(student.attendance) < 75 ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                      {student.attendance}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    <a href={`tel:${student.phone}`} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Phone className="w-4 h-4" />
                    </a>
                    <a href={`https://wa.me/${student.phone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 border border-green-100 transition-colors flex items-center gap-1 text-xs font-semibold px-3">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
