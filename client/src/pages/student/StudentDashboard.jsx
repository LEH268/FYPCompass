import { useNavigate } from "react-router-dom";
import { ChevronRight, CalendarCheck, FileText } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { students } = useData();
  
  // Find the mocked student's own data
  const myData = students.find(s => s.id === "25001001");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, {myData.name.split(' ')[0]}! </h1>
          <p className="text-slate-500 mt-1">Here is the latest progress on your Final Year Project.</p>
        </div>
        <button onClick={() => navigate('/student/consultations')} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-sm transition-transform active:scale-95 flex items-center">
          <CalendarCheck className="w-4 h-4 mr-2" />
          Book Consultation
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-3">
              Active Project
            </span>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{myData.topic}</h2>
            <p className="text-sm text-slate-500">Supervised by {myData.supervisorName}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-slate-700">Overall Progress</span>
            <span className="text-indigo-600">{myData.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${myData.progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Upcoming Milestones</h3>
            <button onClick={() => navigate('/student/milestones')} className="text-sm text-indigo-600 font-medium hover:underline transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <div onClick={() => navigate('/student/proposal')} className="flex p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:border-blue-300 hover:shadow-sm transition-all group cursor-pointer">
              <div className="h-12 w-12 rounded-lg bg-white border border-blue-200 flex flex-col items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileText className="h-5 w-5" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">System Design Specification (SDS)</h4>
                <p className="text-xs text-slate-500 mt-1">Due soon. Click to submit deliverable.</p>
              </div>

            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-5 flex-1">
            <div className="relative pl-4 border-l-2 border-emerald-200">
              <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[5px] top-1.5"></div>
              <p className="text-xs font-medium text-slate-400 mb-1">Supervisor assigned</p>
              <h4 className="text-sm font-semibold text-slate-800">{myData.supervisorName}</h4>
            </div>
          </div>
          <button onClick={() => navigate('/student/consultations')} className="w-full mt-6 py-2 flex items-center justify-center text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            View Consultation Logs <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}