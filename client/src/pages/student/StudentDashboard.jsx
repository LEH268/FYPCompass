// src/pages/student/StudentDashboard.jsx
import { useNavigate } from "react-router-dom";
import { ChevronRight, CalendarCheck, FileText, CheckCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { students, submissions, consultations } = useData();
  
  // Mock logged-in student: Oliver Smith
  const myData = students.find(s => s.id === "25001001");
  const mySubmissions = submissions.filter(sub => sub.studentId === "25001001").sort((a,b) => b.id - a.id);
  const myConsultations = consultations.filter(c => c.studentId === "25001001");

  const recentFeedback = mySubmissions.find(sub => sub.feedback !== null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, {myData.name.split(' ')[0]}!</h1>
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
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 mb-3">
              Phase: {myData.stage}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{myData.topic}</h2>
            <p className="text-sm text-slate-500">Supervised by <span className="font-semibold text-indigo-600">{myData.supervisorName}</span></p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-bold mb-2">
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
            <h3 className="text-lg font-bold text-slate-800">Recent Deliverables</h3>
            <button onClick={() => navigate('/student/proposal')} className="text-sm text-indigo-600 font-medium hover:underline transition-colors">
              Submit New File
            </button>
          </div>
          <div className="space-y-4">
            {mySubmissions.slice(0, 2).map(sub => (
              <div key={sub.id} onClick={() => navigate('/student/proposal')} className="flex p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:shadow-sm transition-all group cursor-pointer">
                <div className={`h-12 w-12 rounded-lg bg-white border flex flex-col items-center justify-center flex-shrink-0 transition-colors ${sub.status === 'Approved' ? 'border-emerald-200 text-emerald-600' : 'border-amber-200 text-amber-600'}`}>
                  {sub.status === 'Approved' ? <CheckCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{sub.milestone}</h4>
                  <p className="text-xs text-slate-500 mt-1">File: {sub.file}</p>
                </div>
                <div className="ml-4 flex flex-col items-end justify-center">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md ${sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Latest Feedback</h3>
          <div className="space-y-5 flex-1">
            {recentFeedback ? (
              <div className="relative pl-4 border-l-2 border-indigo-300">
                <div className="absolute w-2 h-2 bg-indigo-600 rounded-full -left-[5px] top-1.5"></div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">From {myData.supervisorName}</p>
                <h4 className="text-sm font-semibold text-slate-800">{recentFeedback.milestone}</h4>
                <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                  "{recentFeedback.feedback}"
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No feedback received yet.</p>
            )}
          </div>
          <button onClick={() => navigate('/student/consultations')} className="w-full mt-6 py-2 flex items-center justify-center text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            {myConsultations.length} Consultations Logged <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}