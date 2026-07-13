import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, CheckCircle, MessageSquare, Save } from "lucide-react";

export default function FeedbackManagement() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState("pending"); // pending, approved, revisions

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      navigate('/supervisor');
    }, 2000);
  };

  if (isSaved) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
        <CheckCircle className="w-20 h-20 text-emerald-500 mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Feedback Submitted</h2>
        <p className="text-slate-500">The student has been notified of your review.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Review Submission</h1>
          <p className="text-slate-500 text-sm mt-1">Provide feedback on the student's milestone deliverable.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Submission Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Submission Info</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-slate-500 font-medium">Student</p>
                <p className="font-semibold text-slate-800">Lee Earn Hui (25008442)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Milestone</p>
                <p className="font-semibold text-slate-800">Project Proposal</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Submitted On</p>
                <p className="font-semibold text-slate-800">Aug 14, 2026 - 10:30 AM</p>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium mb-2">Student Comments:</p>
                <p className="text-sm italic text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  "Hi Dr. Alan, I have updated the literature review section as discussed in our last meeting. Please let me know if the scope is acceptable now."
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">FYP_Proposal_v2.pdf</h4>
            <p className="text-xs text-slate-500 mb-4">2.4 MB</p>
            <button className="w-full flex justify-center items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" /> Download File
            </button>
          </div>
        </div>

        {/* Right Column: Feedback Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center">
            <MessageSquare className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="font-bold text-slate-800">Supervisor Evaluation</h3>
          </div>
          
          <form onSubmit={handleSave} className="p-6 flex-1 flex flex-col">
            <div className="space-y-6 flex-1">
              
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Action Required</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("approved")}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                      status === "approved" ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("revisions")}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                      status === "revisions" ? "bg-amber-50 border-amber-500 text-amber-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Needs Revision
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("rejected")}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                      status === "rejected" ? "bg-rose-50 border-rose-500 text-rose-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">General Comments</label>
                <textarea 
                  required
                  rows="6" 
                  placeholder="Provide your feedback here. Be specific about what needs to be changed..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all resize-none text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Upload Annotated File (Optional)</label>
                <div className="flex items-center justify-center w-full px-6 py-4 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-indigo-600">Click to upload</span>
                  <span className="text-sm text-slate-500 ml-1">or drag and drop</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit"
                className="flex items-center px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                <Save className="w-5 h-5 mr-2" /> Submit Feedback
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}