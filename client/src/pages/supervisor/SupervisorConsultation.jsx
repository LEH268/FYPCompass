import { Calendar, Plus } from "lucide-react";

export default function SupervisorConsultations() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Consultation Management</h1>
                    <p className="text-gray-500">Log meeting summaries and set action items for students.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition font-medium">
                    <Plus size={18} /> Record New Session
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-6 border-b pb-2">Recent Sessions</h2>
                
                {/* Example of a logged session */}
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Student: Lee Earn Hui</h3>
                                <p className="text-sm text-gray-500">Date: Nov 12, 2026 | Topic: System Design Review</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Logged</span>
                    </div>
                    
                    <div className="space-y-2 mt-4 bg-white p-4 rounded border">
                        <p className="text-sm font-semibold text-gray-700">Summary:</p>
                        <p className="text-sm text-gray-600">Reviewed the Class and Sequence diagrams. Suggested modifications to the Feedback loop logic to ensure coordinator visibility.</p>
                        
                        <p className="text-sm font-semibold text-gray-700 mt-4">Action Items:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            <li>Update Figure 2 Sequence Diagram.</li>
                            <li>Finalize database schema for Submission Record.</li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    );
}