import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, CheckCircle, FileSignature } from "lucide-react";

export default function ProjectEvaluation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [grades, setGrades] = useState({ presentation: "", technical: "", documentation: "" });

  const totalScore = (Number(grades.presentation) || 0) + (Number(grades.technical) || 0) + (Number(grades.documentation) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => navigate('/examiner'), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-in zoom-in duration-300">
        <CheckCircle className="w-20 h-20 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Grades & Feedback Updated Successfully</h2>
        <p className="text-slate-500 mt-2">The system is recording your assessment. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 mr-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Official Evaluation Form</h1>
            <p className="text-slate-500 text-sm">Grading rubric for {id || 'Oliver Smith'}</p>
          </div>
        </div>
        <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-black text-xl border border-purple-100 shadow-inner">
          {totalScore} <span className="text-sm font-medium text-purple-500">/ 100</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
           <FileSignature className="w-5 h-5 mr-2 text-purple-600"/>
           <h3 className="text-lg font-bold text-slate-800">Scoring Matrix</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-1">Presentation & Communication</label>
              <textarea required rows="2" placeholder="Examiner comments..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none"></textarea>
            </div>
            <div className="w-32 flex-shrink-0">
              <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 20</label>
              <input type="number" max="20" min="0" required value={grades.presentation} onChange={(e) => setGrades({...grades, presentation: e.target.value})} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-100">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-1">Technical Implementation</label>
              <textarea required rows="2" placeholder="Examiner comments..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none"></textarea>
            </div>
            <div className="w-32 flex-shrink-0">
              <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 50</label>
              <input type="number" max="50" min="0" required value={grades.technical} onChange={(e) => setGrades({...grades, technical: e.target.value})} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-slate-100">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-1">Documentation & Report</label>
              <textarea required rows="2" placeholder="Examiner comments..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none"></textarea>
            </div>
            <div className="w-32 flex-shrink-0">
              <label className="block text-sm font-bold text-slate-800 mb-1 text-right">Score / 30</label>
              <input type="number" max="30" min="0" required value={grades.documentation} onChange={(e) => setGrades({...grades, documentation: e.target.value})} className="w-full p-3 bg-white border border-slate-300 rounded-lg text-lg font-bold text-center outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" className="flex items-center px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all shadow-lg active:scale-95">
              <Save className="w-5 h-5 mr-2" /> Finalize Grade & Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}