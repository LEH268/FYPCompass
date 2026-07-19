// src/pages/supervisor/SupervisorDashboard.jsx
import { useNavigate } from "react-router-dom";
import { Users, FileSignature, CalendarCheck, AlertCircle, Eye, BookOpen } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorDashboard() {
  const navigate = useNavigate();
  const { students, submissions, consultations } = useData();

  // Filter for Dr. Alan Turing (F01)
  const myStudents = students.filter(s => s.supervisorId === "F01");
  const myPendingSubmissions = submissions.filter(sub => 
    sub.status === "Pending Review" && myStudents.some(s => s.id === sub.studentId)
  );

  const myMeetingsThisWeek = consultations.filter(c => myStudents.some(s => s.id === c.studentId));

  const stats = [
    { title: "Active Students", value: myStudents.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50", link: "/supervisor/students" },
    { title: "Pending Reviews", value: myPendingSubmissions.length, icon: FileSignature, color: "text-amber-600", bg: "bg-amber-50", link: "/supervisor/feedback" },
    { title: "Meetings Logged", value: myMeetingsThisWeek.length, icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50", link: "/supervisor/consultations" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Supervisor Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your supervisees and track their real-time progress.</p>
        </div>
        <button onClick={() => navigate('/supervisor/consultations')} className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-colors active:scale-95 flex items-center">
          <CalendarCheck className="w-4 h-4 mr-2" /> Schedule Meeting
        </button>
      </div>

      {/* Supervisor Academic Banner */}
      <div className="relative w-full h-32 md:h-40 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-indigo-900/60 to-transparent"></div>
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center">
          <BookOpen className="h-8 w-8 text-blue-300 mb-2 animate-pulse" />
          <h2 className="text-white text-lg md:text-xl font-bold max-w-lg leading-tight drop-shadow-md">
            "Great research begins with great guidance."
          </h2>
          <p className="text-indigo-100 text-xs md:text-sm mt-1 max-w-md drop-shadow-sm font-medium">
            Support students, review milestones, and shape the next generation of engineers.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} onClick={() => navigate(stat.link)} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold group-hover:text-indigo-600 transition-colors">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Supervisees Progress</h3>
            <button onClick={() => navigate('/supervisor/students')} className="text-sm text-indigo-600 font-bold hover:underline transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100">
                  <th className="p-4 pl-5">Student</th>
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {myStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-5 cursor-pointer" onClick={() => navigate(`/supervisor/students/${student.id}`)}>
                      <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{student.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5 font-medium">{student.id}</div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium max-w-[200px] truncate">
                      {student.topic}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className={`mr-3 text-xs font-bold w-8 ${student.progress > 50 ? 'text-emerald-600' : 'text-indigo-600'}`}>{student.progress}%</span>
                        <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div className={`${student.progress > 50 ? 'bg-emerald-500' : 'bg-indigo-500'} h-full rounded-full transition-all duration-1000`} style={{ width: `${student.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-5">
                      <button onClick={() => navigate(`/supervisor/students/${student.id}`)} className="text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-200 hover:border-indigo-600 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center justify-end w-full shadow-sm">
                        <Eye className="w-3 h-3 mr-1" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Alerts Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center mb-5 pb-4 border-b border-slate-100">
            <AlertCircle className="h-5 w-5 text-rose-500 mr-2" />
            <h3 className="text-lg font-bold text-slate-800">Needs Attention</h3>
          </div>
          <div className="space-y-4 flex-1">
            {myPendingSubmissions.length === 0 && myStudents.filter(s => s.status === "At Risk").length === 0 && (
              <p className="text-sm text-slate-500 italic text-center py-4">No urgent actions required.</p>
            )}
            
            {myPendingSubmissions.map(sub => (
              <div key={sub.id} className="p-4 border border-amber-200 bg-amber-50/50 rounded-xl hover:shadow-sm transition-all cursor-pointer" onClick={() => navigate('/supervisor/feedback')}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">Document Review</span>
                </div>
                <p className="text-sm font-bold text-slate-800 mt-2">{sub.milestone}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Submitted by: {sub.studentName}</p>
              </div>
            ))}
            
            {myStudents.filter(s => s.status === "At Risk").map(risk => (
              <div key={risk.id} className="p-4 border border-rose-200 bg-rose-50/50 rounded-xl hover:shadow-sm transition-all cursor-pointer" onClick={() => navigate(`/supervisor/students/${risk.id}`)}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded">At Risk Student</span>
                </div>
                <p className="text-sm font-bold text-slate-800 mt-2">{risk.name}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">Progress significantly behind schedule.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}