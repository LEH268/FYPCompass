import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, CheckCircle, AlertCircle, X, ArrowLeft, MessageSquare, Download } from "lucide-react";

export default function ProposalSubmission() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Mock past submissions data
  const pastSubmissions = [
    {
      id: 1,
      milestone: "Project Proposal",
      submittedOn: "Oct 12, 2026",
      fileName: "EarnHui_Proposal_Final.pdf",
      fileSize: "2.4 MB",
      status: "Approved",
      feedback: "The project idea is relevant and objectives are clear. Continue with detailed system design. Approved.",
      supervisor: "Dr. Alan Turing"
    },
    {
      id: 2,
      milestone: "System Requirements Document (SRD)",
      submittedOn: "Oct 29, 2026",
      fileName: "SRD_v2_Updated.docx",
      fileSize: "1.1 MB",
      status: "Approved",
      feedback: "Use cases look solid. Ensure your non-functional requirements are testable in the final phase.",
      supervisor: "Dr. Alan Turing"
    }
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsSubmitting(true);
    // Simulate API upload
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Submitted Successfully!</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          Your deliverable has been securely uploaded and routed to your supervisor for evaluation.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            Submit Another File
          </button>
          <button 
            onClick={() => navigate('/student/milestones')}
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Return to Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Submissions & Deliverables</h1>
          <p className="text-slate-500 mt-1">Upload active deliverables and review past feedback.</p>
        </div>
      </div>

      {/* ACTIVE SUBMISSION SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-blue-50/30">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded mb-2">Action Required</span>
              <h2 className="text-lg font-bold text-slate-800">System Design Specification (SDS)</h2>
            </div>
            <span className="text-sm font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100">
              Due in 3 days
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Submission Comments (Optional)</label>
            <textarea 
              rows="3" 
              placeholder="Add any notes for your supervisor here regarding this deliverable..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all resize-none text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Upload Document</label>
            
            {!file ? (
              <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-colors group relative cursor-pointer">
                <div className="space-y-2 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Click to upload</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.zip" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF, DOCX, or ZIP up to 50MB</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="p-1.5 hover:bg-indigo-100 rounded-lg transition-colors text-slate-500 hover:text-rose-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 mr-1 text-amber-500" /> Ensure all components match the grading rubric.
            </div>
            <button
              type="submit"
              disabled={!file || isSubmitting}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all shadow-md ${
                !file ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95'
              }`}
            >
              {isSubmitting ? 'Uploading...' : 'Submit Deliverable'}
            </button>
          </div>
        </form>
      </div>

      {/* PAST SUBMISSIONS & FEEDBACK SECTION */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Past Submissions & Feedback</h2>
        <div className="space-y-4">
          {pastSubmissions.map((sub) => (
            <div key={sub.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-bold text-slate-800">{sub.milestone}</h3>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded">
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Submitted on: {sub.submittedOn}</p>
                
                {/* Embedded File View */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{sub.fileName}</p>
                      <p className="text-[10px] text-slate-500">{sub.fileSize}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-indigo-600 p-2 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Feedback Block */}
              <div className="flex-1 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
                <div className="flex items-center mb-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600 mr-2" />
                  <span className="text-xs font-bold text-indigo-800">Supervisor Feedback</span>
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{sub.feedback}"
                </p>
                <p className="text-xs text-slate-500 mt-3 text-right">- {sub.supervisor}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}