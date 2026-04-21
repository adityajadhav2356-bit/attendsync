"use client";

import { Download, ChevronDown, Calendar, Users, CheckCircle2, AlertTriangle, PieChart } from "lucide-react";
import { useState, useMemo } from "react";

const BATCHES = ["All Classes", "SY A", "SY B", "SY C", "TY A", "TY B", "BE A", "BE B"];

export default function DACDashboardPage() {
  const [selectedBatch, setSelectedBatch] = useState("All Classes");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [exporting, setExporting] = useState(false);

  // Generate dynamic stable data based on batch and date
  const analyticsData = useMemo(() => {
    // Generate an artificial seed so the same batch + date always returns same numbers
    const seed = selectedBatch.charCodeAt(0) + new Date(selectedDate).getDate();
    
    let strength = 0;
    let present = 0;

    if (selectedBatch === "All Classes") {
      strength = 420;
      present = 350 + (seed % 40) - 20; // fluctuate around 350
    } else {
      strength = 60;
      present = 45 + (seed % 12) - 5; // fluctuate around 50
    }
    
    const absent = strength - present;
    const presentPercentage = Math.round((present / strength) * 100);
    const absentPercentage = 100 - presentPercentage;

    // Build chart history data (last 5 days mock)
    const chartHistory = Array.from({ length: 5 }).map((_, i) => {
      const v = presentPercentage - (i * 2) + ((seed + i) % 5);
      return Math.min(Math.max(v, 40), 100); // keep between 40-100
    });

    return { strength, present, absent, presentPercentage, absentPercentage, chartHistory };
  }, [selectedBatch, selectedDate]);

  const handleExportPDF = () => {
    if (exporting) return;
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      window.print();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Central Analytics</h1>
          <p className="text-slate-500 mt-1">High-level attendance overview across all departments.</p>
        </div>
        <button 
           onClick={handleExportPDF}
           disabled={exporting}
           className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 transition shadow-md min-w-[140px] justify-center"
        >
           {exporting ? (
             <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Preparing...</>
           ) : (
             <><Download className="w-4 h-4" /> Export Report</>
           )}
        </button>
      </div>

      {/* Filters (Print visible as text, interactive via web) */}
      <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-4 flex flex-col sm:flex-row items-center gap-4 print:shadow-none print:bg-white print:border-slate-300">
         <div className="flex-1 font-bold text-lg text-slate-800 hidden print:block">
           Attendance Report - {selectedBatch} ({selectedDate})
         </div>
         
         <div className="relative w-full sm:w-64 print:hidden">
            <select 
              value={selectedBatch} 
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full appearance-none pl-10 pr-8 py-2.5 bg-white text-slate-700 font-semibold rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
            >
              {BATCHES.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <PieChart className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
         </div>

         <div className="relative w-full sm:w-64 print:hidden">
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-700 font-semibold rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
         </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center gap-4 p-6 print:shadow-none print:border-slate-300">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-slate-500 font-medium">Total Student Count</p>
               <h3 className="text-3xl font-bold text-slate-800 mt-1">{analyticsData.strength}</h3>
            </div>
         </div>
         <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center gap-4 p-6 print:shadow-none print:border-slate-300">
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-slate-500 font-medium">Total Present</p>
               <h3 className="text-3xl font-bold text-slate-800 mt-1">{analyticsData.present} <span className="text-sm font-semibold text-emerald-600">({analyticsData.presentPercentage}%)</span></h3>
            </div>
         </div>
         <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center gap-4 p-6 print:shadow-none print:border-slate-300">
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
               <p className="text-sm text-slate-500 font-medium">Total Absent</p>
               <h3 className="text-3xl font-bold text-slate-800 mt-1">{analyticsData.absent} <span className="text-sm font-semibold text-red-500">({analyticsData.absentPercentage}%)</span></h3>
            </div>
         </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Present vs Absent Bar */}
        <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-6 print:shadow-none print:border-slate-300">
           <h3 className="font-bold text-slate-800 text-lg mb-6">Attendance Distribution ({selectedDate})</h3>
           
           <div className="flex h-12 w-full rounded-xl overflow-hidden shadow-inner print:border print:border-slate-300">
              <div 
                className="bg-emerald-500 flex items-center justify-center font-bold text-white text-sm transition-all duration-500 ease-out print:bg-emerald-600 print:text-black" 
                style={{ width: `${analyticsData.presentPercentage}%` }}>
                {analyticsData.presentPercentage > 10 ? 'PRESENT' : ''}
              </div>
              <div 
                className="bg-red-400 flex items-center justify-center font-bold text-white text-sm transition-all duration-500 ease-out print:bg-slate-300 print:text-black" 
                style={{ width: `${analyticsData.absentPercentage}%` }}>
                {analyticsData.absentPercentage > 10 ? 'ABSENT' : ''}
              </div>
           </div>
           
           <div className="flex justify-between mt-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
               <span className="text-sm font-semibold text-slate-600">{analyticsData.present} Attended</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <span className="text-sm font-semibold text-slate-600">{analyticsData.absent} Missed</span>
             </div>
           </div>
        </div>

        {/* Pseudo Line/Bar Chart for last 5 Days */}
        <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-6 print:shadow-none print:border-slate-300">
           <h3 className="font-bold text-slate-800 text-lg mb-6">5-Day Trend ({selectedBatch})</h3>
           
           <div className="flex items-end justify-between h-32 gap-2 mt-4">
              {analyticsData.chartHistory.reverse().map((val, idx) => (
                <div key={idx} className="w-full flex flex-col items-center gap-2 group">
                  <span className="text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{val}%</span>
                  <div 
                    className="w-full bg-indigo-200 rounded-t-md relative overflow-hidden print:border print:border-slate-300"
                    style={{ height: '100px' }}
                  >
                    <div className="absolute bottom-0 w-full bg-indigo-500 transition-all duration-500 ease-out print:bg-slate-800" style={{ height: `${val}%` }}></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">Day {idx + 1}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
}
