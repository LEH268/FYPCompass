import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, ChevronRight, FileText } from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const fypData = {
    title: "Automated Healthcare Diagnosis Using Deep Learning",
    supervisor: "Dr. Alan Turing",
    progress: 35,
    status: "On Track"
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, Earn Hui! </h1>
          <p className="text-slate-500 mt-1">Here is the latest progress on your Final Year Project.</p>
        </div>
        <button 
          onClick={() => navigate('/student/consultations')}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-sm transition-transform active:scale-95"
        >
          Book Consultation
        </button>
      </div>

      {/* Main Overview Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-3">
              Active Project
            </span>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{fypData.title}</h2>
            <p className="text-sm text-slate-500">Supervised by {fypData.supervisor}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-slate-700">Overall Progress</span>
            <span className="text-indigo-600">{fypData.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${fypData.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Milestones */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Upcoming Milestones</h3>
            <button 
              onClick={() => navigate('/student/milestones')}
              className="text-sm text-indigo-600 font-medium hover:underline transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Milestone 1 */}
            <div 
              onClick={() => navigate('/student/proposal')}
              className="flex p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:shadow-sm transition-all group cursor-pointer"
            >
              <div className="h-12 w-12 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 group-hover:border-indigo-300 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Aug</span>
                <span className="text-lg font-black text-indigo-600 leading-none">15</span>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Project Proposal</h4>
                <p className="text-xs text-slate-500 mt-1">Submit the final draft including literature review.</p>
              </div>
              <div className="ml-4 flex flex-col items-end justify-center">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-md">Pending</span>
              </div>
            </div>

            {/* Milestone 2 */}
            <div 
              onClick={() => navigate('/student/milestones')}
              className="flex p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:shadow-sm transition-all group cursor-pointer"
            >
              <div className="h-12 w-12 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 group-hover:border-indigo-300 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Sep</span>
                <span className="text-lg font-black text-slate-700 leading-none">02</span>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">System Design (SRD)</h4>
                <p className="text-xs text-slate-500 mt-1">Present your System Requirements Document.</p>
              </div>
              <div className="ml-4 flex flex-col items-end justify-center">
                <span className="px-2.5 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-md">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity / Action Needed */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Feedback</h3>
          
          <div className="space-y-5 flex-1">
            <div className="relative pl-4 border-l-2 border-indigo-200">
              <div className="absolute w-2 h-2 bg-indigo-600 rounded-full -left-[5px] top-1.5"></div>
              <p className="text-xs font-medium text-slate-400 mb-1">12 Aug 2026</p>
              <h4 className="text-sm font-semibold text-slate-800">Proposal Draft Review</h4>
              <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                "Good starting point. Please narrow down the scope of the ML model."
              </p>
            </div>
            <div className="relative pl-4 border-l-2 border-emerald-200">
              <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[5px] top-1.5"></div>
              <p className="text-xs font-medium text-slate-400 mb-1">05 July 2026</p>
              <h4 className="text-sm font-semibold text-slate-800">Topic Approved</h4>
              <p className="text-sm text-slate-600 mt-1">Your topic has been officially approved by the coordinator.</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/student/consultations')}
            className="w-full mt-6 py-2 flex items-center justify-center text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            View All Log <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}