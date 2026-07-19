// src/pages/examiner/ExaminerDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, CalendarClock, CheckCircle, FileText, Loader2, Award, BookOpen, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ExaminerDashboard() {
  const navigate = useNavigate();
  const { students } = useData();
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock logged-in Examiner: Prof. John Smith
  const myAssignedStudents = students.filter(s => s.examinerName === "Prof. John Smith");
  
  // Pending Reports: Only students with 100% progress who haven't been graded yet
  const pendingReports = myAssignedStudents.filter(s => s.progress === 100 && s.status !== "Graded");
  const inProgressStudents = myAssignedStudents.filter(s => s.progress < 100 && s.status !== "Graded");
  const completedReports = myAssignedStudents.filter(s => s.status === "Graded");

  const stats = [
    { title: "Ready for Grading", value: pendingReports.length, icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Still in Progress", value: inProgressStudents.length, icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Completed", value: completedReports.length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const handleDownloadAll = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("All pending reports downloaded successfully.");
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assessment Dashboard</h1>
          <p className="text-slate-500 mt-1">Review assigned projects and submit your final evaluations.</p>
        </div>
        <button onClick={handleDownloadAll} disabled={isDownloading || pendingReports.length === 0} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
          {isDownloading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin text-purple-600" /> Archiving Files...</>
          ) : (
            <><ClipboardCheck className="h-4 w-4 mr-2 text-slate-500" /> Download Ready Reports</>
          )}
        </button>
      </div>
      
      {/* Examiner Academic Banner */}
      <div className="relative w-full h-32 md:h-40 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-purple-900/60 to-transparent"></div>
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center">
          <BookOpen className="h-8 w-8 text-purple-300 mb-2 animate-pulse" />
          <h2 className="text-white text-lg md:text-xl font-bold max-w-lg leading-tight drop-shadow-md">
            "Fair evaluation builds academic excellence."
          </h2>
          <p className="text-purple-100 text-xs md:text-sm mt-1 max-w-md drop-shadow-sm">
            Grade candidates only when their milestones reach 100%.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} onClick={() => navigate('/examiner/students')} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium group-hover:text-purple-600 transition-colors">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-amber-50/30">
          <h3 className="text-lg font-bold text-amber-800">Ready for Evaluation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
                <th className="p-4 pl-5">Project Details</th>
                <th className="p-4">Student</th>
                <th className="p-4 text-right pr-5">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {pendingReports.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-slate-500 font-medium">No candidates are fully ready for evaluation yet.</td>
                </tr>
              ) : pendingReports.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => navigate(`/examiner/students/${student.id}`)}>
                  <td className="p-4 pl-5">
                    <p className="font-bold text-slate-800 max-w-[200px] truncate mb-1 group-hover:text-purple-700">{student.topic}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">100% Completed</span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{student.name}</p>
                    <p className="text-xs text-slate-500">Sup: {student.supervisorName}</p>
                  </td>
                  <td className="p-4 text-right pr-5">
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/examiner/evaluations/${student.id}`); }} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm w-full">
                      Grade Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-emerald-50/30">
          <h3 className="text-lg font-bold text-emerald-800">Completed Evaluations ({completedReports.length})</h3>
        </div>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow-sm z-10">
              <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
                <th className="p-4 pl-5">Candidate</th>
                <th className="p-4">Final Score</th>
                <th className="p-4 w-1/2">Examiner Feedback</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {completedReports.map((student) => (
                <tr key={student.id} onClick={() => navigate(`/examiner/students/${student.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800 group-hover:text-purple-600">{student.name}</div>
                    <div className="text-xs text-slate-500 max-w-[180px] truncate">{student.topic}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center font-black text-emerald-600 text-lg">
                      <Award className="w-5 h-5 mr-1 text-emerald-500" /> {student.finalScore}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-slate-600 italic line-clamp-2">"{student.finalFeedback}"</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}