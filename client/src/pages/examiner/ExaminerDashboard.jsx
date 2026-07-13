import { useNavigate } from "react-router-dom";
import { ClipboardCheck, CalendarClock, CheckCircle, FileText, MapPin, Video } from "lucide-react";

export default function ExaminerDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: "Pending Reports", value: "5", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Upcoming Vivas", value: "3", icon: CalendarClock, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Completed", value: "12", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assessment Dashboard</h1>
          <p className="text-slate-500 mt-1">Review assigned reports and submit your grading.</p>
        </div>
        <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors flex items-center">
          <ClipboardCheck className="h-4 w-4 mr-2 text-slate-500" />
          Download All Pending
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Reports Pending Evaluation */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Pending Evaluations</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100">
                  <th className="p-4 pl-5">Project Details</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 pl-5">
                    <p className="font-bold text-slate-800 max-w-[200px] truncate mb-1">Healthcare AI Diagnosis</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                      Final Report
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">Lee Earn Hui</p>
                    <p className="text-xs text-slate-500">Sup: Dr. Alan</p>
                  </td>
                  <td className="p-4 text-rose-600 font-semibold text-xs">Tomorrow</td>
                  <td className="p-4 text-right pr-5">
                    <button 
                      onClick={() => navigate('/examiner/evaluations')}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                    >
                      Grade Now
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 pl-5">
                    <p className="font-bold text-slate-800 max-w-[200px] truncate mb-1">Blockchain Voting System</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                      SRD Document
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">Ahmad bin Yusuf</p>
                    <p className="text-xs text-slate-500">Sup: Dr. Siti</p>
                  </td>
                  <td className="p-4 text-slate-600 text-xs font-medium">20 Aug 2026</td>
                  <td className="p-4 text-right pr-5">
                    <button 
                      onClick={() => navigate('/examiner/evaluations')}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                    >
                      Start Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Viva Voce Schedule */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">Upcoming Vivas</h3>
          
          <div className="space-y-4">
            {/* Schedule Item 1 */}
            <div className="flex border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-purple-50 p-3 flex flex-col items-center justify-center border-r border-purple-100 min-w-[70px]">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Aug</span>
                <span className="text-2xl font-black text-purple-700 leading-none mt-1">18</span>
              </div>
              <div className="p-3 flex-1 bg-white">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-slate-800">Grace Wong</h4>
                  <span className="text-[11px] font-semibold text-slate-500">10:00 AM</span>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">IoT Smart Agriculture</p>
                <p className="text-xs text-slate-400 mt-2 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-slate-400" /> Lab 3, Block C
                </p>
              </div>
            </div>

            {/* Schedule Item 2 */}
            <div className="flex border border-slate-200 rounded-xl overflow-hidden opacity-75 hover:opacity-100 hover:shadow-md transition-all cursor-pointer">
              <div className="bg-slate-50 p-3 flex flex-col items-center justify-center border-r border-slate-200 min-w-[70px]">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Aug</span>
                <span className="text-2xl font-black text-slate-700 leading-none mt-1">20</span>
              </div>
              <div className="p-3 flex-1 bg-white">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-slate-800">Lee Earn Hui</h4>
                  <span className="text-[11px] font-semibold text-slate-500">2:30 PM</span>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">Healthcare AI</p>
                <p className="text-xs text-indigo-500 font-medium mt-2 flex items-center">
                  <Video className="w-3 h-3 mr-1" /> MS Teams Link
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}