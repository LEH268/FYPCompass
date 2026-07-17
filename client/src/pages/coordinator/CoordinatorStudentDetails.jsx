// src/pages/coordinator/CoordinatorStudentDetails.jsx
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, CheckCircle, FileText, History, Award } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorStudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { students, submissions, consultations } = useData();
  
  const student = students.find(s => s.id === id);
  const studentSubmissions = submissions.filter(sub => sub.studentId === id).sort((a,b) => b.id - a.id);
  const studentConsultations = consultations.filter(c => c.studentId === id).sort((a,b) => new Date(b.date) - new Date(a.date));

  if (!student) {
    return (
      <div className="p-8 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800">Student Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Audit Trail</h1>
          <p className="text-slate-500 text-sm mt-1">Full oversight of milestones, feedback, and final scores.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2">ID: {student.id}</span>
            <span className={`mt-4 px-3 py-1 text-xs font-bold rounded-full uppercase ${student.status === 'Graded' ? 'bg-purple-100 text-purple-700' : student.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              Status: {student.status}
            </span>
            
            <div className="w-full text-left mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Supervisor</p>
                <p className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate(`/coordinator/supervisors/${student.supervisorId}`)}>{student.supervisorName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Examiner</p>
                <p className="text-sm font-semibold text-slate-700">{student.examinerName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project Topic</p>
                <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">{student.topic}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {student.finalScore && (
            <div className="bg-emerald-50 rounded-2xl shadow-sm border border-emerald-200 p-6 flex items-start gap-4">
              <Award className="w-10 h-10 text-emerald-600" />
              <div>
                <h3 className="text-lg font-bold text-emerald-800">Final Examiner Score: {student.finalScore} / 100</h3>
                <p className="text-sm text-emerald-700 mt-2 italic">"{student.finalFeedback}"</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-800">Submissions & Feedback Audit</h3>
            </div>
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              {studentSubmissions.length === 0 ? <p className="text-slate-500 text-sm">No submissions found.</p> : studentSubmissions.map((sub) => (
                <div key={sub.id} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 text-sm">{sub.milestone} ({sub.file})</h4>
                    <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{sub.status}</span>
                  </div>
                  {sub.studentMessage && <p className="text-xs text-slate-600 mb-2">Student Msg: "{sub.studentMessage}"</p>}
                  {sub.feedback && <p className="text-xs text-indigo-700 font-medium">Sup Feedback: "{sub.feedback}"</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center">
              <History className="w-5 h-5 mr-2 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-800">Consultation History ({studentConsultations.length})</h3>
            </div>
            <div className="p-6 space-y-3 max-h-[300px] overflow-y-auto">
              {studentConsultations.length === 0 ? <p className="text-slate-500 text-sm">No consultations logged.</p> : studentConsultations.map((c) => (
                <div key={c.id} className="border-l-2 border-indigo-300 pl-4 py-1">
                  <p className="text-xs font-bold text-slate-400">{c.date} - {c.time}</p>
                  <p className="text-sm font-semibold text-slate-800">{c.topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}