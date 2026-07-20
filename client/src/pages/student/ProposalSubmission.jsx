// src/pages/student/ProposalSubmission.jsx
import { useState } from "react";
import { UploadCloud, FileText, CheckCircle, X, Download, Send, ShieldAlert, MessageSquare, PlusCircle, Filter, Save } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ProposalSubmission() {
  const { submissions, addSubmission } = useData();
  
  // Modals & Filters
  const [showForm, setShowForm] = useState(false);
  const [filterMilestone, setFilterMilestone] = useState("All");
  
  // Form States
  const [selectedMilestone, setSelectedMilestone] = useState("System Design Specification (SDS)");
  const [file, setFile] = useState(null);
  const [studentMessage, setStudentMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Filter submissions for current mocked student (Oliver Smith)
  const mySubmissions = submissions
    .filter(sub => sub.studentId === "25001001")
    .filter(sub => filterMilestone === "All" || sub.milestone === filterMilestone)
    .sort((a, b) => b.id - a.id);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processSubmission = (status) => {
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
        status: status, // "Draft" or "Pending Review"
        similarityScore: Math.floor(Math.random() * 15) + 5 // Mock Turnitin Score 5-20%
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setStudentMessage("");
      setShowForm(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processSubmission("Pending Review");
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    processSubmission("Draft");
  };

  const resetForm = () => {
    setSubmitted(false);
    setFile(null);
    setStudentMessage("");
    setShowForm(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Deliverable Processed!</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          Your file has been successfully saved to your records.
        </p>
        <button onClick={resetForm} className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
          Back to Submissions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Submissions & Feedback</h1>
          <p className="text-slate-500 mt-1">Manage your deliverables and track supervisor feedback.</p>
        </div>
        
        {/* Submission Function Button */}
        <button onClick={() => setShowForm(true)} className="flex items-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95">
          <PlusCircle className="w-4 h-4 mr-2" /> New Submission
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-slate-800">Submission History</h3>
          
          {/* Milestone Filter */}
          <div className="relative w-full sm:w-72">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={filterMilestone}
              onChange={(e) => setFilterMilestone(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all appearance-none"
            >
              <option value="All">All Milestones</option>
              <option value="Project Proposal">Project Proposal</option>
              <option value="System Requirements Document (SRD)">System Requirements Document (SRD)</option>
              <option value="System Design Specification (SDS)">System Design Specification (SDS)</option>
              <option value="System Implementation">System Implementation</option>
              <option value="Final Report">Final Report</option>
            </select>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {mySubmissions.length === 0 ? (
            <div className="bg-slate-50 p-10 text-center rounded-xl border border-slate-200 border-dashed">
              <p className="text-slate-500 font-bold">No submissions found for the selected filter.</p>
            </div>
          ) : mySubmissions.map((sub) => (
            <div key={sub.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800">{sub.milestone}</h3>
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                    sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                    sub.status === 'Draft' ? 'bg-slate-200 text-slate-700' :
                    sub.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Last Updated: {sub.date}</p>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <p className="text-sm font-semibold text-slate-700">{sub.file}</p>
                  </div>
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Download className="w-4 h-4" /></button>
                </div>
                
                {sub.status !== 'Draft' && (
                  <div className="flex items-center gap-2 mb-4 p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                    <ShieldAlert className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-600">Turnitin Similarity:</span>
                    <span className={`text-xs font-bold ${sub.similarityScore > 20 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {sub.similarityScore || 0}%
                    </span>
                  </div>
                )}

                {sub.studentMessage && (
                  <div className="mt-2">
                    <p className="text-xs font-bold text-slate-500">Your Notes:</p>
                    <p className="text-sm text-slate-700 italic">"{sub.studentMessage}"</p>
                  </div>
                )}
              </div>
              
              <div className="flex-1 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col justify-center">
                <p className="text-xs font-bold text-indigo-800 mb-2 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1"/> Supervisor Feedback:
                </p>
                {sub.status === 'Draft' ? (
                  <p className="text-sm text-slate-400 italic">This is a draft. Submit to request evaluation.</p>
                ) : sub.feedback ? (
                  <p className="text-sm text-slate-700 leading-relaxed">"{sub.feedback}"</p>
                ) : (
                  <p className="text-sm text-slate-400 italic">Pending evaluation by supervisor.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">New Submission</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
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
                  placeholder="e.g., Hi Dr., I have updated chapter 3 methodology..." 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none resize-none text-sm"
                ></textarea>
              </div>
              
              <div className="flex pt-4 space-x-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={handleSaveDraft}
                  disabled={!file || isSubmitting}
                  className="w-1/2 flex justify-center items-center px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 transition-all shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" /> Save as Draft
                </button>
                <button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={!file || isSubmitting}
                  className="w-1/2 flex justify-center items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md"
                >
                  {isSubmitting ? 'Processing...' : <><Send className="w-4 h-4 mr-2" /> Final Submit</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}