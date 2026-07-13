import { useState } from "react";
import { Check, X, FileText, Download } from "lucide-react";

export default function FeedbackManagement() {
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // Mock data for pending submissions
    const pendingReviews = [
        { id: 1, student: "Lee Earn Hui", title: "FYPCompass SDS", type: "System Design Specification", date: "Nov 07, 2026", status: "Pending" },
        { id: 2, student: "Grace Wong Xin En", title: "AI Classifier Model", type: "System Requirements Document", date: "Nov 05, 2026", status: "Pending" }
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Feedback Management</h1>
                <p className="text-gray-500">Review student deliverables and provide evaluation decisions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: List of Pending Reviews */}
                <div className="bg-white rounded-xl shadow-sm border p-5 col-span-1 h-fit">
                    <h2 className="text-lg font-semibold mb-4 border-b pb-2">Pending Submissions</h2>
                    <div className="space-y-3">
                        {pendingReviews.map(sub => (
                            <div 
                                key={sub.id} 
                                onClick={() => setSelectedSubmission(sub)}
                                className={`p-4 rounded-lg border cursor-pointer transition ${
                                    selectedSubmission?.id === sub.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <h3 className="font-bold text-gray-800 text-sm">{sub.student}</h3>
                                <p className="text-xs text-gray-500">{sub.type}</p>
                                <p className="text-xs font-medium text-blue-600 mt-2">Submitted: {sub.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Review Form */}
                <div className="bg-white rounded-xl shadow-sm border p-6 col-span-2">
                    {selectedSubmission ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Reviewing: {selectedSubmission.student}</h2>
                                    <p className="text-gray-500">{selectedSubmission.title} - {selectedSubmission.type}</p>
                                </div>
                                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                                    <Download size={16} /> Download File
                                </button>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Evaluation Comments</label>
                                    <textarea 
                                        rows="6" 
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter your feedback, required revisions, or general comments here..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                                    <div className="flex gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <input type="radio" name="decision" className="peer sr-only" />
                                            <div className="p-4 border rounded-lg text-center peer-checked:bg-green-50 peer-checked:border-green-500 peer-checked:text-green-700 font-medium transition flex items-center justify-center gap-2">
                                                <Check size={18}/> Approve
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer">
                                            <input type="radio" name="decision" className="peer sr-only" />
                                            <div className="p-4 border rounded-lg text-center peer-checked:bg-orange-50 peer-checked:border-orange-500 peer-checked:text-orange-700 font-medium transition flex items-center justify-center gap-2">
                                                <X size={18}/> Needs Revision
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-bold mt-4">
                                    Submit Evaluation
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                            <FileText size={48} className="mb-4 opacity-50" />
                            <p>Select a submission from the left to review</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}