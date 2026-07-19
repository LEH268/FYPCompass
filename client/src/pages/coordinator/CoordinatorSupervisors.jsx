// src/pages/coordinator/CoordinatorSupervisors.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, BookOpen } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorSupervisors() {
  const navigate = useNavigate();
  const { faculty } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  // Fix: Add optional chaining to prevent undefined crashes (White Screen fix)
  const filteredFaculty = faculty.filter(fac => 
    fac.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    fac.expertise?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Directory</h1>
          <p className="text-slate-500 mt-1">Manage supervisors and view their workloads.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search name or expertise..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm" 
          />
        </div>
      </div>

      {/* Coordinator Academic Banner */}
      <div className="relative w-full h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center">
          <BookOpen className="h-8 w-8 text-emerald-400 mb-3 animate-pulse" />
          <h2 className="text-white text-xl md:text-2xl font-bold max-w-lg leading-tight drop-shadow-md">
            "Managing progress, shaping success."
          </h2>
          <p className="text-emerald-100 text-sm mt-2 max-w-md drop-shadow-sm">
            Monitor projects, coordinate evaluations, and ensure smooth FYP operations.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Supervisor / ID</th>
              <th className="p-4">Expertise Area</th>
              <th className="p-4">Current Workload</th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {filteredFaculty.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">No faculty members found.</td>
              </tr>
            ) : filteredFaculty.map(fac => (
              <tr key={fac.id} onClick={() => navigate(`/coordinator/supervisors/${fac.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{fac.name}</div>
                  <div className="text-xs text-slate-500">{fac.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium">{fac.expertise}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md ${fac.currentLoad >= fac.maxLoad ? 'bg-rose-100 text-rose-700' : fac.currentLoad >= fac.maxLoad - 2 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {fac.currentLoad} / {fac.maxLoad} Students
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right pr-5">
                  <button className="text-indigo-600 font-bold hover:underline text-xs flex items-center justify-end w-full">
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