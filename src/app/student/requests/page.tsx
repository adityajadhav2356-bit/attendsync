"use client";

import { useState, useEffect } from "react";
import { UploadCloud, FileText, Send, Paperclip, CheckCircle2, XCircle, Clock } from "lucide-react";
import { getStoredRequests, addStoredRequest, AbsenceRequest } from "@/lib/store";

export default function StudentRequestsPage() {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);
  const [myRequests, setMyRequests] = useState<AbsenceRequest[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getStoredRequests();
      setMyRequests(data.filter(r => r.roll === "RBT24CS081"));
    }
    load();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setFileDataURL(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return "1 day";
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return diffDays === 1 ? "1 day" : `${diffDays} days`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const daysCount = calculateDays(fromDate, toDate);
    await addStoredRequest({
      name: "Aaditya Jadhav",
      roll: "RBT24CS081",
      type: "Leave Application",
      days: daysCount,
      reason: reason,
      date: `${fromDate} to ${toDate}`,
      status: "pending",
      proof_filename: selectedFile ? selectedFile.name : null,
      proof_url: fileDataURL 
    });

    const data = await getStoredRequests();
    setMyRequests(data.filter(r => r.roll === "RBT24CS081"));

    setSubmitting(false);
    setReason("");
    setFromDate("");
    setToDate("");
    setSelectedFile(null);
    setFileDataURL(null);
    alert("Leave Request Submitted via Supabase Cloud!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Absence Requests</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Submit proof and reasoning to excuse missing classes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-4 border-b border-slate-100">Submit New Request</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">From Date</label>
                <input type="date" required value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-indigo-500/50 shadow-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">To Date</label>
                <input type="date" required value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-indigo-500/50 shadow-sm outline-none" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Reason for Absence</label>
              <textarea 
                required 
                rows={4}
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-indigo-500/50 shadow-sm outline-none resize-none"
                placeholder="Briefly describe why you were absent..."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Attach Proof (Any Document)</label>
              <label htmlFor="file-upload" className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 transition cursor-pointer relative overflow-hidden">
                 <input 
                   id="file-upload" 
                   type="file" 
                   className="hidden"
                   onChange={handleFileChange}
                 />
                 {fileDataURL ? (
                   <div className="text-center w-full">
                     {fileDataURL.includes("image/") ? (
                         <img src={fileDataURL} alt="Preview" className="h-20 w-auto mx-auto mb-2 rounded-md object-cover shadow-sm" />
                     ) : (
                         <FileText className="w-10 h-10 mb-2 mx-auto text-indigo-500" />
                     )}
                     <p className="text-sm font-bold text-slate-800 truncate px-4">{selectedFile?.name}</p>
                     <p className="text-xs text-slate-400 mt-1">Ready to submit! Click to change.</p>
                   </div>
                 ) : (
                   <div className="text-center">
                     <UploadCloud className="w-8 h-8 mb-2 mx-auto text-indigo-400" />
                     <p className="text-sm font-medium">Click to attach file</p>
                     <p className="text-xs text-slate-400 mt-1">Any format allowed (PDF, Image, Docx)</p>
                   </div>
                 )}
              </label>
            </div>

            <button disabled={submitting} className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 shadow-md transition-all flex items-center justify-center gap-2 mt-2">
              {submitting ? "Submitting..." : <><Send className="w-4 h-4" /> Submit Request</>}
            </button>
          </form>
        </div>

        <div className="glass-card shadow-sm border border-slate-200/60 bg-white/70 backdrop-blur-xl p-6 flex flex-col h-full">
           <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-4 border-b border-slate-100">My Review History</h3>
           <div className="space-y-4 flex-1 overflow-y-auto max-h-[500px] pr-2">
             
             {myRequests.length === 0 && (
                <div className="text-center text-slate-400 py-10">
                  You haven't submitted any requests yet.
                </div>
             )}

             {myRequests.map(req => (
               <div key={req.id} className={`block p-4 border rounded-xl shadow-sm transition-opacity ${req.status !== 'pending' ? 'bg-white opacity-70 border-slate-200' : 'bg-white border-indigo-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800">{req.type}</h4>
                    {req.status === 'pending' && <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 rounded-lg flex items-center gap-1"><Clock className="w-3 h-3"/> Pending</span>}
                    {req.status === 'approved' && <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700 rounded-lg flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Approved</span>}
                    {req.status === 'rejected' && <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-red-100 text-red-700 rounded-lg flex items-center gap-1"><XCircle className="w-3 h-3"/> Rejected</span>}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{req.reason}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {req.date} ({req.days})</span>
                    {req.proof_filename && (
                      <span className="flex items-center gap-1 text-indigo-600"><Paperclip className="w-3.5 h-3.5" /> {req.proof_filename}</span>
                    )}
                  </div>
               </div>
             ))}

           </div>
        </div>
      </div>
    </div>
  );
}
