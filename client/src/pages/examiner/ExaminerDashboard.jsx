import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, CalendarClock, CheckCircle, FileText, MapPin, Loader2 } from "lucide-react";

export default function ExaminerDashboard() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const stats = [
    { title: "Pending Reports", value: "5", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Upcoming Vivas", value: "3", icon: CalendarClock, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Completed", value: "12", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const pendingStudents = [
    { id: "25001001", name: "Oliver Smith", topic: "Healthcare AI Diagnosis", deadline: "Tomorrow", status: "Final Report", sup: "Dr. Alan" },
    { id: "25001002", name: "Emma Johnson", topic: "IoT Smart Agriculture", deadline: "2 days", status: "Final Report", sup: "Dr. Siti" },
    { id: "25001003", name: "Lucas Brown", topic: "Blockchain Verification", deadline: "3 days", status: "Final Report", sup: "Prof. John" },
    { id: "25001004", name: "Mia Davis", topic: "AR Campus Navigation", deadline: "4 days", status: "Final Report", sup: "Dr. Alan" },
    { id: "25001005", name: "Ethan Wilson", topic: "ML Predictive Maintenance", deadline: "1 week", status: "Final Report", sup: "Dr. Siti" }
  ];

  const upcomingVivas = [
    { id: "25001006", name: "Ava Taylor", topic: "Smart Traffic Management", date: "Aug 18", time: "10:00 AM", location: "Lab 3, Block C" },
    { id: "25001007", name: "Noah Miller", topic: "Cybersecurity Analyzer", date: "Aug 19", time: "2:00 PM", location: "Meeting Room A" },
    { id: "25001008", name: "Sophia Moore", topic: "Virtual Tour App", date: "Aug 20", time: "11:30 AM", location: "Lab 1, Block A" }
  ];

  const handleDownloadAll = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("All pending reports have been downloaded to your local drive.");
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assessment Dashboard</h1>
          <p className="text-slate-500 mt-1">Review assigned reports and submit your grading.</p>
        </div>
        <button onClick={handleDownloadAll} disabled={isDownloading} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
          {isDownloading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin text-purple-600" /> Archiving Files...</>
          ) : (
            <><ClipboardCheck className="h-4 w-4 mr-2 text-slate-500" /> Download All Pending</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} onClick={() => navigate('/examiner/students')} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium group-hover:text-purple-600 transition-colors">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Pending Evaluations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100">
                  <th className="p-4 pl-5">Project Details</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4 text-right pr-5">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {pendingStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => navigate(`/examiner/students/${student.id}`)}>
                    <td className="p-4 pl-5">
                      <p className="font-bold text-slate-800 max-w-[200px] truncate mb-1">{student.topic}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">{student.status}</span>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-500">Sup: {student.sup}</p>
                    </td>
                    <td className="p-4 text-rose-600 font-semibold text-xs">{student.deadline}</td>
                    <td className="p-4 text-right pr-5">
                      <button onClick={(e) => { e.stopPropagation(); navigate(`/examiner/evaluations/${student.id}`); }} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm w-full">
                        Grade Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">Upcoming Vivas</h3>
          <div className="space-y-4">
            {upcomingVivas.map((viva) => (
              <div key={viva.id} onClick={() => navigate(`/examiner/students/${viva.id}`)} className="flex border border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-purple-50 p-3 flex flex-col items-center justify-center border-r border-purple-100 min-w-[70px]">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">{viva.date.split(' ')[0]}</span>
                  <span className="text-2xl font-black text-purple-700 leading-none mt-1">{viva.date.split(' ')[1]}</span>
                </div>
                <div className="p-3 flex-1 bg-white">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-slate-800">{viva.name}</h4>
                    <span className="text-[11px] font-semibold text-slate-500">{viva.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate max-w-[150px]">{viva.topic}</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center"><MapPin className="w-3 h-3 mr-1 text-slate-400" /> {viva.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}