// src/pages/coordinator/CoordinatorStudents.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronRight } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorStudents() {
  const navigate = useNavigate();
  const { students } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Complete Student Directory</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage and view profiles of all FYP students.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search student name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none w-full sm:w-64 shadow-sm" 
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-bold transition-colors shadow-sm">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100 bg-slate-50">
              <th className="p-4 pl-5">Student / ID</th>
              <th className="p-4">Project Topic</th>
              <th className="p-4">Supervisor</th>
              <th className="p-4">Progress & Stage</th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
               <tr>
                 <td colSpan="5" className="p-8 text-center text-slate-500 font-bold">No students found matching your search.</td>
               </tr>
            ) : filteredStudents.map(s => (
              <tr key={s.id} onClick={() => navigate(`/coordinator/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <td className="p-4 pl-5">
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{s.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{s.id}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium max-w-[200px] truncate">{s.topic}</td>
                <td className="p-4 text-slate-600 text-xs font-bold">
                  <span className={s.supervisorName === 'Unassigned' ? 'text-rose-600 bg-rose-100 px-2 py-1 rounded' : ''}>
                    {s.supervisorName}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-0.5 w-fit text-[10px] font-bold uppercase tracking-wider rounded ${s.stage === 'Completed' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                      {s.stage}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-200 rounded-full h-1.5 w-24 overflow-hidden">
                         <div className={`h-full rounded-full transition-all ${s.progress === 100 ? 'bg-purple-500' : 'bg-indigo-500'}`} style={{ width: `${s.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{s.progress}%</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right pr-5">
                  <button className="text-indigo-600 font-bold hover:underline text-xs flex items-center justify-end w-full">
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