// src/pages/student/MilestoneTimeline.jsx
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, CircleDashed, ArrowRight, Eye } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function MilestoneTimeline() {
  const navigate = useNavigate();
  const { submissions } = useData();
  
  // Get submissions for current student Oliver Smith
  const mySubmissions = submissions.filter(s => s.studentId === "25001001");

  // Determine status strictly based on what is in the submissions database
  const getMilestoneStatus = (milestoneName) => {
    const sub = mySubmissions.find(s => s.milestone === milestoneName);
    if (!sub) return "Not Submitted";
    if (sub.status === "Approved") return "Completed";
    return "Pending Review";
  };

  const milestones = [
    {
      id: 1,
      title: "Project Proposal",
      dueDate: "Oct 15, 2026",
      status: getMilestoneStatus("Project Proposal"),
      description: "Initial proposal outlining the FYP scope and objectives."
    },
    {
      id: 2,
      title: "System Requirements Document (SRD)",
      dueDate: "Nov 01, 2026",
      status: getMilestoneStatus("System Requirements Document (SRD)"),
      description: "Detailed documentation of functional and non-functional requirements."
    },
    {
      id: 3,
      title: "System Design Specification (SDS)",
      dueDate: "Nov 07, 2026",
      status: getMilestoneStatus("System Design Specification (SDS)"),
      description: "Architectural design, sequence diagrams, and class diagrams."
    },
    {
      id: 4,
      title: "System Implementation",
      dueDate: "Dec 01, 2026",
      status: getMilestoneStatus("System Implementation"),
      description: "Fully working prototype with UAT results."
    },
    {
      id: 5,
      title: "Final Report",
      dueDate: "Dec 15, 2026",
      status: getMilestoneStatus("Final Report"),
      description: "Demonstration of the system to the examiners."
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return <CheckCircle className="text-emerald-500 bg-white rounded-full shadow-sm" size={28} />;
      case "Pending Review": return <Clock className="text-amber-500 bg-white rounded-full shadow-sm" size={28} />;
      default: return <CircleDashed className="text-slate-300 bg-white rounded-full" size={28} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Milestone Timeline</h1>
        <p className="text-slate-500 mt-1">Track your project phases and upcoming submission deadlines.</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="relative pl-8">
              {/* Icon */}
              <div className="absolute -left-[15px] top-1">
                {getStatusIcon(milestone.status)}
              </div>
              
              {/* Content */}
              <div className={`p-5 rounded-xl border transition-all ${
                milestone.status === 'Pending Review' 
                  ? 'border-amber-200 bg-amber-50/50 shadow-sm ring-1 ring-amber-500/10' 
                  : milestone.status === 'Completed'
                  ? 'border-emerald-100 bg-emerald-50/20'
                  : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold ${milestone.status === 'Not Submitted' ? 'text-slate-600' : 'text-slate-800'}`}>{milestone.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                    milestone.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                    milestone.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {milestone.status}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{milestone.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-medium">
                  <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm w-fit">
                    Due: {milestone.dueDate}
                  </span>
                  
                  {milestone.status === "Not Submitted" && (
                    <button 
                      onClick={() => navigate('/student/proposal')}
                      className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center justify-center font-bold text-sm transition-colors shadow-sm w-full sm:w-auto"
                    >
                      Submit Deliverable <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                  {milestone.status !== "Not Submitted" && (
                    <button 
                      onClick={() => navigate('/student/proposal')}
                      className="text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-lg flex items-center justify-center font-bold text-sm transition-colors w-full sm:w-auto shadow-sm"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View Status & Feedback
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}