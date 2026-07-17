import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, ShieldAlert, CheckCircle, Clock } from "lucide-react";

export default function CoordinatorStudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Profile (Coordinator View)</h1>
          <p className="text-slate-500 text-sm mt-1">Full audit trail of the student's FYP journey.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center text-center md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Lee Earn Hui</h2>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2">ID: {id || '25008442'}</span>
          <span className="mt-4 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">Status: On Track</span>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Supervisor</p>
            <p className="text-sm font-semibold text-slate-700 cursor-pointer text-indigo-600 hover:underline" onClick={() => navigate('/coordinator/supervisors/F01')}>Dr. Alan Turing</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project Topic</p>
            <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">Automated Healthcare Diagnosis Using Deep Learning</p>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Milestone Progress</p>
            <div className="space-y-3">
              <div className="flex items-center text-sm font-medium text-slate-700"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2"/> Project Proposal Approved</div>
              <div className="flex items-center text-sm font-medium text-slate-700"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2"/> SRD Submitted</div>
              <div className="flex items-center text-sm font-medium text-slate-700"><Clock className="w-4 h-4 text-blue-500 mr-2"/> SDS Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}