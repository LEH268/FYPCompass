// src/pages/coordinator/CoordinatorSupervisorDetails.jsx
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserCog, Users } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorSupervisorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { faculty, students } = useData();

  // Find the specific supervisor by ID
  const supervisor = faculty.find(f => f.id === id);
  // Find all students assigned to this supervisor
  const supervisees = students.filter(s => s.supervisorId === id);

  // Fallback if supervisor is not found
  if (!supervisor) {
    return (
      <div className="p-8 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800">Faculty Member Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm active:scale-95">
          Go Back
        </button>
      </div>
    );
  }

  const capacityPercentage = (supervisor.currentLoad / supervisor.maxLoad) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Member Details</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Review workload and assigned students.</p>
        </div>
      </div>
      
      {/* Faculty Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center text-center md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 border-2 border-indigo-200 shadow-sm">
            <UserCog className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{supervisor.name}</h2>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2 tracking-wider">ID: {supervisor.id}</span>
        </div>
        
        <div className="flex-1 space-y-5 flex flex-col justify-center">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Area of Expertise</p>
            <p className="text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{supervisor.expertise}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Workload</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div className={`h-full rounded-full transition-all duration-1000 ${capacityPercentage >= 100 ? 'bg-rose-500' : capacityPercentage >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(capacityPercentage, 100)}%` }}></div>
              </div>
              <span className={`text-sm font-black flex-shrink-0 ${capacityPercentage >= 100 ? 'text-rose-600' : 'text-slate-700'}`}>
                {supervisor.currentLoad} / {supervisor.maxLoad}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Supervisees List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <Users className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="font-bold text-slate-800">Assigned Supervisees ({supervisees.length})</h3>
        </div>
        
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {supervisees.length === 0 ? (
            <div className="p-8 text-center text-slate-500 border border-dashed border-slate-300 rounded-xl font-bold bg-slate-50/50">
              No students currently assigned to this supervisor.
            </div>
          ) : supervisees.map(s => (
             <div 
                key={s.id} 
                onClick={() => navigate(`/coordinator/students/${s.id}`)} 
                className="p-5 border border-slate-200 rounded-xl hover:border-indigo-400 transition-all cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center bg-white shadow-sm hover:shadow-md gap-4"
             >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm font-bold text-slate-800">{s.name}</p>
                    <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded tracking-wider">ID: {s.id}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{s.topic}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded tracking-wider ${s.status === 'Graded' ? 'bg-purple-100 text-purple-700' : s.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {s.status}
                  </span>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">{s.stage} ({s.progress}%)</span>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}