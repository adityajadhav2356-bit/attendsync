"use client";

import { FileText, Download, CheckCircle2, AlertTriangle, Printer } from "lucide-react";
import { useState } from "react";

export default function FacultyReportPage() {
  const [exporting, setExporting] = useState(false);

  const summarizedData = [
    { id: 1, batch: "SY A", strength: 60, present: 54, absent: 6, percentage: "90%", status: "Good" },
    { id: 2, batch: "SY B", strength: 62, present: 50, absent: 12, percentage: "80.6%", status: "Warning" },
    { id: 3, batch: "TY A", strength: 55, present: 52, absent: 3, percentage: "94.5%", status: "Excellent" },
    { id: 4, batch: "TY B", strength: 58, present: 45, absent: 13, percentage: "77.5%", status: "Warning" },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    if (exporting) return;
    setExporting(true);
    
    // Simulate generation time, then use native print dialog to save as PDF
    setTimeout(() => {
      setExporting(false);
      window.print();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Daily Summary Report</h1>
          <p className="text-slate-500 mt-1">Consolidated attendance metrics for today's submissions.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handlePrint}
             className="px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition shadow-sm text-slate-700"
           >
             <Printer className="w-4 h-4" />
             Print
           </button>
           <button 
             onClick={handleExportPDF}
             disabled={exporting}
             className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 transition shadow-md min-w-[140px] justify-center"
           >
             {exporting ? (
               <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Generating...</>
             ) : (
               <><Download className="w-4 h-4" /> Export PDF</>
             )}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center gap-4 p-6 print:border-slate-300 print:shadow-none print:bg-white">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-slate-500 font-medium">Total Batches Synced</p>
               <h3 className="text-2xl font-bold text-slate-800 mt-1">4 <span className="text-sm font-normal text-slate-400">/ 7</span></h3>
            </div>
         </div>
         <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center gap-4 p-6 print:border-slate-300 print:shadow-none print:bg-white">
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-slate-500 font-medium">Average Present</p>
               <h3 className="text-2xl font-bold text-slate-800 mt-1">85.6%</h3>
            </div>
         </div>
         <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center gap-4 p-6 print:border-slate-300 print:shadow-none print:bg-white">
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-slate-500 font-medium">Total Absentees Today</p>
               <h3 className="text-2xl font-bold text-slate-800 mt-1">34</h3>
            </div>
         </div>
      </div>

      <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-0 overflow-hidden print:border-slate-300 print:shadow-none print:bg-white">
         <div className="p-5 border-b border-slate-100 bg-white/50 flex items-center justify-between print:bg-white">
            <h3 className="font-bold text-slate-800 text-lg">Batch-wise Breakdown</h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 font-semibold text-xs rounded-lg border border-slate-200">Date: Today</span>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 print:bg-slate-50">
                     <th className="p-4 font-semibold text-slate-600 text-sm">Batch Name</th>
                     <th className="p-4 font-semibold text-slate-600 text-sm">Total Strength</th>
                     <th className="p-4 font-semibold text-emerald-600 text-sm">Present</th>
                     <th className="p-4 font-semibold text-red-600 text-sm">Absent</th>
                     <th className="p-4 font-semibold text-slate-600 text-sm">Attendance %</th>
                     <th className="p-4 font-semibold text-slate-600 text-sm text-right">Remarks</th>
                  </tr>
               </thead>
               <tbody>
                  {summarizedData.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 print:border-slate-200 border-collapse">
                       <td className="p-4 font-bold text-slate-800">{row.batch}</td>
                       <td className="p-4 font-medium text-slate-700">{row.strength}</td>
                       <td className="p-4 font-medium text-slate-700">{row.present}</td>
                       <td className="p-4 font-bold text-slate-800">{row.absent}</td>
                       <td className="p-4">
                         <div className="flex items-center gap-3">
                           <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden print:border print:border-slate-300">
                             <div className={`h-full ${parseFloat(row.percentage) < 80 ? 'bg-red-400' : 'bg-emerald-500'} print:bg-slate-800`} style={{ width: row.percentage }} />
                           </div>
                           <span className="font-semibold text-slate-700 text-sm">{row.percentage}</span>
                         </div>
                       </td>
                       <td className="p-4 text-right">
                          <span className={`px-3 py-1 inline-block text-xs font-bold rounded-lg ${row.status === 'Warning' ? 'bg-amber-100 text-amber-700 print:border print:border-slate-300' : 'bg-emerald-100 text-emerald-700 print:border print:border-slate-300'}`}>
                             {row.status}
                          </span>
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
