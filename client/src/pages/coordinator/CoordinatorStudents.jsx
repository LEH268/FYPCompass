import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronRight } from "lucide-react";

export default function CoordinatorStudents() {
  const navigate = useNavigate();
  const students = [
    { id: "25008442", name: "Lee Earn Hui", topic: "AI Healthcare", supervisor: "Dr. Alan Turing", status: "On Track" },
    { id: "24127094", name: "Grace Wong", topic: "IoT Agriculture", supervisor: "Dr. Siti Aminah", status: "On Track" },
    { id: "23011223", name: "John Doe", topic: "N/A", supervisor: "Unassigned", status: "At Risk" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">All Students</h1>
          <p className="text-slate-500 mt-1">Manage and view profiles of all FYP students.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none w-full sm:w-64" />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-semibold transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Student / ID</th>
              <th className="p-4">Project Topic</th>
              <th className="p-4">Supervisor</th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {students.map(s => (
              <tr key={s.id} onClick={() => navigate(`/coordinator/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium">{s.topic}</td>
                <td className="p-4 text-slate-600 font-medium">{s.supervisor}</td>
                <td className="p-4 text-right pr-5">
                  <button className="text-indigo-600 font-semibold hover:underline text-xs flex items-center justify-end w-full">
                    View <ChevronRight className="w-4 h-4 ml-1"/>
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