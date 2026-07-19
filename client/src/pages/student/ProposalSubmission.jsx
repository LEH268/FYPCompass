// src/pages/student/ProposalSubmission.jsx
import { useState } from "react";
import { UploadCloud, FileText, CheckCircle, X, Download, Send, ShieldAlert, MessageSquare } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ProposalSubmission() {
  const { submissions, addSubmission } = useData();
  const [activeTab, setActiveTab] = useState("submit"); // "submit" or "feedback"
  const [selectedMilestone, setSelectedMilestone] = useState("System Design Specification (SDS)");
  const [file, setFile] = useState(null);
  const [studentMessage, setStudentMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Filter submissions for current mocked student (Oliver Smith)
  const mySubmissions = submissions.filter(sub => sub.studentId === "25001001").sort((a,b) => b.id - a.id);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      addSubmission({
        studentId: "25001001",
        studentName: "Oliver Smith",
        milestone: selectedMilestone,
        file: file.name,
        date: new Date().toISOString().split('T')[0],
        studentMessage: studentMessage,
        status: "Pending Review",
        similarityScore: Math.floor(Math.random() * 15) + 5 // Mock Turnitin Score 5-20%
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setStudentMessage("");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Deliverable Submitted!</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          Your file and message have been securely routed to your supervisor.
        </p>
        <div className="flex gap-4">
          <button onClick={() => {setSubmitted(false); setFile(null);}} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Submit Another
          </button>
          <button onClick={() => {setSubmitted(false); setFile(null); setActiveTab("feedback");}} className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
            View My Submissions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Submissions & Feedback</h1>
        <p className="text-slate-500 mt-1">Upload your deliverables or review past feedback from your supervisor.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab("submit")}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "submit" ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          Submit Deliverable
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === "feedback" ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          View Feedback History
        </button>
      </div>

      {activeTab === "submit" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in">
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Milestone</label>
              <select 
                required 
                value={selectedMilestone}
                onChange={(e) => setSelectedMilestone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm font-semibold text-slate-700"
              >
                <option value="Project Proposal">Project Proposal</option>
                <option value="System Requirements Document (SRD)">System Requirements Document (SRD)</option>
                <option value="System Design Specification (SDS)">System Design Specification (SDS)</option>
                <option value="System Implementation">System Implementation</option>
                <option value="Final Report">Final Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Upload Document</label>
              {!file ? (
                <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 transition-colors cursor-pointer relative bg-slate-50/50">
                  <input id="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                  <div className="space-y-2 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="font-bold text-indigo-600">Click or drag file to upload</p>
                    <p className="text-xs text-slate-500">PDF, DOCX, ZIP up to 50MB</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    <p className="text-sm font-bold text-slate-800">{file.name}</p>
                  </div>
                  <button type="button" onClick={() => setFile(null)} className="text-slate-500 hover:text-rose-600"><X className="w-5 h-5" /></button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message to Supervisor (Optional)</label>
              <textarea 
                rows="3" 
                value={studentMessage}
                onChange={(e) => setStudentMessage(e.target.value)}
                placeholder="e.g., Hi Dr., please review chapter 3 specifically as I changed the methodology..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none resize-none text-sm"
              ></textarea>
            </div>
            <div className="flex pt-2">
              <button 
                type="submit" 
                disabled={!file || isSubmitting} 
                className="w-full flex justify-center items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md"
              >
                {isSubmitting ? 'Uploading...' : <><Send className="w-4 h-4 mr-2" /> Submit Deliverable</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="space-y-4 animate-in fade-in">
          {mySubmissions.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-medium">No past submissions to show.</p>
            </div>
          ) : mySubmissions.map((sub) => (
            <div key={sub.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800">{sub.milestone}</h3>
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                    sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                    sub.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Submitted: {sub.date}</p>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <p className="text-sm font-semibold text-slate-700">{sub.file}</p>
                  </div>
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Download className="w-4 h-4" /></button>
                </div>
                
                <div className="flex items-center gap-2 mb-4 p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                  <ShieldAlert className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-semibold text-slate-600">Turnitin Similarity:</span>
                  <span className={`text-xs font-bold ${sub.similarityScore > 20 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {sub.similarityScore || 0}%
                  </span>
                </div>

                {sub.studentMessage && (
                  <div className="mt-2">
                    <p className="text-xs font-bold text-slate-500">Your Message:</p>
                    <p className="text-sm text-slate-700 italic">"{sub.studentMessage}"</p>
                  </div>
                )}
              </div>
              
              <div className="flex-1 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                <p className="text-xs font-bold text-indigo-800 mb-2 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1"/> Supervisor Feedback:
                </p>
                {sub.feedback ? (
                  <p className="text-sm text-slate-700 leading-relaxed">"{sub.feedback}"</p>
                ) : (
                  <p className="text-sm text-slate-400 italic">Pending evaluation by supervisor.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}