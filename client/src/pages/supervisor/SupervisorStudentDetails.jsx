import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Calendar, FileText, CheckCircle, Clock, CircleDashed } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorStudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { students, submissions } = useData();
  
  const student = students.find(s => s.id === id);
  const studentSubmissions = submissions.filter(sub => sub.studentId === id);

  if (!student) {
    return (
      <div className="p-8 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800">Student Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate('/supervisor/students')} className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Student Profile Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Review student details, past deliverables, and feedback.</p>
          </div>
        </div>
        <button onClick={() => navigate('/supervisor/consultations')} className="flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 shadow-sm transition-colors">
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
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${student.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Submissions & Feedback History</h3>
            </div>
            <div className="p-6 space-y-6">
              {studentSubmissions.length === 0 ? (
                <div className="text-center text-slate-500 py-6">No submissions found for this student.</div>
              ) : studentSubmissions.map((sub) => (
                <div key={sub.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all">
                  <div className="p-5 bg-white flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${sub.status === 'Pending Review' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-md font-bold text-slate-800">{sub.file}</h4>
                        <p className="text-xs text-slate-500 mb-1">{sub.milestone}</p>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sub.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  {sub.feedback && (
                    <div className="p-5 bg-slate-50 flex items-start gap-3">
                      <div>
                        <p className="text-xs font-bold text-indigo-800 mb-1">Your Feedback:</p>
                        <p className="text-sm text-slate-700 italic leading-relaxed">"{sub.feedback}"</p>
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