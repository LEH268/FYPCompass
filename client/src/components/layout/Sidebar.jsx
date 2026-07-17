import { NavLink } from "react-router-dom";
import { 
  Compass, LayoutDashboard, Flag, FileUp, Users, MessageSquare, Settings, LogOut, ClipboardCheck 
} from "lucide-react";

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
          { name: "Meetings", path: "/supervisor/consultations", icon: Users },
        ];
      case "examiner":
        return [
          { name: "Dashboard", path: "/examiner", icon: LayoutDashboard },
          { name: "Evaluations", path: "/examiner/evaluations", icon: ClipboardCheck },
        ];
      case "coordinator":
      default:
        return [
          { name: "Dashboard", path: "/coordinator", icon: LayoutDashboard },
          { name: "Assignments", path: "/coordinator/assignment", icon: Users },
        ];
    }
  };

  const links = getNavLinks();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Compass className="h-7 w-7 text-indigo-600 mr-2" />
        <span className="text-xl font-bold text-slate-800">FYPCompass</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === `/${role}`}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <link.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-100 space-y-1">
        <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
          <Settings className="h-5 w-5 mr-3" /> Settings
        </button>
        <NavLink to="/login" className="flex w-full items-center px-3 py-2 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
          <LogOut className="h-5 w-5 mr-3" /> Logout
        </NavLink>
      </div>
    </aside>
  );
}