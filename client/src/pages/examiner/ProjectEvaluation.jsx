import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, FileCheck, User, CheckCircle } from "lucide-react";

export default function ProjectEvaluation() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State to handle live grade calculation
  const [grades, setGrades] = useState({
    presentation: "",
    technical: "",
    documentation: ""
  });

  const totalScore = (Number(grades.presentation) || 0) + (Number(grades.technical) || 0) + (Number(grades.documentation) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Automatically redirect back to dashboard after 2 seconds
    setTimeout(() => {
      navigate('/examiner');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-in zoom-in duration-300">
        <CheckCircle className="w-20 h-20 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Evaluation Saved Successfully</h2>
        <p className="text-slate-500 mt-2">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 mr-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Project Evaluation Form</h1>
            <p className="text-slate-500 text-sm">Final Viva & Report Assessment</p>
          </div>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-black text-xl border border-indigo-100 shadow-inner">
          {totalScore} <span className="text-sm font-medium text-indigo-500">/ 100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Target Student</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mr-4">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Lee Earn Hui</p>
                <p className="text-xs text-slate-500">ID: 25008442</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-slate-500 text-xs font-medium">Project Title</span>
                <span className="font-semibold text-slate-800">Healthcare AI Diagnosis</span>
              </div>
              <div>
                <span className="block text-slate-500 text-xs font-medium">Supervisor</span>
                <span className="font-semibold text-slate-800">Dr. Alan Turing</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-100 transition-colors flex justify-center items-center">
              <FileCheck className="w-4 h-4 mr-2 text-indigo-600" /> View Final Report
            </button>
          </div>
        </div>

        {/* Right Column: Grading Rubric */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Grading Rubric</h3>
            <p className="text-xs text-slate-500 mt-1">Please grade based on the university evaluation guidelines.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            
            {/* Criteria 1 */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-800 mb-1">Presentation & Communication</label>
                <p className="text-xs text-slate-500 mb-2">Clarity, slide quality, and ability to answer Q&A.</p>
                <textarea rows="2" placeholder="Feedback on presentation..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 resize-none"></textarea>
              </div>
              <div className="w-32 flex-shrink-0">
                <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 20</label>
                <input 
                  type="number" 
                  max="20" 
                  min="0"
                  required
                  value={grades.presentation}
                  onChange={(e) => setGrades({...grades, presentation: e.target.value})}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>

            {/* Criteria 2 */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-100">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-800 mb-1">Technical Implementation</label>
                <p className="text-xs text-slate-500 mb-2">Functionality, system complexity, and architecture.</p>
                <textarea rows="2" placeholder="Feedback on technical work..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 resize-none"></textarea>
              </div>
              <div className="w-32 flex-shrink-0">
                <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 50</label>
                <input 
                  type="number" 
                  max="50" 
                  min="0"
                  required
                  value={grades.technical}
                  onChange={(e) => setGrades({...grades, technical: e.target.value})}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>

            {/* Criteria 3 */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-100">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-800 mb-1">Documentation (Final Report)</label>
                <p className="text-xs text-slate-500 mb-2">Formatting, literature review, and proper citations.</p>
                <textarea rows="2" placeholder="Feedback on report..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 resize-none"></textarea>
              </div>
              <div className="w-32 flex-shrink-0">
                <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 30</label>
                <input 
                  type="number" 
                  max="30" 
                  min="0"
                  required
                  value={grades.documentation}
                  onChange={(e) => setGrades({...grades, documentation: e.target.value})}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit"
                className="flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
              >
                <Save className="w-5 h-5 mr-2" /> Submit Final Grade
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}