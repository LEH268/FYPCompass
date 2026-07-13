import DashboardCard from "../../components/DashboardCard";
import { supervisorDashboard } from "../../data/supervisorData";
import { Users, FileText, Calendar, AlertCircle } from "lucide-react";

export default function SupervisorDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Supervisor Dashboard</h1>
                <p className="text-gray-500">Welcome back, {supervisorDashboard.name}. Here is your supervision overview.</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard 
                    title="Active Students" 
                    value={supervisorDashboard.stats.activeStudents} 
                    description="Currently supervising" 
                    icon={<Users className="text-blue-600" />} 
                />
                <DashboardCard 
                    title="Pending Reviews" 
                    value={supervisorDashboard.stats.pendingReviews} 
                    description="Require your feedback" 
                    icon={<FileText className="text-orange-500" />} 
                />
                <DashboardCard 
                    title="Upcoming Meetings" 
                    value={supervisorDashboard.stats.upcomingMeetings} 
                    description="Consultations this week" 
                    icon={<Calendar className="text-green-600" />} 
                />
            </div>

            {/* Action Items List */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-5 border-b pb-3">Action Required</h2>
                <div className="space-y-4">
                    {supervisorDashboard.actionItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                            <div className="flex items-center gap-4">
                                <AlertCircle className={`${
                                    item.urgency === 'High' ? 'text-red-500' : 
                                    item.urgency === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                                }`} />
                                <div>
                                    <h4 className="font-bold text-gray-800">{item.type}</h4>
                                    <p className="text-sm text-gray-500">Student: {item.student} | Submitted: {item.date}</p>
                                </div>
                            </div>
                            <button className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                                Review Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}