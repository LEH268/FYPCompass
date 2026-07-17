import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCog, AlertTriangle, ShieldAlert, Download, Send, X } from "lucide-react";

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const alertStudents = [
    { id: "25001001", name: "Oliver Smith" },
    { id: "25001002", name: "Emma Johnson" },
    { id: "25001006", name: "Ava Taylor" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Overview</h1>
          <p className="text-slate-500 mt-1">
            Semester: <span className="font-semibold text-slate-700">Aug 2026</span> | Program: <span className="font-semibold text-slate-700">BSc Computer Science</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setShowExportModal(true)} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </button>
          <button onClick={() => setShowBroadcastModal(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-emerald-700 transition-colors active:scale-95 flex items-center">
            <Send className="w-4 h-4 mr-2" /> Broadcast Message
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div onClick={() => navigate('/coordinator/students')} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-blue-50/50 rounded-bl-full flex justify-end p-3 group-hover:scale-110 transition-transform">
            <Users className="h-6 w-6 text-blue-500 opacity-80" />
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-slate-800">248</h3>
          <p className="text-xs text-emerald-600 mt-2 font-semibold">Click to view all</p>
        </div>
        
        <div onClick={() => navigate('/coordinator/supervisors')} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-indigo-50/50 rounded-bl-full flex justify-end p-3 group-hover:scale-110 transition-transform">
            <UserCog className="h-6 w-6 text-indigo-500 opacity-80" />
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Active Supervisors</p>
          <h3 className="text-3xl font-black text-slate-800">45</h3>
          <p className="text-xs text-indigo-600 mt-2 font-semibold">Click to view all</p>
        </div>

        <div onClick={() => navigate('/coordinator/assignment')} className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-rose-400 transition-all cursor-pointer group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-rose-100/50 rounded-bl-full flex justify-end p-3 group-hover:scale-110 transition-transform">
            <AlertTriangle className="h-6 w-6 text-rose-500 opacity-80" />
          </div>
          <p className="text-sm text-rose-700 font-medium mb-1">Unassigned Projects</p>
          <h3 className="text-3xl font-black text-rose-700">3</h3>
          <p className="text-xs text-rose-600 mt-2 font-bold underline">Action required</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Cohort Tracking</h3>
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
                <tr onClick={() => navigate('/coordinator/students/25001006')} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800 group-hover:text-indigo-600">Ava Taylor</div>
                    <div className="text-xs text-slate-500">25001006</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">Topic Selection</td>
                  <td className="p-4">
                    <div className="w-full bg-slate-100 rounded-full h-2 max-w-[120px]">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </td>
                  <td className="p-4 text-center pr-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wide">
                      At Risk
                    </span>
                  </td>
                </tr>
                <tr onClick={() => navigate('/coordinator/students/25001001')} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800 group-hover:text-indigo-600">Oliver Smith</div>
                    <div className="text-xs text-slate-500">25001001</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">Proposal Review</td>
                  <td className="p-4">
                    <div className="w-full bg-slate-100 rounded-full h-2 max-w-[120px]">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "35%" }}></div>
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

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-5 pb-4 border-b border-slate-100">
            <ShieldAlert className="h-5 w-5 text-slate-700 mr-2" />
            <h3 className="text-lg font-bold text-slate-800">System Alerts</h3>
          </div>
          
          <div className="space-y-4">
            <div onClick={() => setShowAlertModal(true)} className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl transition-all hover:shadow-sm cursor-pointer">
              <p className="text-sm font-bold text-slate-800">Missing Submissions</p>
              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                15 students missed the Title Declaration deadline.
              </p>
              <button className="text-xs text-rose-700 font-bold mt-2 hover:underline">View Detailed List &rarr;</button>
            </div>
            
            <div onClick={() => setShowAlertModal(true)} className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl transition-all hover:shadow-sm cursor-pointer">
              <p className="text-sm font-bold text-slate-800">Low Consultation Rate</p>
              <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                8 students have 0 logged consultations in the past 4 weeks.
              </p>
              <button className="text-xs text-amber-700 font-bold mt-2 hover:underline">View Detailed List &rarr;</button>
            </div>
          </div>
        </div>
      </div>

      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-in zoom-in-95 duration-200">
            <Download className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-800 mb-2">Export Complete</h2>
            <p className="text-sm text-slate-500 mb-6">Cohort_Report_Aug2026.csv has been successfully generated and downloaded.</p>
            <button onClick={() => setShowExportModal(false)} className="w-full px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors">Close</button>
          </div>
        </div>
      )}

      {showBroadcastModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Broadcast Message</h2>
              <button onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowBroadcastModal(false); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Target Audience</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm">
                    <option>All Students</option>
                    <option>All Supervisors</option>
                    <option>Everyone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                  <textarea rows="4" required placeholder="Type your announcement here..." className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">Send Broadcast</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAlertModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center"><ShieldAlert className="w-5 h-5 mr-2 text-rose-600"/> Alert Details</h2>
              <button onClick={() => setShowAlertModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {alertStudents.map((student, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center hover:border-indigo-200 transition-colors">
                  <span className="text-sm font-bold text-slate-700">{student.name} ({student.id})</span>
                  <button 
                    onClick={() => {
                      setShowAlertModal(false);
                      navigate(`/coordinator/students/${student.id}`);
                    }} 
                    className="text-xs text-indigo-600 hover:underline font-semibold"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}