// src/pages/examiner/ProjectEvaluation.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, CheckCircle, FileSignature, Clock } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ProjectEvaluation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { students } = useData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [grades, setGrades] = useState({ presentation: "", technical: "", documentation: "" });

  const student = students.find(s => s.id === id);
  const totalScore = (Number(grades.presentation) || 0) + (Number(grades.technical) || 0) + (Number(grades.documentation) || 0);

  const handleFinalize = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => navigate('/examiner'), 2000);
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-in zoom-in duration-300">
        <CheckCircle className="w-20 h-20 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Grades & Feedback Logged!</h2>
        <p className="text-slate-500 mt-2">The system is finalizing {student.name}'s result. Redirecting to dashboard...</p>
      </div>
    );
  }

  if (!student) return <div className="p-8 text-center">Candidate not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      {/* Draft Saved Toast */}
      {isDraftSaved && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-5 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-sm font-semibold">Evaluation draft saved securely.</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 mr-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Official Evaluation Form</h1>
            <p className="text-slate-500 text-sm mt-1">Final grading rubric for <span className="font-bold text-slate-700">{student.name}</span></p>
          </div>
        </div>
        <div className="bg-purple-50 text-purple-700 px-6 py-3 rounded-xl font-black text-2xl border border-purple-100 shadow-sm flex items-center">
          {totalScore} <span className="text-sm font-medium text-purple-500 ml-2 mt-1">/ 100 PTS</span>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
           <FileSignature className="w-5 h-5 mr-2 text-purple-600"/>
           <h3 className="text-lg font-bold text-slate-800">Scoring Matrix</h3>
        </div>
        <form className="p-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-1">1. Presentation & Communication</label>
              <p className="text-xs text-slate-500 mb-2">Clarity, ability to answer questions, and slide quality.</p>
              <textarea rows="2" placeholder="Examiner comments..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none"></textarea>
            </div>
            <div className="w-full md:w-32 flex-shrink-0">
              <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 20</label>
              <input type="number" max="20" min="0" value={grades.presentation} onChange={(e) => setGrades({...grades, presentation: e.target.value})} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-inner" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 pt-6 border-t border-slate-100">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-1">2. Technical Implementation</label>
              <p className="text-xs text-slate-500 mb-2">Code quality, system complexity, and successful deployment.</p>
              <textarea rows="2" placeholder="Examiner comments..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none"></textarea>
            </div>
            <div className="w-full md:w-32 flex-shrink-0">
              <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 50</label>
              <input type="number" max="50" min="0" value={grades.technical} onChange={(e) => setGrades({...grades, technical: e.target.value})} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-inner" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 pt-6 border-t border-slate-100">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-1">3. Documentation & Report</label>
              <p className="text-xs text-slate-500 mb-2">Thesis formatting, literature review, and accurate citations.</p>
              <textarea rows="2" placeholder="Examiner comments..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none"></textarea>
            </div>
            <div className="w-full md:w-32 flex-shrink-0">
              <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 30</label>
              <input type="number" max="30" min="0" value={grades.documentation} onChange={(e) => setGrades({...grades, documentation: e.target.value})} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-inner" />
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-4">
            <button type="button" onClick={handleSaveDraft} className="flex items-center px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-all shadow-sm">
              <Clock className="w-5 h-5 mr-2" /> Save Draft
            </button>
            <button type="button" onClick={handleFinalize} disabled={totalScore === 0} className="flex items-center px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all shadow-lg active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed">
              <Save className="w-5 h-5 mr-2" /> Finalize Grade & Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}