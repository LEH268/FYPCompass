// src/pages/supervisor/SupervisorStudentDetails.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Calendar, FileText, Download, MessageSquare, History, MessageCircle, X, Send } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorStudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { students, submissions, consultations } = useData();
  
  const student = students.find(s => s.id === id);
  const studentSubmissions = submissions.filter(sub => sub.studentId === id).sort((a,b) => b.id - a.id);
  const studentConsultations = consultations.filter(c => c.studentId === id).sort((a,b) => new Date(b.date) - new Date(a.date));

  // Chat State for Floating Widget
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  // Mock Chat History between Supervisor and Student
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "me", text: `Hi ${student?.name.split(' ')[0]}, how is the progress on your upcoming deliverable?`, time: "Yesterday, 2:30 PM" },
    { id: 2, sender: "student", text: "I'm currently finalizing the diagrams. I'll submit them soon.", time: "Yesterday, 3:15 PM" },
    { id: 3, sender: "me", text: "Great. Let me know if you need a quick consultation.", time: "Yesterday, 3:20 PM" }
  ]);

  // Auto-scroll to bottom of chat when new message is added
  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages([
      ...chatMessages, 
      { id: Date.now(), sender: "me", text: chatInput, time: "Just now" }
    ]);
    setChatInput("");
  };

  const handleDownload = (fileName) => {
    alert(`Downloading student file: ${fileName || 'submission_document.pdf'}`);
  };

  if (!student) {
    return (
      <div className="p-8 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800">Student Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 relative pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <button onClick={() => navigate('/supervisor/students')} className="p-2 mr-4 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Student Profile & Progress</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Review {student.name}'s deliverables, messages, and history.</p>
          </div>
        </div>
        <button onClick={() => navigate('/supervisor/consultations')} className="flex items-center px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-colors active:scale-95">
          <Calendar className="w-4 h-4 mr-2" /> Book/Log Meeting
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2 tracking-wider">
                ID: {student.id}
              </span>
              <span className={`px-3 py-1 mt-3 text-xs font-bold rounded-full uppercase tracking-wider ${student.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : student.status === 'Graded' ? 'bg-purple-100 text-purple-700' : 'bg-rose-100 text-rose-700'}`}>
                {student.status}
              </span>
            </div>
            <div className="pt-6 space-y-3">
              <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                {student.topic}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700">Progress</span>
                  <span className="text-indigo-600">{student.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
                  <div className={`h-2.5 rounded-full transition-all duration-1000 bg-indigo-600`} style={{ width: `${student.progress}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 text-right">Current Phase: <span className="font-bold text-slate-700">{student.stage}</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 flex items-center mb-4"><History className="w-5 h-5 mr-2 text-indigo-600"/> Consultation Logs</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {studentConsultations.length === 0 ? (
                <p className="text-sm text-slate-500 text-center font-medium">No consultations logged yet.</p>
              ) : studentConsultations.map(c => (
                <div key={c.id} className="border-l-2 border-indigo-300 pl-4 py-1">
                  <p className="text-xs font-bold text-slate-400">{c.date} | {c.time}</p>
                  <p className="text-sm font-bold text-slate-700">{c.topic}</p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 italic">"{c.summary}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Submissions & Feedback History</h3>
            </div>
            <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
              {studentSubmissions.length === 0 ? (
                <div className="text-center text-slate-500 py-6 font-medium">No submissions found.</div>
              ) : studentSubmissions.map((sub) => (
                <div key={sub.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all shadow-sm">
                  <div className="p-5 bg-white flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${sub.status === 'Pending Review' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-md font-bold text-slate-800">{sub.file}</h4>
                        <p className="text-xs text-slate-500 mb-1 font-medium">{sub.milestone} | Submitted: {sub.date}</p>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sub.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Retained Download Button */}
                    <button onClick={() => handleDownload(sub.file)} className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 font-bold text-xs rounded-lg transition-colors">
                      <Download className="w-4 h-4 mr-1"/> Download
                    </button>
                  </div>
                  
                  {/* Original layout retained below */}
                  {sub.studentMessage && (
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student Note:</p>
                      <p className="text-sm text-slate-700 italic">"{sub.studentMessage}"</p>
                    </div>
                  )}
                  {sub.feedback && (
                    <div className="p-5 bg-indigo-50/30 flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">Your Feedback:</p>
                        <p className="text-sm text-indigo-900 font-medium">"{sub.feedback}"</p>
                      </div>
                    </div>
                  )}
                  {sub.status === 'Pending Review' && (
                    <div className="p-4 bg-amber-50/50 text-center">
                      <button onClick={() => navigate('/supervisor/feedback')} className="text-sm font-bold text-amber-700 hover:underline">
                        Evaluate This Submission &rarr;
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[400px] mb-4 animate-in slide-in-from-bottom-5">
            {/* Chat Header */}
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-xs">
                  {student.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{student.name}</h3>
                  <p className="text-[10px] text-indigo-200 font-medium">Student • Online</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-indigo-200 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message student..." 
                className="flex-1 bg-slate-100 border-none outline-none px-4 py-2.5 rounded-full text-sm font-medium focus:ring-2 focus:ring-indigo-500/50"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim()}
                className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-sm flex-shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        )}

        {/* Circular Toggle Button */}
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 border-4 border-white relative"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </button>
        )}
      </div>
    </div>
  );
}