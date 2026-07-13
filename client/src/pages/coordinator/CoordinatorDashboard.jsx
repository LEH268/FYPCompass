import { useNavigate } from "react-router-dom";
import { Users, UserCog, AlertTriangle, ShieldAlert } from "lucide-react";

export default function CoordinatorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Overview</h1>
          <p className="text-slate-500 mt-1">
            Semester: <span className="font-semibold text-slate-700">Aug 2026</span> | Program: <span className="font-semibold text-slate-700">BSc Computer Science</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors">
            Export Report
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-emerald-700 transition-colors active:scale-95">
            Broadcast Message
          </button>
        </div>
      </div>

      {/* Global Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 w-16 h-16 bg-blue-50/50 rounded-bl-full flex justify-end p-3">
            <Users className="h-6 w-6 text-blue-500 opacity-50" />
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-slate-800">248</h3>
          <p className="text-xs text-emerald-600 mt-2 font-semibold">+12 from last sem</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 w-16 h-16 bg-indigo-50/50 rounded-bl-full flex justify-end p-3">
            <UserCog className="h-6 w-6 text-indigo-500 opacity-50" />
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Active Supervisors</p>
          <h3 className="text-3xl font-black text-slate-800">45</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">Avg load: 5.5 / sup</p>
        </div>

        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute right-0 top-0 w-16 h-16 bg-rose-100/50 rounded-bl-full flex justify-end p-3">
            <AlertTriangle className="h-6 w-6 text-rose-500 opacity-50" />
          </div>
          <p className="text-sm text-rose-700 font-medium mb-1">Unassigned Projects</p>
          <h3 className="text-3xl font-black text-rose-700">12</h3>
          <button 
            onClick={() => navigate('/coordinator/assignment')} // Routing to Assignment
            className="text-xs text-rose-600 mt-2 font-bold underline hover:text-rose-800 transition-colors"
          >
            Action required
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Cohort Progress Tracking */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Cohort Tracking</h3>
            <select className="text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 outline-none focus:border-emerald-500 cursor-pointer">
              <option>All Status</option>
              <option>On Track</option>
              <option>At Risk</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100">
                  <th className="p-4 pl-5">Student / ID</th>
                  <th className="p-4">Phase</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4 text-center pr-5">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800">John Doe</div>
                    <div className="text-xs text-slate-500">23011223</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">Topic Selection</td>
                  <td className="p-4">
                    <div className="w-full bg-slate-100 rounded-full h-2 max-w-[120px]">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </td>
                  <td className="p-4 text-center pr-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wide">
                      At Risk
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800">Lee Earn Hui</div>
                    <div className="text-xs text-slate-500">25008442</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">Proposal Review</td>
                  <td className="p-4">
                    <div className="w-full bg-slate-100 rounded-full h-2 max-w-[120px]">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </td>
                  <td className="p-4 text-center pr-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                      On Track
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-5 pb-4 border-b border-slate-100">
            <ShieldAlert className="h-5 w-5 text-slate-700 mr-2" />
            <h3 className="text-lg font-bold text-slate-800">System Alerts</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl transition-all hover:shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-800">Missing Submissions</p>
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                15 students missed the Title Declaration deadline.
              </p>
              <button className="text-xs text-rose-700 font-bold mt-2 hover:underline">View List &rarr;</button>
            </div>
            
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl transition-all hover:shadow-sm">
              <p className="text-sm font-bold text-slate-800">Low Consultation Rate</p>
              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                8 students have 0 logged consultations in the past 4 weeks.
              </p>
              <button className="text-xs text-amber-700 font-bold mt-2 hover:underline">Notify Supervisors &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}