// src/pages/coordinator/CoordinatorSupervisors.jsx
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorSupervisors() {
  const navigate = useNavigate();
  const { faculty } = useData();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Directory</h1>
          <p className="text-slate-500 mt-1">Manage supervisors and view their workloads.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search faculty..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full outline-none focus:ring-2 focus:ring-indigo-600" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Supervisor / ID</th>
              <th className="p-4">Expertise</th>
              <th className="p-4">Workload</th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {faculty.map(fac => (
              <tr key={fac.id} onClick={() => navigate(`/coordinator/supervisors/${fac.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600">{fac.name}</div>
                  <div className="text-xs text-slate-500">{fac.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium">{fac.expertise}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${fac.currentLoad >= fac.maxLoad ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {fac.currentLoad} / {fac.maxLoad} Students
                  </span>
                </td>
                <td className="p-4 text-right pr-5">
                  <button className="text-indigo-600 font-semibold hover:underline text-xs flex items-center justify-end w-full">
                    View Profile <ChevronRight className="w-4 h-4 ml-1"/>
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