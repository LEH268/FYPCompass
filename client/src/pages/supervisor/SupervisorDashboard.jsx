import { Users, FileSignature, CalendarCheck, AlertCircle } from "lucide-react";

export default function SupervisorDashboard() {
  const stats = [
    { title: "Active Students", value: "8", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Pending Reviews", value: "3", icon: FileSignature, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Meetings This Week", value: "4", icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Supervisor Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your supervisees and track their progress.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
          Schedule Meeting
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mr-4`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Supervisees Progress Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Supervisees Progress</h3>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100">
                  <th className="p-4 pl-5">Student</th>
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800">Lee Earn Hui</div>
                    <div className="text-xs text-slate-500">25008442</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium max-w-[200px] truncate">
                    Automated Healthcare Diagnosis Using Deep Learning
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="mr-3 text-xs font-bold text-indigo-600 w-8">35%</span>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right pr-5">
                    <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">Review</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800">Grace Wong</div>
                    <div className="text-xs text-slate-500">24127094</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium max-w-[200px] truncate">
                    IoT Based Smart Agriculture System
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="mr-3 text-xs font-bold text-emerald-600 w-8">60%</span>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right pr-5">
                    <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-5 pb-4 border-b border-slate-100">
            <AlertCircle className="h-5 w-5 text-rose-500 mr-2" />
            <h3 className="text-lg font-bold text-slate-800">Needs Attention</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-amber-200 bg-amber-50/50 rounded-xl">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Document Review</span>
                <span className="text-xs font-medium text-amber-600">2 hrs ago</span>
              </div>
              <p className="text-sm font-bold text-slate-800 mt-1">Project Proposal Draft 2</p>
              <p className="text-xs text-slate-600 mt-0.5">Submitted by: Lee Earn Hui</p>
              <button className="mt-3 w-full bg-white border border-amber-200 text-amber-800 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-amber-100 transition-colors">
                View Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}