// src/pages/examiner/ExaminerStudents.jsx
import { useNavigate } from "react-router-dom";
import { ChevronRight, Award } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ExaminerStudents() {
  const navigate = useNavigate();
  const { students } = useData();

  // Mock logged-in Examiner: Prof. John Smith
  const myAssignedStudents = students.filter(s => s.examinerName === "Prof. John Smith");
  const pendingReports = myAssignedStudents.filter(s => s.status !== "Graded" && s.stage !== "Completed");
  const completedReports = myAssignedStudents.filter(s => s.status === "Graded");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assigned Candidates</h1>
          <p className="text-slate-500 mt-1">Select a candidate to review their complete project dossier.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 bg-amber-50/30">
          <h3 className="font-bold text-slate-800">Pending Evaluations ({pendingReports.length})</h3>
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
            {pendingReports.length === 0 ? (
               <tr>
                 <td colSpan="4" className="p-8 text-center text-slate-500">No candidates pending evaluation.</td>
               </tr>
            ) : pendingReports.map(s => (
              <tr key={s.id} onClick={() => navigate(`/examiner/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-purple-600">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium max-w-[250px] truncate">{s.topic}</td>
                <td className="p-4 text-slate-500 text-xs">{s.supervisorName}</td>
                <td className="p-4 text-right pr-5">
                  <button className="text-purple-600 font-semibold hover:underline text-xs flex items-center justify-end w-full">
                    Open Profile <ChevronRight className="w-4 h-4 ml-1"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-emerald-50/30">
          <h3 className="font-bold text-slate-800">Completed Evaluations ({completedReports.length})</h3>
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
                  <button className="text-purple-600 font-semibold hover:underline text-xs flex items-center justify-end w-full">
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