// src/pages/supervisor/SupervisorStudentDetails.jsx
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Calendar, FileText, CheckCircle, Clock, MessageSquare, History } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorStudentDetails() {
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
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <button onClick={() => navigate('/supervisor/students')} className="p-2 mr-4 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Student Profile Overview</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Review {student.name}'s deliverables, messages, and consultation history.</p>
          </div>
        </div>
        <button onClick={() => navigate('/supervisor/consultations')} className="flex items-center px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-colors active:scale-95">
          <Calendar className="w-4 h-4 mr-2" /> Log Meeting
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2 tracking-wider">
                ID: {student.id}
              </span>
              <span className={`px-3 py-1 mt-3 text-xs font-bold rounded-full uppercase tracking-wider ${student.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : student.status === 'Graded' ? 'bg-purple-100 text-purple-700' : 'bg-rose-100 text-rose-700'}`}>
                {student.status}
              </span>
            </div>
            
            <div className="pt-6 space-y-3">
              <div className="pt-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Topic</p>
                <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                  {student.topic}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700">Overall Progress</span>
                  <span className="text-indigo-600">{student.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
                  <div className={`h-2.5 rounded-full transition-all duration-1000 ${student.status === 'At Risk' ? 'bg-rose-500' : student.progress === 100 ? 'bg-purple-500' : 'bg-indigo-600'}`} style={{ width: `${student.progress}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 text-right">Current Phase: <span className="font-bold text-slate-700">{student.stage}</span></p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 flex items-center mb-4"><History className="w-5 h-5 mr-2 text-indigo-600"/> Consultation Logs</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {studentConsultations.length === 0 ? (
                <p className="text-sm text-slate-500 text-center font-medium">No consultations logged yet.</p>
              ) : studentConsultations.map(c => (
                <div key={c.id} className="border-l-2 border-indigo-300 pl-4 py-1">
                  <p className="text-xs font-bold text-slate-400">{c.date} | {c.time}</p>
                  <p className="text-sm font-bold text-slate-700">{c.topic}</p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 italic">"{c.summary}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Submissions & Feedback History</h3>
            </div>
            <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
              {studentSubmissions.length === 0 ? (
                <div className="text-center text-slate-500 py-6 font-medium">No submissions found for this student.</div>
              ) : studentSubmissions.map((sub) => (
                <div key={sub.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all shadow-sm">
                  <div className="p-5 bg-white flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${sub.status === 'Pending Review' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-md font-bold text-slate-800">{sub.file}</h4>
                        <p className="text-xs text-slate-500 mb-1 font-medium">{sub.milestone} | Submitted: {sub.date}</p>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sub.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {sub.studentMessage && (
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student Note:</p>
                      <p className="text-sm text-slate-700 italic">"{sub.studentMessage}"</p>
                    </div>
                  )}
                  {sub.feedback && (
                    <div className="p-5 bg-indigo-50/30 flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">Your Feedback:</p>
                        <p className="text-sm text-indigo-900 font-medium">"{sub.feedback}"</p>
                      </div>
                    </div>
                  )}
                  {sub.status === 'Pending Review' && (
                    <div className="p-4 bg-amber-50/50 text-center">
                      <button onClick={() => navigate('/supervisor/feedback')} className="text-sm font-bold text-amber-700 hover:underline">
                        Evaluate This Submission &rarr;
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}