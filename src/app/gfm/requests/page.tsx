"use client";

import { CheckSquare, XSquare, FileText, CheckCircle2, XCircle, X, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { getStoredRequests, updateStoredRequest, AbsenceRequest } from "@/lib/store";

export default function GFMRequestsPage() {
  const [requests, setRequests] = useState<AbsenceRequest[]>([]);
  const [viewingProof, setViewingProof] = useState<AbsenceRequest | null>(null);

  useEffect(() => {
    async function load() {
      setRequests(await getStoredRequests());
    }
    load();
  }, []);

  const handleAction = async (id: number | undefined, newStatus: 'approved' | 'rejected') => {
    if (!id) return;
    await updateStoredRequest(id, newStatus); 
    setRequests(await getStoredRequests()); 
  };

  const pendingRequests = requests.filter(r => r.status === "pending");
  const reviewedRequests = requests.filter(r => r.status !== "pending");

  return (
    <div className="space-y-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Leave Requests Approval</h1>
        <p className="text-slate-500 mt-1">Review student absence submissions. You have {pendingRequests.length} to evaluate.</p>
      </div>

      <div className="space-y-4">
        {pendingRequests.map((req) => (
          <div key={req.id} className="glass-card shadow-sm border border-indigo-100 bg-white/90 backdrop-blur-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-slate-800 text-lg">{req.name} <span className="text-slate-400 text-sm font-normal">(Roll No. {req.roll})</span></h3>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-100 rounded-lg pb-0.5">Needs Review</span>
                </div>
                <p className="text-slate-600 font-medium text-sm">{req.type} ({req.days}) - <span className="text-slate-500 font-normal">{req.date}</span></p>
                <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600">
                  <span className="font-semibold text-slate-800 block mb-1">Reason:</span>
                  {req.reason}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 min-w-[140px]">
                {req.proof_filename ? (
                  <button 
                    onClick={() => setViewingProof(req)}
                    className="px-4 py-2 flex items-center justify-center gap-2 bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 font-medium rounded-lg text-sm transition shadow-sm"
                  >
                    <FileText className="w-4 h-4" /> View Proof
                  </button>
                ) : (
                  <span className="text-xs text-center text-slate-400 py-2">
                    No file attached
                  </span>
                )}
                
                <button 
                  onClick={() => handleAction(req.id, "approved")}
                  className="px-4 py-2 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 font-medium rounded-lg text-sm transition shadow-md"
                >
                  <CheckSquare className="w-4 h-4" /> Approve
                </button>
                <button 
                  onClick={() => handleAction(req.id, "rejected")}
                  className="px-4 py-2 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium border border-red-100 rounded-lg text-sm transition"
                >
                  <XSquare className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendingRequests.length === 0 && (
           <div className="glass-card shadow-sm border border-slate-200 bg-white/70 backdrop-blur-xl p-8 text-center text-slate-500 flex flex-col items-center">
             <CheckCircle2 className="w-16 h-16 mb-4 text-emerald-400" />
             <h2 className="text-xl font-semibold text-slate-800 mb-2">All Caught Up!</h2>
             <p>There are no pending requests to review. Great job maintaining the queue.</p>
           </div>
        )}
      </div>

      {reviewedRequests.length > 0 && (
        <div className="mt-10 pt-6 border-t border-slate-200">
           <h2 className="text-lg font-bold text-slate-800 mb-4">Recently Reviewed</h2>
           <div className="space-y-4">
              {reviewedRequests.map((req) => (
                 <div key={req.id} className="glass-card shadow-sm border border-slate-200 bg-white/40 p-4 opacity-70">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-md">{req.name} (Roll No. {req.roll})</h4>
                        <p className="text-slate-500 text-xs mt-1">{req.date} • {" "}
                          {req.proof_filename ? <span className="text-indigo-500 cursor-pointer hover:underline" onClick={() => setViewingProof(req)}>📎 {req.proof_filename}</span> : 'no attachments'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-xs font-bold ${req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {req.status === 'approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* Proof Viewer Overlay */}
      {viewingProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh] min-h-[500px]">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
              <div>
                 <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-500" /> {viewingProof.proof_filename}</h3>
                 <p className="text-xs text-slate-500 mt-1">Submitted by {viewingProof.name}</p>
              </div>
              <button onClick={() => setViewingProof(null)} className="p-2 bg-white hover:bg-red-50 hover:text-red-600 rounded-full transition text-slate-500 shadow-sm border border-slate-200">
                <X className="w-5 h-5"/>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-slate-100 flex items-center justify-center p-6 relative">
               {viewingProof.proof_url?.includes("image/") ? (
                  <img src={viewingProof.proof_url} alt="Uploaded Proof" className="max-w-full rounded-xl shadow-lg border border-slate-200" />
               ) : viewingProof.proof_url?.includes("application/pdf") ? (
                  <iframe src={viewingProof.proof_url} className="w-full h-full min-h-[600px] rounded-xl shadow-lg border border-slate-200" title="PDF Preview" />
               ) : viewingProof.proof_url ? (
                  <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
                     <FileText className="w-16 h-16 text-slate-300 mb-4" />
                     <h2 className="text-xl font-bold text-slate-800">Preview Not Available</h2>
                     <p className="text-slate-500 max-w-md mt-2 mb-6">Browsers cannot securely preview files like raw Excel or Word Docs directly inside a window. You'll need to download it to view.</p>
                     
                     <a href={viewingProof.proof_url} download={viewingProof.proof_filename || 'proof'} className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 font-semibold rounded-xl shadow-lg shadow-indigo-200 transition flex items-center gap-2">
                        <Download className="w-5 h-5" /> Download File
                     </a>
                  </div>
               ) : (
                  <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center">
                     <FileText className="w-16 h-16 text-slate-300 mb-4" />
                     <h2 className="text-xl font-bold text-slate-800">Demo Mock Record</h2>
                     <p className="text-slate-500 max-w-md mt-2">This is just a pre-seeded dummy record with no physical file intentionally attached to verify the UI. Submit a brand new file via Aaditya's account to experience the viewer fully!</p>
                  </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
