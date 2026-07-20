// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { GraduationCap, LayoutDashboard, Flag, FileUp, Users, MessageSquare, LogOut, ClipboardCheck, UserCog, Settings } from "lucide-react";

export default function Sidebar({ role }) {
  const getNavLinks = () => {
    switch (role) {
      case "student":
        return [
          { name: "Dashboard", path: "/student", icon: LayoutDashboard },
          { name: "Milestones", path: "/student/milestones", icon: Flag },
          { name: "Submissions", path: "/student/proposal", icon: FileUp },
          { name: "Consultations", path: "/student/consultations", icon: Users },
        ];
      case "supervisor":
        return [
          { name: "Dashboard", path: "/supervisor", icon: LayoutDashboard },
          { name: "My Students", path: "/supervisor/students", icon: Users },
          { name: "Feedback", path: "/supervisor/feedback", icon: MessageSquare },
          { name: "Consultation", path: "/supervisor/consultations", icon: Users },
          { name: "Settings", path: "/supervisor/settings", icon: Settings },
        ];
      case "examiner":
        return [
          { name: "Dashboard", path: "/examiner", icon: LayoutDashboard },
          { name: "Candidates", path: "/examiner/students", icon: Users },
        ];
      case "coordinator":
      default:
        return [
          { name: "Dashboard", path: "/coordinator", icon: LayoutDashboard },
          { name: "All Students", path: "/coordinator/students", icon: Users },
          { name: "Supervisors", path: "/coordinator/supervisors", icon: UserCog },
          { name: "Assignments", path: "/coordinator/assignment", icon: ClipboardCheck },
        ];
    }
  };

  const links = getNavLinks();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col flex-shrink-0 shadow-sm z-20">
      <div className="h-20 flex items-center px-6 border-b border-blue-800 bg-blue-900 text-white">
        <GraduationCap className="h-7 w-7 text-white mr-2" />
        <span className="text-xl font-bold tracking-wide">FYPCompass</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Academic Menu
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === `/${role}`}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"
                }`
              }
            >
              <link.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-100 space-y-1 bg-slate-50">
        <NavLink to="/login" className="flex w-full items-center px-3 py-2 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
          <LogOut className="h-5 w-5 mr-3" /> Logout
        </NavLink>
      </div>
    </aside>
  );
}