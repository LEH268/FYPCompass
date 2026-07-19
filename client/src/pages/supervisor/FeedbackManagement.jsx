// src/pages/supervisor/FeedbackManagement.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CheckCircle, Save, ListChecks, MessageSquare, ChevronRight } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function FeedbackManagement() {
  const navigate = useNavigate();
  const { students, submissions, gradeSubmission } = useData();
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState("Approved");
  const [feedbackText, setFeedbackText] = useState("");

  // Filter only pending submissions for this supervisor (Dr. Alan Turing context)
  const myStudents = students.filter(s => s.supervisorId === "F01");
  const pendingItems = submissions.filter(sub => 
    sub.status === "Pending Review" && myStudents.some(s => s.id === sub.studentId)
  );

  const [selectedId, setSelectedId] = useState(null); // Explicitly start with no selection
  const activeItem = pendingItems.find(item => item.id === selectedId);

  const handleSave = (e) => {
    e.preventDefault();
    if (activeItem) {
      gradeSubmission(activeItem.id, status, feedbackText);
      setIsSaved(true);
      setTimeout(() => { 
        setIsSaved(false); 
        setFeedbackText("");
        setSelectedId(null); 
      }, 2000);
    }
  };

  if (isSaved) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
        <CheckCircle className="w-20 h-20 text-emerald-500 mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Feedback Submitted</h2>
        <p className="text-slate-500">The student has been notified and progress has been updated.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Provide Feedback</h1>
        <p className="text-slate-500 text-sm mt-1">Select a pending deliverable from the queue to evaluate.</p>
      </div>
      
      {pendingItems.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
          <h3 className="text-lg font-bold text-slate-800">All Caught Up!</h3>
          <p className="text-slate-500 mt-1">You have no pending submissions to review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Pending Queue List */}
          <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2">
            <h3 className="font-bold text-slate-800 flex items-center mb-2"><ListChecks className="w-5 h-5 mr-2 text-indigo-600" /> Pending Queue ({pendingItems.length})</h3>
            {pendingItems.map((item) => {
              const studentData = myStudents.find(s => s.id === item.studentId);
              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedId(item.id)} 
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedId === item.id ? 'bg-indigo-50 border-indigo-400 shadow-sm' : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'}`}
                >
                  <p className="text-sm font-bold text-slate-800">{item.studentName}</p>
                  <p className="text-xs font-semibold text-indigo-600 mt-1 truncate">{studentData?.topic}</p>
                  <div className="mt-3 flex justify-between items-center border-t border-slate-100 pt-2">
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold">{item.milestone}</span>
                    <ChevronRight className={`w-4 h-4 ${selectedId === item.id ? 'text-indigo-600' : 'text-slate-300'}`}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evaluation Form */}
          <div className="lg:col-span-2 space-y-6">
            {!activeItem ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center flex flex-col items-center justify-center h-full">
                <FileText className="w-16 h-16 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-600">Select a submission</h3>
                <p className="text-sm text-slate-400 mt-1">Choose a student's work from the queue to start evaluating.</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start gap-4 animate-in slide-in-from-right-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{activeItem.studentName}</h3>
                    <p className="text-sm text-slate-500 mt-1">Milestone: <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{activeItem.milestone}</span></p>
                    <p className="text-sm text-slate-500 mt-2">Submitted: {activeItem.date}</p>
                  </div>
                  <button className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-sm rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200 shadow-sm w-full md:w-auto justify-center">
                    <FileText className="w-4 h-4 mr-2"/> Download File
                  </button>
                </div>

                {activeItem.studentMessage && (
                  <div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-200 p-5 flex items-start gap-3 animate-in slide-in-from-right-4">
                    <MessageSquare className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Student's Message</p>
                      <p className="text-sm text-amber-900 italic leading-relaxed">"{activeItem.studentMessage}"</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col space-y-6 animate-in slide-in-from-right-4">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-bold text-slate-800 flex items-center"><Save className="w-5 h-5 mr-2 text-indigo-600"/> Official Evaluation</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Decision</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setStatus("Approved")} className={`py-3 px-3 rounded-lg text-sm font-bold border transition-all ${status === "Approved" ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                        Approve Deliverable
                      </button>
                      <button type="button" onClick={() => setStatus("Revision Required")} className={`py-3 px-3 rounded-lg text-sm font-bold border transition-all ${status === "Revision Required" ? "bg-rose-50 border-rose-500 text-rose-700 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                        Needs Revision
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Supervisor Feedback</label>
                    <textarea required value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows="5" placeholder="Provide specific feedback..." className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 resize-none text-sm"></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md active:scale-95 transition-all">Submit Feedback</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}