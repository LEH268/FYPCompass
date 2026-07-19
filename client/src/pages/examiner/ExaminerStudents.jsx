// src/pages/examiner/ExaminerStudents.jsx
import { useNavigate } from "react-router-dom";
import { ChevronRight, Award, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ExaminerStudents() {
  const navigate = useNavigate();
  const { students } = useData();

  // Mock logged-in Examiner: Prof. John Smith
  const myAssignedStudents = students.filter(s => s.examinerName === "Prof. John Smith");
  
  // Pending students: ONLY those who have 100% progress (All deliverables submitted & approved) but not yet graded
  const readyToGrade = myAssignedStudents.filter(s => s.progress === 100 && s.status !== "Graded");
  const notReady = myAssignedStudents.filter(s => s.progress < 100 && s.status !== "Graded");
  
  const completedReports = myAssignedStudents.filter(s => s.status === "Graded");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assigned Candidates</h1>
          <p className="text-slate-500 mt-1">Candidates must complete 100% of milestones before grading is unlocked.</p>
        </div>
      </div>
      
      {/* Ready for Grading */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 bg-amber-50/50">
          <h3 className="font-bold text-amber-800">Ready for Evaluation ({readyToGrade.length})</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Candidate</th>
              <th className="p-4">Project Topic</th>
              <th className="p-4">Supervisor</th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {readyToGrade.length === 0 ? (
               <tr>
                 <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">No candidates are fully ready for evaluation yet.</td>
               </tr>
            ) : readyToGrade.map(s => (
              <tr key={s.id} onClick={() => navigate(`/examiner/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-purple-600">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium max-w-[250px] truncate">{s.topic}</td>
                <td className="p-4 text-slate-500 text-xs font-semibold">{s.supervisorName}</td>
                <td className="p-4 text-right pr-5">
                  <button className="text-white bg-purple-600 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-700 text-xs flex items-center justify-center w-full shadow-sm">
                    Grade Now <ChevronRight className="w-4 h-4 ml-1"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Still in Progress (Not ready) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 opacity-70">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <AlertCircle className="w-4 h-4 text-slate-500 mr-2" />
          <h3 className="font-bold text-slate-600">Project In Progress (Not Ready) ({notReady.length})</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Candidate</th>
              <th className="p-4">Project Topic</th>
              <th className="p-4">Progress Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {notReady.length === 0 ? (
               <tr>
                 <td colSpan="3" className="p-8 text-center text-slate-500 font-medium">All assigned candidates have finished their projects.</td>
               </tr>
            ) : notReady.map(s => (
              <tr key={s.id} className="bg-slate-50">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-500">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.id}</div>
                </td>
                <td className="p-4 text-slate-500 font-medium max-w-[250px] truncate">{s.topic}</td>
                <td className="p-4">
                  <span className="text-xs font-bold text-indigo-600">{s.progress}%</span>
                  <div className="w-32 bg-slate-200 rounded-full h-1.5 mt-1">
                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: `${s.progress}%` }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-emerald-50/50">
          <h3 className="font-bold text-emerald-800">Completed Evaluations ({completedReports.length})</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Candidate</th>
              <th className="p-4">Project Topic</th>
              <th className="p-4">Final Score</th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {completedReports.map(s => (
              <tr key={s.id} onClick={() => navigate(`/examiner/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-purple-600">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium max-w-[250px] truncate">{s.topic}</td>
                <td className="p-4">
                  <div className="flex items-center font-black text-emerald-600 text-sm">
                    <Award className="w-4 h-4 mr-1 text-emerald-500" /> {s.finalScore}
                  </div>
                </td>
                <td className="p-4 text-right pr-5">
                  <button className="text-purple-600 font-bold hover:underline text-xs flex items-center justify-end w-full">
                    View Record <ChevronRight className="w-4 h-4 ml-1"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}