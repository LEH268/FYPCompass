import {
    LayoutDashboard,
    FileText,
    Clock,
    MessageSquare,
    CalendarDays,
    Bell,
    LogOut,
    Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ role }) {
    const navigate = useNavigate();

    const menu = {
        Student: [
            { name: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
            { name: "Proposal Submission", icon: FileText, path: "/student/proposal" },
            { name: "Milestones", icon: Clock, path: "/student/milestones" },
            { name: "Feedback", icon: MessageSquare, path: "/student/feedback" },
            { name: "Consultation Records", icon: CalendarDays, path: "/student/consultations" },
            { name: "Notifications", icon: Bell, path: "/student/notifications" }
        ],
        Supervisor: [
            { name: "Dashboard", icon: LayoutDashboard, path: "/supervisor/dashboard" },
            { name: "Student Progress", icon: Clock, path: "/supervisor/progress" },
            { name: "Feedback Management", icon: MessageSquare, path: "/supervisor/feedback" },
            { name: "Consultations", icon: CalendarDays, path: "/supervisor/consultations" }
        ],
        Coordinator: [
            { name: "Dashboard", icon: LayoutDashboard, path: "/coordinator/dashboard" },
            { name: "Assign Supervisors", icon: Users, path: "/coordinator/assign" },
            { name: "Reports", icon: FileText, path: "#" }
        ],
        Examiner: [
            { name: "Dashboard", icon: LayoutDashboard, path: "/examiner/dashboard" },
            // Project Evaluation is accessed by clicking a specific project, so it doesn't need a sidebar link
        ]
    };

    return (
        <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col p-5 sticky top-0">
            <h1 className="text-2xl font-bold mb-8 text-center text-blue-400">
                FYPCompass
            </h1>

            <nav className="flex-1 overflow-y-auto">
                {menu[role]?.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 mb-2 transition"
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </button>
                    );
                })}
            </nav>

            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3 px-4 py-3 mt-4 hover:bg-red-500 rounded-lg transition"
            >
                <LogOut size={20} />
                Logout
            </button>
        </aside>
    );
}