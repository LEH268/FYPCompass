import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, FileText, Download, FileSignature, MessageSquare, Loader2, Check } from "lucide-react";

export default function ExaminerStudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [downloadState, setDownloadState] = useState("idle");

  const handleDownload = () => {
    setDownloadState("downloading");
    setTimeout(() => setDownloadState("done"), 1500);
    setTimeout(() => setDownloadState("idle"), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Candidate Dossier</h1>
            <p className="text-slate-500 text-sm mt-1">Review all files and supervisor feedback prior to assessment.</p>
          </div>
        </div>
        <button onClick={() => navigate(`/examiner/evaluations/${id}`)} className="flex items-center px-6 py-2.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 shadow-md transition-all active:scale-95">
          <FileSignature className="w-4 h-4 mr-2" /> Start Evaluation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center h-fit">
          <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Oliver Smith</h2>
          <p className="text-sm text-slate-500 mb-4">{id || '25001001'}</p>
          <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Supervisor</p>
            <p className="text-sm font-semibold text-slate-700 mb-3">Dr. Alan Turing</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project Title</p>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">Automated Healthcare Diagnosis Using Deep Learning</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Submitted Deliverables & Feedback</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-5 bg-white flex justify-between items-start border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><FileText className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold text-slate-800">Final_Report_Oliver.pdf</h4>
                      <p className="text-xs text-slate-500">Submitted: Yesterday • 4.2 MB</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleDownload}
                    disabled={downloadState !== "idle"}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center transition-colors ${
                      downloadState === "done" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {downloadState === "idle" && <><Download className="w-3 h-3 mr-2" /> Download File</>}
                    {downloadState === "downloading" && <><Loader2 className="w-3 h-3 mr-2 animate-spin" /> Downloading...</>}
                    {downloadState === "done" && <><Check className="w-3 h-3 mr-2" /> Downloaded</>}
                  </button>
                </div>
                
                <div className="p-5 bg-slate-50 flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-indigo-800 mb-1">Supervisor's Clearance Note:</p>
                    <p className="text-sm text-slate-700 italic">"Student has successfully implemented the core model and documented all necessary requirements. Cleared for Final Evaluation."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}