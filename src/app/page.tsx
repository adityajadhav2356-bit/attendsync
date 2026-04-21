"use client";

import { LogIn, User, Users, GraduationCap, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const ROLES = [
  { id: "student", label: "Student", icon: User },
  { id: "gfm", label: "GFM", icon: Users },
  { id: "faculty", label: "Faculty", icon: GraduationCap },
  { id: "dac", label: "DAC", icon: FileText },
  { id: "hod", label: "HOD", icon: Briefcase },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let targetRoute = "/student"; 
    if (selectedRole === "gfm") targetRoute = "/gfm/batch";
    else if (selectedRole === "faculty") targetRoute = "/faculty";
    else if (selectedRole === "dac") targetRoute = "/dac";
    else if (selectedRole === "hod") targetRoute = "/hod";

    setTimeout(() => {
      router.push(targetRoute);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200/50 flex flex-col items-center justify-center p-4 selection:bg-indigo-100">
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-slate-200/50 mb-4 border border-slate-100">
           <GraduationCap className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">AttendSync</h1>
        <p className="text-slate-500 font-medium mt-2">Sign in to your unified portal dashboard</p>
      </div>

      <div className="w-full max-w-md glass-card p-8 bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
        
        <div className="mb-6">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Select Your Role</label>
           <div className="grid grid-cols-5 gap-2">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={clsx(
                    "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 border gap-1.5",
                    selectedRole === role.id 
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm transform scale-105" 
                      : "border-transparent hover:bg-white text-slate-500 hover:text-slate-700 hover:shadow-sm"
                  )}
                >
                  <role.icon className={clsx("w-5 h-5", selectedRole === role.id ? "text-indigo-600" : "text-slate-400")} />
                  <span className="text-[10px] font-bold">{role.label}</span>
                </button>
              ))}
           </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
             <label className="text-sm font-semibold text-slate-700 block mb-1">Email address</label>
             <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm font-medium" placeholder={`user@${selectedRole}.edu`} />
          </div>
          <div>
             <label className="text-sm font-semibold text-slate-700 block mb-1">Password</label>
             <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm font-medium" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} className="w-full mt-2 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2 group">
            {loading ? "Authenticating..." : <><LogIn className="w-5 h-5 transition-transform"/> Sign In</>}
          </button>
        </form>

      </div>
    </div>
  );
}
