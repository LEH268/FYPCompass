import { useState } from "react";
import { Save, CheckCircle, FileText, History } from "lucide-react";

export default function ProjectEvaluation() {
    const [score, setScore] = useState("");
    const [comments, setComments] = useState("");

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Evaluate Project</h1>
                    <p className="text-gray-500">Evaluating: FYPCompass Web System (Lee Earn Hui)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Project History (Read Only) */}
                <div className="bg-gray-50 rounded-xl border p-6 h-fit space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                        <History size={20}/> Project History & Artefacts
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded border shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-sm">Final Report Document</p>
                                <p className="text-xs text-gray-500">Submitted: Dec 01, 2026</p>
                            </div>
                            <button className="text-blue-600 hover:underline text-sm font-medium">Download</button>
                        </div>
                        <div className="bg-white p-4 rounded border shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-sm">Turnitin Plagiarism Report</p>
                                <p className="text-xs text-red-500">Similarity: 12%</p>
                            </div>
                            <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                        </div>
                        <div className="bg-white p-4 rounded border shadow-sm">
                            <p className="font-semibold text-sm mb-1">Supervisor's Final Remarks</p>
                            <p className="text-xs text-gray-600 italic">"Student has shown excellent progress and managed to implement all core requirements..."</p>
                        </div>
                    </div>
                </div>

                {/* Right: Grading Form */}
                <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                        <FileText size={20}/> Official Evaluation
                    </h2>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Final Score (0-100)</label>
                        <input 
                            type="number" 
                            max="100" 
                            min="0"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="w-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-bold"
                            placeholder="e.g. 85"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Examiner's Comments / Justification</label>
                        <textarea 
                            rows="6" 
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter detailed feedback and justification for the score..."
                        ></textarea>
                    </div>

                    <div className="flex gap-4 pt-4 border-t">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold">
                            <Save size={18} /> Save Draft
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-bold">
                            <CheckCircle size={18} /> Submit Final Score
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}