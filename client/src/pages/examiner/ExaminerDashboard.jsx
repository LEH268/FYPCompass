import DashboardCard from "../../components/DashboardCard";
import { FileCheck, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExaminerDashboard() {
    const assignedProjects = [
        { id: 1, student: "Lee Earn Hui", title: "FYPCompass Web System", status: "Ready for Evaluation", date: "Dec 15, 2026" },
        { id: 2, student: "Grace Wong Xin En", title: "AI Classifier", status: "Evaluated", date: "Dec 14, 2026" }
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Examiner Dashboard</h1>
                <p className="text-gray-500">Manage and evaluate your assigned Final Year Projects.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Assigned Projects" value="2" description="Total projects to evaluate" icon={<FileCheck className="text-blue-600" />} />
                <DashboardCard title="Pending Evaluations" value="1" description="Awaiting your grading" icon={<Clock className="text-orange-500" />} />
                <DashboardCard title="Completed" value="1" description="Scores submitted" icon={<Award className="text-green-600" />} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Projects for Evaluation</h2>
                <div className="space-y-3">
                    {assignedProjects.map(project => (
                        <div key={project.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                            <div>
                                <h3 className="font-bold text-gray-800">{project.title}</h3>
                                <p className="text-sm text-gray-500">Student: {project.student} | Viva Date: {project.date}</p>
                            </div>
                            {project.status === "Evaluated" ? (
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-bold">Evaluated</span>
                            ) : (
                                <Link to={`/examiner/evaluate/${project.id}`} className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800 font-medium">
                                    Start Evaluation
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}