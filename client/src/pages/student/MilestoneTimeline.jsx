import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, CircleDashed, ArrowRight, Eye } from "lucide-react";

export default function MilestoneTimeline() {
  const navigate = useNavigate();

  const milestones = [
    {
      id: 1,
      title: "Project Proposal",
      dueDate: "Oct 15, 2026",
      status: "completed",
      description: "Initial proposal outlining the FYP scope and objectives."
    },
    {
      id: 2,
      title: "System Requirements Document (SRD)",
      dueDate: "Nov 01, 2026",
      status: "completed",
      description: "Detailed documentation of functional and non-functional requirements."
    },
    {
      id: 3,
      title: "System Design Specification (SDS)",
      dueDate: "Nov 07, 2026",
      status: "in-progress",
      description: "Architectural design, sequence diagrams, and class diagrams."
    },
    {
      id: 4,
      title: "Final Implementation & Testing",
      dueDate: "Dec 01, 2026",
      status: "pending",
      description: "Fully working prototype with UAT results."
    },
    {
      id: 5,
      title: "Final Viva Presentation",
      dueDate: "Dec 15, 2026",
      status: "pending",
      description: "Demonstration of the system to the examiners."
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return <CheckCircle className="text-emerald-500 bg-white rounded-full" size={28} />;
      case "in-progress": return <Clock className="text-blue-500 bg-white rounded-full" size={28} />;
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
                milestone.status === 'in-progress' 
                  ? 'border-blue-200 bg-blue-50/50 shadow-sm ring-1 ring-blue-500/10' 
                  : milestone.status === 'completed'
                  ? 'border-emerald-100 bg-emerald-50/20 hover:border-emerald-200'
                  : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-800">{milestone.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                    milestone.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                    milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {milestone.status.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{milestone.description}</p>
                
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                    Due: {milestone.dueDate}
                  </span>
                  
                  {milestone.status === "in-progress" && (
                    <button 
                      onClick={() => navigate('/student/proposal')}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center font-bold text-sm transition-colors shadow-sm"
                    >
                      Submit Deliverable <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                  {milestone.status === "completed" && (
                    <button 
                      onClick={() => navigate('/student/proposal')}
                      className="text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-4 py-2 rounded-lg flex items-center font-bold text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View File & Feedback
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