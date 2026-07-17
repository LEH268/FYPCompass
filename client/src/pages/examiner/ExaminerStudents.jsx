import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";

export default function ExaminerStudents() {
  const navigate = useNavigate();

  const students = [
    { id: "25001001", name: "Oliver Smith", topic: "Healthcare AI Diagnosis", type: "Final Report", status: "Pending" },
    { id: "25001002", name: "Emma Johnson", topic: "IoT Smart Agriculture", type: "Final Report", status: "Pending" },
    { id: "25001003", name: "Lucas Brown", topic: "Blockchain Verification", type: "Final Report", status: "Pending" },
    { id: "25001004", name: "Mia Davis", topic: "AR Campus Navigation", type: "Final Report", status: "Pending" },
    { id: "25001005", name: "Ethan Wilson", topic: "ML Predictive Maintenance", type: "Final Report", status: "Pending" },
    { id: "25001006", name: "Ava Taylor", topic: "Smart Traffic Management", type: "Viva Presentation", status: "Upcoming" },
    { id: "25001007", name: "Noah Miller", topic: "Cybersecurity Analyzer", type: "Viva Presentation", status: "Upcoming" },
    { id: "25001008", name: "Sophia Moore", topic: "Virtual Tour App", type: "Viva Presentation", status: "Upcoming" }
  ];

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
            {students.map(s => (
              <tr key={s.id} onClick={() => navigate(`/examiner/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-purple-600">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium">{s.topic}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${s.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{s.type}</span>
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