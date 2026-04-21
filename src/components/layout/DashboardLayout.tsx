"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Home, FileText, Users, PieChart, CheckSquare } from "lucide-react";
import clsx from "clsx";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role = pathname.split('/')[1] || 'student';

  const getNavItems = () => {
    switch (role) {
      case 'student':
        return [
          { label: "Overview", icon: Home, href: "/student" },
          { label: "My Attendance", icon: PieChart, href: "/student/attendance" },
          { label: "Leave Requests", icon: FileText, href: "/student/requests" },
        ];
      case 'gfm':
        return [
          { label: "Batch Tracker", icon: Users, href: "/gfm/batch" },
          { label: "Leave Approvals", icon: FileText, href: "/gfm/requests" },
        ];
      case 'faculty':
        return [
          { label: "Mark Attendance", icon: CheckSquare, href: "/faculty/mark" },
          { label: "Daily Report", icon: FileText, href: "/faculty/report" },
        ];
      case 'dac':
      case 'hod':
        return [
          { label: "Central Analytics", icon: PieChart, href: `/${role}/analytics` },
          { label: "All Students", icon: Users, href: `/${role}/students` },
        ];
      default:
        return [{ label: "Dashboard", icon: Home, href: `/${role}` }];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-slate-50 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200/50 -z-10 pointer-events-none" />
      
      <aside className="w-64 border-r border-slate-200 bg-white/70 backdrop-blur-xl flex flex-col print:hidden">
        <div className="h-16 flex items-center px-6 border-b border-slate-100/50 mb-4">
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">AttendSync</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href.endsWith('/mark') && pathname === '/faculty');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                  isActive 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 hover:bg-slate-800" 
                    : "text-slate-600 hover:bg-white hover:shadow-sm"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-slate-200" : "text-slate-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200/50">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200 font-medium">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-transparent print:hidden">
          <div className="flex-1 text-slate-500 font-medium capitalize flex items-center gap-2">
            {role} Portal <span className="text-slate-300">/</span> {pathname.split('/').pop() || 'Overview'}
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-slate-800">
                 {role === 'student' ? 'Aaditya Jadhav' : role === 'gfm' ? 'Prof. Rutuja Khedkar' : 'System User'}
               </p>
               <p className="text-xs text-slate-500 capitalize">{role}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex flex-shrink-0"></div>
          </div>
        </header>

        <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 md:px-8 pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
