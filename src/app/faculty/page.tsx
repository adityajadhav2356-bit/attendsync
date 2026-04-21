"use client";

import { CheckSquare, UploadCloud, Users, Save, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const BATCHES = ["SY A", "SY B", "SY C", "TY A", "TY B", "BE A", "BE B"];

type StudentRecord = { id: number; name: string; roll: string; present: boolean };

export default function FacultyDashboard() {
  const [selectedBatch, setSelectedBatch] = useState("TY B");
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Generate dynamic mock students whenever a batch is selected
  useEffect(() => {
    const list = Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: `${selectedBatch.replace(" ", "")} Student ${i + 1}`,
      roll: `${20 + i}`,
      present: true,
    }));
    setStudents(list);
  }, [selectedBatch]);

  const toggleAttendance = (id: number) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  const markAll = (status: boolean) => {
    setStudents(students.map(s => ({ ...s, present: status })));
  };

  const handleSync = () => {
    if (syncing || syncDone) return;
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncDone(true);
      setTimeout(() => setSyncDone(false), 3000); 
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const filename = e.target.files[0].name;
      
      // Simulate reading and parsing the file
      setTimeout(() => {
        setUploading(false);
        setUploadedFile(filename);
        alert(`Successfully parsed ${filename} and extracted attendance data!`);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Attendance Faculty</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Mark daily attendance and synchronize data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-6 flex flex-col justify-center border-l-4 border-l-indigo-500 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <UploadCloud className="w-6 h-6 text-indigo-500" />
               <h3 className="text-lg font-semibold dark:text-white">Bulk Upload</h3>
             </div>
             {uploadedFile && <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-1 rounded-md">Processed</span>}
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4 h-10">
            {uploadedFile 
              ? `Successfully parsed: ${uploadedFile}. Attendance applied!` 
              : "Upload an Excel, CSV, JSON, or any generic format to map automatically."}
          </p>
          
          <label htmlFor="file-upload-input" className="w-full relative cursor-pointer block">
             <div className={`w-full py-2.5 rounded-lg flex items-center justify-center font-semibold transition-colors border border-dashed ${uploading ? 'bg-slate-200 border-slate-400 text-slate-500' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'}`}>
               {uploading ? "Parsing Data..." : "Browse Local File"}
             </div>
             <input id="file-upload-input" type="file" className="hidden" accept="*/*" onChange={handleFileUpload} />
          </label>
        </div>

        <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-6 flex flex-col justify-center border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-emerald-500" />
            <h3 className="text-lg font-semibold dark:text-white">Auto-Mapping Sync</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4 h-10">
            Sync today's final absentee snapshot securely to their designated GFMs portal natively.
          </p>
          <button 
            onClick={handleSync}
            disabled={syncing || syncDone}
            className={`w-full py-2.5 rounded-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 ${syncDone ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            {syncing ? (
              <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"/> Syncing...</>
            ) : syncDone ? (
              <><CheckCircle2 className="w-5 h-5"/> Synced Successfully</>
            ) : (
              "Sync Absentees to GFMs"
            )}
          </button>
        </div>
      </div>

      <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Manual Marking View</h3>
            <div className="relative mt-1">
               <select 
                 value={selectedBatch} 
                 onChange={(e) => setSelectedBatch(e.target.value)}
                 className="appearance-none pl-3 pr-8 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
               >
                 {BATCHES.map(b => (
                   <option key={b} value={b}>{b} Division</option>
                 ))}
               </select>
               <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => markAll(true)} className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 transition shadow-sm">
              Mark All Present
            </button>
            <button onClick={() => markAll(false)} className="px-4 py-2 text-xs font-bold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 transition shadow-sm">
              Mark All Absent
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-zinc-900/80 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600 text-sm">Roll No.</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Student Name</th>
                <th className="p-4 font-semibold text-slate-600 text-sm text-right pr-6">Status Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-800">{student.roll}</td>
                  <td className="p-4 font-medium text-slate-700">{student.name}</td>
                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`px-6 py-2 rounded-xl text-xs font-bold transition-all w-28 text-center inline-block shadow-sm tracking-wide
                        ${student.present 
                          ? 'bg-emerald-100/80 text-emerald-700 hover:bg-red-50 hover:text-red-700 border border-emerald-200' 
                          : 'bg-red-100/80 text-red-700 hover:bg-emerald-50 hover:text-emerald-700 border border-red-200'}`}
                    >
                      {student.present ? '✨ PRESENT' : '❌ ABSENT'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
          <button className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg hover:-translate-y-0.5">
            <Save className="w-4 h-4" />
            Submit {selectedBatch} Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
