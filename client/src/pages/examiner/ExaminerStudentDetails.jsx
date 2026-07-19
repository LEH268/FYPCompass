// src/pages/examiner/ExaminerStudentDetails.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, FileText, Download, FileSignature, MessageSquare, Loader2, Check, History, Users } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ExaminerStudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { students, submissions, consultations } = useData();
  const [downloadState, setDownloadState] = useState("idle");

  const student = students.find(s => s.id === id);
  const studentSubmissions = submissions.filter(sub => sub.studentId === id).sort((a,b) => b.id - a.id);
  const studentConsultations = consultations.filter(c => c.studentId === id).sort((a,b) => new Date(b.date) - new Date(a.date));

  const handleDownload = () => {
    setDownloadState("downloading");
    setTimeout(() => setDownloadState("done"), 1500);
    setTimeout(() => setDownloadState("idle"), 4000);
  };

  if (!student) {
    return (
      <div className="p-8 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800">Candidate Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Candidate Dossier: {student.name}</h1>
            <p className="text-slate-500 text-sm mt-1">Complete academic audit, files, and supervisor history.</p>
          </div>
        </div>
        
        {student.progress === 100 && student.status !== "Graded" && (
          <button onClick={() => navigate(`/examiner/evaluations/${id}`)} className="flex items-center px-6 py-2.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 shadow-md transition-all active:scale-95">
            <FileSignature className="w-4 h-4 mr-2" /> Grade Candidate
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center h-fit">
            <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
              <User className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
            <p className="text-sm text-slate-500 mb-4">ID: {student.id}</p>
            
            <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Supervisor</p>
              <p className="text-sm font-semibold text-slate-700 mb-3">{student.supervisorName}</p>
              
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project Title</p>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed mb-3">{student.topic}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-200">
                 <div className="flex justify-between text-xs font-bold mb-1.5">
                   <span className="text-slate-600">Completion Status</span>
                   <span className={student.progress === 100 ? 'text-emerald-600' : 'text-purple-600'}>{student.progress}%</span>
                 </div>
                 <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                   <div className={`h-full rounded-full transition-all duration-1000 ${student.progress === 100 ? 'bg-emerald-500' : 'bg-purple-500'}`} style={{ width: `${student.progress}%` }}></div>
                 </div>
              </div>

              {student.finalScore && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Examiner Final Score</p>
                  <p className="text-2xl font-black text-emerald-600">{student.finalScore} / 100</p>
                </div>
              )}
            </div>
          </div>

          {/* Added Supervision History for Examiner */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 flex items-center mb-4"><History className="w-5 h-5 mr-2 text-purple-600"/> Supervision History</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {studentConsultations.length === 0 ? (
                <p className="text-sm text-slate-500 text-center font-medium">No consultations logged.</p>
              ) : studentConsultations.map(c => (
                <div key={c.id} className="border-l-2 border-purple-200 pl-4 py-1">
                  <p className="text-xs font-bold text-slate-400">{c.date} | {c.time}</p>
                  <p className="text-sm font-bold text-slate-700">{c.topic}</p>
                  <p className="text-xs text-slate-600 italic mt-1 line-clamp-2">"{c.summary}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {student.finalFeedback && (
            <div className="bg-purple-50 rounded-2xl shadow-sm border border-purple-200 p-6">
              <h3 className="text-lg font-bold text-purple-800 flex items-center mb-2"><Check className="w-5 h-5 mr-2"/> Your Final Feedback</h3>
              <p className="text-sm text-purple-900 leading-relaxed font-medium">"{student.finalFeedback}"</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">All Submitted Deliverables</h3>
            </div>
            <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
              {studentSubmissions.length === 0 ? (
                <div className="text-center text-slate-500 py-6 font-medium">No deliverables uploaded by this candidate yet.</div>
              ) : studentSubmissions.map((sub) => (
                <div key={sub.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-5 bg-white flex justify-between items-start border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><FileText className="w-6 h-6" /></div>
                      <div>
                        <h4 className="font-bold text-slate-800">{sub.file}</h4>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Milestone: {sub.milestone}</p>
                        {sub.studentMessage && (
                           <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded border border-slate-100 italic">Student Note: "{sub.studentMessage}"</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      disabled={downloadState !== "idle"}
                      className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center transition-colors shadow-sm ${
                        downloadState === "done" ? "bg-emerald-100 text-emerald-700" : "bg-white border border-slate-300 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      {downloadState === "idle" && <><Download className="w-3 h-3 mr-2" /> Download</>}
                      {downloadState === "downloading" && <><Loader2 className="w-3 h-3 mr-2 animate-spin" /> Loading</>}
                      {downloadState === "done" && <><Check className="w-3 h-3 mr-2" /> Done</>}
                    </button>
                  </div>
                  
                  {sub.feedback && (
                    <div className="p-5 bg-indigo-50/50 flex items-start gap-3">
                      <Users className="w-5 h-5 text-indigo-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-indigo-800 mb-1">Supervisor's Feedback ({student.supervisorName}):</p>
                        <p className="text-sm text-slate-700 font-medium">"{sub.feedback}"</p>
                      </div>
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