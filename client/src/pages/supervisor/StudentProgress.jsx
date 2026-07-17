import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, AlertTriangle, Clock, ChevronRight } from "lucide-react";

export default function StudentProgress() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const students = [
    {
      id: "25001001",
      name: "Oliver Smith",
      topic: "Automated Healthcare Diagnosis Using Deep Learning",
      progress: 35,
      status: "On Track",
      currentMilestone: "System Design Specification (SDS)",
      lastActive: "2 days ago"
    },
    {
      id: "25001002",
      name: "Emma Johnson",
      topic: "IoT Based Smart Agriculture System",
      progress: 60,
      status: "On Track",
      currentMilestone: "Final Implementation & Testing",
      lastActive: "5 hours ago"
    },
    {
      id: "25001003",
      name: "Lucas Brown",
      topic: "Blockchain for Academic Credential Verification",
      progress: 15,
      status: "At Risk",
      currentMilestone: "Project Proposal",
      lastActive: "1 week ago"
    },
    {
      id: "25001004",
      name: "Mia Davis",
      topic: "AR Navigation for Campus",
      progress: 80,
      status: "On Track",
      currentMilestone: "Final Implementation & Testing",
      lastActive: "1 day ago"
    },
    {
      id: "25001005",
      name: "Ethan Wilson",
      topic: "Predictive Maintenance using ML",
      progress: 45,
      status: "On Track",
      currentMilestone: "System Design Specification (SDS)",
      lastActive: "3 days ago"
    },
    {
      id: "25001006",
      name: "Ava Taylor",
      topic: "Smart Traffic Management",
      progress: 10,
      status: "At Risk",
      currentMilestone: "Project Proposal",
      lastActive: "2 weeks ago"
    }
  ];

  const filteredStudents = filter === "All" ? students : students.filter(s => s.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Supervisees</h1>
          <p className="text-slate-500 mt-1">Track the progress and health of your assigned students.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none w-full sm:w-64" />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-semibold transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-slate-200 pb-px">
        {["All", "On Track", "At Risk"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              filter === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            onClick={() => navigate(`/supervisor/students/${student.id}`)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 md:items-center cursor-pointer group"
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-bold text-slate-800 mr-3 group-hover:text-indigo-600 transition-colors">{student.name}</h3>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${student.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">ID: {student.id} <span className="mx-2"> </span> Last active: {student.lastActive}</p>
              <p className="text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {student.topic}
              </p>
            </div>
            
            <div className="md:w-64 flex-shrink-0 border-l border-slate-100 md:pl-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-500">Overall Progress</span>
                  <span className={student.status === 'At Risk' ? 'text-rose-600' : 'text-indigo-600'}>
                    {student.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${student.status === 'At Risk' ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${student.progress}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Milestone</p>
                <div className="flex items-center text-sm font-medium text-slate-700">
                  {student.status === 'At Risk' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                  )}
                  <span className="truncate">{student.currentMilestone}</span>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <div className="w-full py-2 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors flex justify-center items-center">
                  Open Student Profile <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}