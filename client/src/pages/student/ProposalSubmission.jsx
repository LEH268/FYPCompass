import { useState } from "react";
import FileUpload from "../../components/FileUpload";

export default function ProposalSubmission() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // In a real app, you would send data to the backend here
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Proposal Submission</h1>
                <p className="text-gray-500">Submit your initial FYP proposal for coordinator and supervisor approval.</p>
            </div>

            {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">Proposal Submitted Successfully!</h2>
                    <p>Your proposal is currently pending review from the FYP Coordinator.</p>
                    <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Submit Another Revision
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border p-6 or p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                            <input 
                                type="text" 
                                required
                                placeholder="e.g., FYPCompass Web System"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Supervisor (Optional)</label>
                            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option value="">Select a supervisor...</option>
                                <option value="1">Dr. Wan Siti Nur Aiza</option>
                                <option value="2">Dr. Alan Turing</option>
                                <option value="3">Prof. Grace Hopper</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description / Abstract</label>
                            <textarea 
                                required
                                rows="5"
                                placeholder="Briefly describe the problem statement, objectives, and proposed methodology..."
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <FileUpload label="Attach Proposal Document (PDF)" />

                        <div className="pt-4 border-t flex justify-end">
                            <button 
                                type="submit"
                                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition font-semibold"
                            >
                                Submit Proposal
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}