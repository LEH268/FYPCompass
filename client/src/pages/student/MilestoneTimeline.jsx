import { CheckCircle, Clock, CircleDashed } from "lucide-react";

export default function MilestoneTimeline() {
    
    // Mock data based on your BIS2102 requirements
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
            case "completed": return <CheckCircle className="text-green-500 bg-white" size={28} />;
            case "in-progress": return <Clock className="text-blue-500 bg-white" size={28} />;
            default: return <CircleDashed className="text-gray-300 bg-white" size={28} />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Milestone Timeline</h1>
                <p className="text-gray-500">Track your project phases and upcoming submission deadlines.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                    
                    {milestones.map((milestone) => (
                        <div key={milestone.id} className="relative pl-8">
                            {/* Icon */}
                            <div className="absolute -left-[15px] top-1">
                                {getStatusIcon(milestone.status)}
                            </div>

                            {/* Content */}
                            <div className={`p-5 rounded-lg border ${
                                milestone.status === 'in-progress' ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-gray-100 bg-gray-50'
                            }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-800">{milestone.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-200 text-gray-600'
                                    }`}>
                                        {milestone.status.toUpperCase()}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 mb-3">{milestone.description}</p>
                                
                                <div className="flex items-center text-sm font-medium text-gray-500">
                                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-3">
                                        Due: {milestone.dueDate}
                                    </span>
                                    {milestone.status === "in-progress" && (
                                        <button className="text-blue-600 hover:underline">Submit Deliverable &rarr;</button>
                                    )}
                                    {milestone.status === "completed" && (
                                        <button className="text-green-600 hover:underline">View Submission & Feedback</button>
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