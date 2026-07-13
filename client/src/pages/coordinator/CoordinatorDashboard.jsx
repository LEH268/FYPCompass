import DashboardCard from "../../components/DashboardCard";
import { Users, FileText, ShieldAlert, BarChart3 } from "lucide-react";

export default function CoordinatorDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Coordinator Dashboard</h1>
                <p className="text-gray-500">Overview of the entire April-August 2026 Cohort.</p>
            </div>

            {/* High Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DashboardCard title="Total Students" value="142" description="Enrolled this semester" icon={<Users className="text-blue-600" />} />
                <DashboardCard title="Pending Proposals" value="18" description="Require approval" icon={<FileText className="text-orange-500" />} />
                <DashboardCard title="Unassigned Students" value="5" description="Need supervisors" icon={<ShieldAlert className="text-red-500" />} />
                <DashboardCard title="Avg. Progress" value="42%" description="Cohort milestone rate" icon={<BarChart3 className="text-green-600" />} />
            </div>

            {/* Cohort Health Alerts */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">System Alerts & Deadlines</h2>
                <div className="space-y-3">
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex justify-between items-center">
                        <p className="font-medium">5 students have not submitted their System Requirements Document (Past Due: Nov 01).</p>
                        <button className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Send Reminder</button>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg flex justify-between items-center">
                        <p className="font-medium">Dr. Alan Turing is at maximum supervision capacity (8/8 students).</p>
                        <button className="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">View Workload</button>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg flex justify-between items-center">
                        <p className="font-medium">System Design Specification milestone due next week (Nov 07).</p>
                        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit Deadline</button>
                    </div>
                </div>
            </div>
        </div>
    );
}