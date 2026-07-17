import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserCog, Users } from "lucide-react";

export default function CoordinatorSupervisorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const supervisees = [
    { id: "25008442", name: "Lee Earn Hui", topic: "AI Healthcare", status: "On Track" },
    { id: "24127094", name: "Grace Wong", topic: "IoT Agriculture", status: "On Track" },
  ];

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
          <h2 className="text-xl font-bold text-slate-800">Dr. Alan Turing</h2>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2">ID: {id || 'F01'}</span>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Expertise</p>
            <p className="text-sm font-semibold text-slate-700">AI, Machine Learning, Data Science</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Workload</p>
            <div className="w-full bg-slate-100 rounded-full h-3 mt-1">
              <div className="bg-emerald-500 h-3 rounded-full" style={{ width: "62.5%" }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">5 out of 8 max students</p>
          </div>
        </div>
      </div>

      {/* Assigned Students List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <Users className="w-5 h-5 text-indigo-600 mr-2" />
          <h3 className="font-bold text-slate-800">Assigned Supervisees</h3>
        </div>
        <div className="p-4 space-y-3">
          {supervisees.map(s => (
             <div key={s.id} onClick={() => navigate(`/coordinator/students/${s.id}`)} className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-all cursor-pointer flex justify-between items-center bg-white">
                <div>
                  <p className="text-sm font-bold text-slate-800">{s.name} ({s.id})</p>
                  <p className="text-xs text-slate-500 mt-1">{s.topic}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">
                  {s.status}
                </span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}