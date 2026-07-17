import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, FileText, CheckCircle, Clock, CircleDashed, Calendar, Download, Edit, MessageSquare } from "lucide-react";

export default function SupervisorStudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock student details based on the ID
  const student = {
    id: id || "25008442",
    name: "Lee Earn Hui",
    topic: "Automated Healthcare Diagnosis Using Deep Learning",
    progress: 35,
    email: `${id || "25008442"}@imail.sunway.edu.my`,
    contact: "+60 12-345 6789"
  };

  const milestones = [
    { id: 1, title: "Project Proposal", status: "completed" },
    { id: 2, title: "System Requirements Document (SRD)", status: "completed" },
    { id: 3, title: "System Design Specification (SDS)", status: "in-progress" },
    { id: 4, title: "Final Implementation & Testing", status: "pending" },
  ];

  // Enhanced submissions data to include feedback
  const submissions = [
    {
      id: 101,
      name: "FYP_Proposal_Final.pdf",
      milestone: "Project Proposal",
      date: "Oct 14, 2026",
      status: "Graded",
      size: "2.4 MB",
      feedback: "The project idea is relevant and objectives are clear. Ensure you find a localized dataset for the training model. Approved."
    },
    {
      id: 102,
      name: "Requirements_Draft1.docx",
      milestone: "System Requirements Document (SRD)",
      date: "Oct 28, 2026",
      status: "Graded",
      size: "1.2 MB",
      feedback: "Functional requirements are solid, but non-functional requirements need more specific metrics (e.g., system response time < 2s)."
    },
    {
      id: 103,
      name: "SDS_Architecture_Diagram.pdf",
      milestone: "System Design Specification (SDS)",
      date: "Nov 02, 2026",
      status: "Pending Review",
      size: "3.1 MB",
      feedback: null
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/supervisor/students')}
            className="p-2 mr-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Student Profile Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Review student details, past deliverables, and feedback.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/supervisor/consultations')}
          className="flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 shadow-sm transition-colors"
        >
          <Calendar className="w-4 h-4 mr-2" /> Log Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Student Identity & Topic */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mt-2 tracking-wider">
                ID: {student.id}
              </span>
            </div>
            
            <div className="pt-6 space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-slate-700">{student.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contact</p>
                <p className="text-sm font-medium text-slate-700">{student.contact}</p>
              </div>
              <div className="pt-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Topic</p>
                <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                  {student.topic}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-700">Overall Progress</span>
                  <span className="text-indigo-600">{student.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${student.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Tracker */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Milestones</h3>
            <div className="space-y-4">
              {milestones.map((m) => (
                <div key={m.id} className="flex items-start">
                  {m.status === 'completed' ? <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" /> : 
                   m.status === 'in-progress' ? <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" /> : 
                   <CircleDashed className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" />}
                  <div className="ml-3">
                    <p className={`text-sm font-semibold ${m.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>{m.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Submission History & Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Submissions & Feedback History</h3>
              <p className="text-xs text-slate-500 mt-1">Files submitted by the student and your official feedback.</p>
            </div>
            
            <div className="p-6 space-y-6">
              {submissions.map((sub) => (
                <div key={sub.id} className="border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all">
                  
                  {/* File Header Row */}
                  <div className="p-5 bg-white flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${sub.status === 'Pending Review' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-md font-bold text-slate-800">{sub.name}</h4>
                        <p className="text-xs text-slate-500 mb-1">{sub.milestone} • Submitted: {sub.date}</p>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          sub.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <button className="flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors">
                        <Download className="w-3 h-3 mr-2" /> Download
                      </button>
                      {sub.status === 'Pending Review' && (
                        <button 
                          onClick={() => navigate('/supervisor/feedback')}
                          className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                        >
                          <Edit className="w-3 h-3 mr-2" /> Evaluate Now
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Feedback Section (Only visible if graded) */}
                  {sub.status === 'Graded' && sub.feedback && (
                    <div className="p-5 bg-slate-50 flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-indigo-800 mb-1">Your Feedback:</p>
                        <p className="text-sm text-slate-700 italic leading-relaxed">"{sub.feedback}"</p>
                      </div>
                    </div>
                  )}

                  {sub.status === 'Pending Review' && (
                    <div className="p-5 bg-amber-50/50 flex items-center justify-center">
                      <p className="text-sm text-amber-700 font-medium">This document is waiting for your evaluation.</p>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}