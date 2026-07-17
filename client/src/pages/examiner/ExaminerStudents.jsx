import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ExaminerStudents() {
  const navigate = useNavigate();
  const { students } = useData();

  // Mock logged-in Examiner: Prof. John Smith
  const myAssignedStudents = students.filter(s => s.examinerName === "Prof. John Smith");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assigned Candidates</h1>
          <p className="text-slate-500 mt-1">Select a student to review their complete file before grading.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Candidate</th>
              <th className="p-4">Project Topic</th>
              <th className="p-4">Assessment Type</th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {myAssignedStudents.length === 0 ? (
               <tr>
                 <td colSpan="4" className="p-8 text-center text-slate-500">No candidates assigned.</td>
               </tr>
            ) : myAssignedStudents.map(s => (
              <tr key={s.id} onClick={() => navigate(`/examiner/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-purple-600">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium">{s.topic}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-amber-100 text-amber-700">Pending Evaluation</span>
                </td>
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
    </div>
  );
}