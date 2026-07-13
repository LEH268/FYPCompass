import { MessageSquare, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { feedbackData } from "../../data/feedbackData"; // Assuming you create this data file

export default function FeedbackPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Feedback & Evaluations</h1>
                <p className="text-gray-500">View supervisor comments and decisions on your submissions.</p>
            </div>

            <div className="space-y-4">
                {feedbackData.map((fb) => (
                    <div key={fb.id} className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-full">
                                <MessageSquare className="text-blue-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-gray-800">{fb.milestoneName}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                                        fb.decision === "Approved" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                    }`}>
                                        {fb.decision === "Approved" ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                                        {fb.decision}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Received on: {fb.date}</p>
                                <p className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-lg border">
                                    "{fb.comments}"
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}