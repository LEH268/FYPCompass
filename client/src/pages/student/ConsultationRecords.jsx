import { CalendarDays, BookOpen } from "lucide-react";
import { consultationRecords } from "../../data/consultationData";

export default function ConsultationRecords() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Consultation Records</h1>
                <p className="text-gray-500">Review summaries and action items from your meetings with your supervisor.</p>
            </div>

            <div className="grid gap-6">
                {consultationRecords.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <CalendarDays className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{session.topic}</h3>
                                <p className="text-sm text-gray-500">{session.date} | {session.duration}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-400 uppercase">Summary</h4>
                                <p className="text-gray-700">{session.summary}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                    <BookOpen size={16} /> Action Items
                                </h4>
                                <ul className="list-disc list-inside mt-2 text-gray-700 text-sm">
                                    {session.actionItems.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}