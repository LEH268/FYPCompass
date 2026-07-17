import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserCog, Users } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorSupervisorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { faculty, students } = useData();
  const supervisor = faculty.find(f => f.id === id);
  const supervisees = students.filter(s => s.supervisorId === id);

  if (!supervisor) {
    return (
      <div className="p-8 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800">Faculty Member Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  const capacityPercentage = (supervisor.currentLoad / supervisor.maxLoad) * 100;
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Member Details</h1>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center text-center md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <UserCog className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{supervisor.name}</h2>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2">ID: {supervisor.id}</span>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Expertise</p>
            <p className="text-sm font-semibold text-slate-700">{supervisor.expertise}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Workload</p>
            <div className="w-full bg-slate-100 rounded-full h-3 mt-1">
              <div className={`h-3 rounded-full transition-all ${capacityPercentage >= 100 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(capacityPercentage, 100)}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">{supervisor.currentLoad} out of {supervisor.maxLoad} max students</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <Users className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="font-bold text-slate-800">Assigned Supervisees ({supervisees.length})</h3>
        </div>
        <div className="p-4 space-y-3">
          {supervisees.length === 0 ? (
            <div className="p-4 text-center text-slate-500">No students currently assigned.</div>
          ) : supervisees.map(s => (
             <div key={s.id} onClick={() => navigate(`/coordinator/students/${s.id}`)} className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-all cursor-pointer flex justify-between items-center bg-white">
                <div>
                  <p className="text-sm font-bold text-slate-800">{s.name} ({s.id})</p>
                  <p className="text-xs text-slate-500 mt-1">{s.topic}</p>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${s.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {s.status}
                </span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}