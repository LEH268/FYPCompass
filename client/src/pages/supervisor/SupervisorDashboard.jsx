import { useNavigate } from "react-router-dom";
import { Users, FileSignature, CalendarCheck, AlertCircle, ArrowRight, Eye } from "lucide-react";

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: "Active Students", value: "6", icon: Users, color: "text-blue-600", bg: "bg-blue-50", link: "/supervisor/students" },
    { title: "Pending Reviews", value: "2", icon: FileSignature, color: "text-amber-600", bg: "bg-amber-50", link: "/supervisor/feedback" },
    { title: "Meetings This Week", value: "4", icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50", link: "/supervisor/consultations" },
  ];

  const students = [
    { id: "25001001", name: "Oliver Smith", topic: "Automated Healthcare Diagnosis Using Deep Learning", progress: 35 },
    { id: "25001002", name: "Emma Johnson", topic: "IoT Based Smart Agriculture System", progress: 60 },
    { id: "25001003", name: "Lucas Brown", topic: "Blockchain for Academic Credential Verification", progress: 15 },
    { id: "25001004", name: "Mia Davis", topic: "AR Navigation for Campus", progress: 80 },
    { id: "25001005", name: "Ethan Wilson", topic: "Predictive Maintenance using ML", progress: 45 },
    { id: "25001006", name: "Ava Taylor", topic: "Smart Traffic Management", progress: 10 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Supervisor Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your supervisees and track their progress.</p>
        </div>
        <button onClick={() => navigate('/supervisor/consultations')} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-sm transition-colors active:scale-95 flex items-center">
          <CalendarCheck className="w-4 h-4 mr-2" /> Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} onClick={() => navigate(stat.link)} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium group-hover:text-indigo-600 transition-colors">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Supervisees Progress</h3>
            <button onClick={() => navigate('/supervisor/students')} className="text-sm text-indigo-600 font-medium hover:underline transition-colors">
              View All Students
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100">
                  <th className="p-4 pl-5">Student</th>
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-5 cursor-pointer" onClick={() => navigate(`/supervisor/students/${student.id}`)}>
                      <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{student.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{student.id}</div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium max-w-[200px] truncate">
                      {student.topic}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className={`mr-3 text-xs font-bold w-8 ${student.progress > 50 ? 'text-emerald-600' : 'text-indigo-600'}`}>{student.progress}%</span>
                        <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className={`${student.progress > 50 ? 'bg-emerald-500' : 'bg-indigo-500'} h-full rounded-full transition-all duration-1000`} style={{ width: `${student.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-5">
                      <button onClick={() => navigate(`/supervisor/students/${student.id}`)} className="text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-200 hover:border-indigo-600 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center justify-end w-full">
                        <Eye className="w-3 h-3 mr-1" /> View Full Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center mb-5 pb-4 border-b border-slate-100">
            <AlertCircle className="h-5 w-5 text-rose-500 mr-2" />
            <h3 className="text-lg font-bold text-slate-800">Needs Attention</h3>
          </div>
          <div className="space-y-4 flex-1">
            <div className="p-4 border border-amber-200 bg-amber-50/50 rounded-xl hover:shadow-sm transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">Document Review</span>
                <span className="text-xs font-medium text-amber-600">2 hrs ago</span>
              </div>
              <p className="text-sm font-bold text-slate-800 mt-3">Project Proposal Draft 2</p>
              <p className="text-xs text-slate-600 mt-1">Submitted by: Oliver Smith</p>
              <button onClick={() => navigate('/supervisor/feedback')} className="mt-4 w-full bg-white border border-amber-200 text-amber-800 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-amber-100 hover:text-amber-900 transition-colors flex items-center justify-center">
                Grade / Feedback <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
            
            <div className="p-4 border border-rose-200 bg-rose-50/50 rounded-xl hover:shadow-sm transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded">At Risk Student</span>
              </div>
              <p className="text-sm font-bold text-slate-800 mt-3">Lucas Brown</p>
              <p className="text-xs text-slate-600 mt-1">Has not logged a meeting in 3 weeks.</p>
              <button onClick={() => navigate('/supervisor/students/25001003')} className="mt-4 w-full bg-white border border-rose-200 text-rose-800 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-rose-100 hover:text-rose-900 transition-colors flex items-center justify-center">
                Check Student Progress <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}