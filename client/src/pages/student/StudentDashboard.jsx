// src/pages/student/StudentDashboard.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CalendarCheck, FileText, CheckCircle, BookOpen, MessageCircle, X, Send } from "lucide-react";
import { useData } from "../../context/DataContext";
import profileImage from "../../assets/profile.png";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { students, submissions, consultations } = useData();

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  // Mock logged-in student: Oliver Smith
  const myData = students.find(s => s.id === "25001001");
  const mySubmissions = submissions.filter(sub => sub.studentId === "25001001").sort((a,b) => b.id - a.id);
  const myConsultations = consultations.filter(c => c.studentId === "25001001");
  const recentFeedback = mySubmissions.find(sub => sub.feedback !== null);

  // Mock Chat History
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "supervisor", text: `Hi ${myData.name.split(' ')[0]}, how is the progress on your upcoming deliverable?`, time: "Yesterday, 2:30 PM" },
    { id: 2, sender: "me", text: "I'm currently finalizing the diagrams. I'll submit them soon.", time: "Yesterday, 3:15 PM" },
    { id: 3, sender: "supervisor", text: "Great. Let me know if you need a quick consultation.", time: "Yesterday, 3:20 PM" }
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative pb-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Welcome back, {myData.name.split(' ')[0]}!
            <img 
              src={profileImage} 
              alt="Studying" 
              className="w-8 h-8 rounded-full mix-blend-multiply opacity-80"
            />
          </h1>
          <p className="text-slate-500 mt-1">Here is the latest progress on your Final Year Project.</p>
        </div>
        <button onClick={() => navigate('/student/consultations')} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-sm transition-transform active:scale-95 flex items-center">
          <CalendarCheck className="w-4 h-4 mr-2" />
          Book Consultation
        </button>
      </div>
      
      {/* FYP Academic Banner */}
      <div className="relative w-full h-40 md:h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center">
          <BookOpen className="h-8 w-8 text-amber-400 mb-3 animate-pulse" />
          <h2 className="text-white text-xl md:text-2xl font-bold max-w-lg leading-tight drop-shadow-md">
            "Research is creating new knowledge."
          </h2>
          <p className="text-indigo-100 text-sm mt-2 max-w-md drop-shadow-sm">
            Stay consistent with your milestones. Every draft brings you closer to graduation.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 mb-3">
              Phase: {myData.stage}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{myData.topic}</h2>
            <p className="text-sm text-slate-500">Supervised by <span className="font-semibold text-indigo-600">{myData.supervisorName}</span></p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-slate-700">Overall Progress</span>
            <span className="text-indigo-600">{myData.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${myData.progress}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Recent Deliverables</h3>
            <button onClick={() => navigate('/student/proposal')} className="text-sm text-indigo-600 font-medium hover:underline transition-colors">
              Submit New File
            </button>
          </div>
          <div className="space-y-4">
            {mySubmissions.slice(0, 2).map(sub => (
              <div key={sub.id} onClick={() => navigate('/student/proposal')} className="flex p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:shadow-sm transition-all group cursor-pointer">
                <div className={`h-12 w-12 rounded-lg bg-white border flex flex-col items-center justify-center flex-shrink-0 transition-colors ${sub.status === 'Approved' ? 'border-emerald-200 text-emerald-600' : 'border-amber-200 text-amber-600'}`}>
                  {sub.status === 'Approved' ? <CheckCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{sub.milestone}</h4>
                  <p className="text-xs text-slate-500 mt-1">File: {sub.file}</p>
                </div>
                <div className="ml-4 flex flex-col items-end justify-center">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md ${sub.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* ORIGINAL LATEST FEEDBACK COMPONENT */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Latest Feedback</h3>
          <div className="space-y-5 flex-1">
            {recentFeedback ? (
              <div className="relative pl-4 border-l-2 border-indigo-300">
                <div className="absolute w-2 h-2 bg-indigo-600 rounded-full -left-[5px] top-1.5"></div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">From {myData.supervisorName}</p>
                <h4 className="text-sm font-semibold text-slate-800">{recentFeedback.milestone}</h4>
                <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                  "{recentFeedback.feedback}"
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No feedback received yet.</p>
            )}
          </div>
          <button onClick={() => navigate('/student/consultations')} className="w-full mt-6 py-2 flex items-center justify-center text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100">
            {myConsultations.length} Consultations Logged <ChevronRight className="h-4 w-4 ml-1" />
          </button>
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
                  {myData.supervisorName.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{myData.supervisorName}</h3>
                  <p className="text-[10px] text-indigo-200 font-medium">Supervisor • Online</p>
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
                placeholder="Type a message..." 
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
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
        )}
      </div>
    </div>
  );
}