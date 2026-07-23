// src/pages/examiner/ProjectEvaluation.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  FileSignature,
  Clock,
  AlertCircle,
  FileX,
  RefreshCw,
} from "lucide-react";
import { useData } from "../../context/DataContext";

const EMPTY_EVALUATION = {
  presentation: "",
  presentationComment: "",
  technical: "",
  technicalComment: "",
  documentation: "",
  documentationComment: "",
  overallFeedback: "",
};

const MAX_SCORES = { presentation: 20, technical: 50, documentation: 30 };

export default function ProjectEvaluation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { students, submissions, evaluationDrafts, saveEvaluationDraft, finalizeEvaluation } =
    useData();

  const [evaluation, setEvaluation] = useState(EMPTY_EVALUATION);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitFailed, setSubmitFailed] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);

  const student = students.find((s) => s.id === id);

  // Test Case 41: a candidate with no submissions cannot be evaluated
  const studentSubmissions = (submissions || []).filter((s) => s.studentId === id);
  const hasFinalSubmission = studentSubmissions.length > 0;

  useEffect(() => {
    if (evaluationDrafts[id]) {
      setEvaluation({ ...EMPTY_EVALUATION, ...evaluationDrafts[id] });
    } else {
      setEvaluation(EMPTY_EVALUATION);
    }
  }, [id, evaluationDrafts]);

  // Guard first — before any render path that reads `student`
  if (!student) {
    return (
      <div className="p-8 text-center animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800">Candidate Not Found</h2>
        <p className="text-slate-500 mt-2">
          No candidate record exists for ID {id}.
        </p>
        <button
          onClick={() => navigate("/examiner/students")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold"
        >
          Back to Candidates
        </button>
      </div>
    );
  }

  const totalScore =
    (Number(evaluation.presentation) || 0) +
    (Number(evaluation.technical) || 0) +
    (Number(evaluation.documentation) || 0);

  const setField = (field, value) => {
    setEvaluation((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateFinal = () => {
    const next = {};

    ["presentation", "technical", "documentation"].forEach((key) => {
      const raw = String(evaluation[key]).trim();
      if (raw === "") {
        next[key] = "Score is required.";
        return;
      }
      if (!/^\d+$/.test(raw)) {
        next[key] = "Score must be a whole number.";
        return;
      }
      const n = Number(raw);
      if (n < 0) next[key] = "Score cannot be negative.";
      else if (n > MAX_SCORES[key]) next[key] = `Maximum is ${MAX_SCORES[key]}.`;
    });

    const feedback = evaluation.overallFeedback.trim();
    if (!feedback) {
      next.overallFeedback = "Overall feedback is required before finalizing.";
    } else if (feedback.length < 10) {
      next.overallFeedback = "Overall feedback must be at least 10 characters.";
    }

    return next;
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    // Draft is lenient — partial data is the point
    saveEvaluationDraft(id, evaluation);
    setIsDraftSaved(true);
    setSubmitFailed(false);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handleFinalize = (e) => {
    e.preventDefault();

    const validationErrors = validateFinal();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitFailed(false);
      return;
    }

    // Test Case 42: simulated failure. Entered data is retained in state.
    if (simulateFailure) {
      setSubmitFailed(true);
      return;
    }

    setErrors({});
    setSubmitFailed(false);
    finalizeEvaluation(id, {
      finalScore: totalScore,
      finalFeedback: evaluation.overallFeedback.trim(),
    });
    setIsSubmitted(true);
    setTimeout(() => navigate("/examiner"), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-in zoom-in duration-300">
        <CheckCircle className="w-20 h-20 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Grades &amp; Feedback Logged!</h2>
        <p className="text-slate-500 mt-2 font-medium">
          {student.name}'s final score of {totalScore}/100 has been recorded. Redirecting to
          dashboard...
        </p>
      </div>
    );
  }

  // Test Case 41: evaluation form unavailable
  if (!hasFinalSubmission) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 mr-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Official Evaluation Form</h1>
            <p className="text-slate-500 text-sm mt-1">
              Candidate: <span className="font-bold text-purple-700">{student.name}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rose-200 p-10 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-5">
            <FileX className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            Evaluation unavailable — no final submission on record
          </h2>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            {student.name} has not submitted any deliverables. The evaluation form cannot be
            opened until a final submission record exists.
          </p>
          <button
            onClick={() => navigate("/examiner/students")}
            className="px-5 py-2.5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 shadow-sm transition-colors"
          >
            Back to Candidate List
          </button>
        </div>
      </div>
    );
  }

  const scoreRow = (key, title, description, max) => (
    <div
      className={`flex flex-col md:flex-row gap-6 ${
        key === "presentation" ? "" : "pt-6 border-t border-slate-100"
      }`}
    >
      <div className="flex-1">
        <label className="block text-sm font-bold text-slate-800 mb-1">{title}</label>
        <p className="text-xs text-slate-500 mb-2 font-medium">{description}</p>
        <textarea
          rows="2"
          value={evaluation[`${key}Comment`]}
          onChange={(e) => setField(`${key}Comment`, e.target.value)}
          placeholder="Examiner comments..."
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 resize-none font-medium text-slate-700"
        />
      </div>
      <div className="w-full md:w-32 flex-shrink-0">
        <label className="block text-sm font-bold text-slate-800 mb-1 text-right">
          Score / {max}
        </label>
        <input
          type="number"
          value={evaluation[key]}
          onChange={(e) => setField(key, e.target.value)}
          aria-invalid={!!errors[key]}
          className={`w-full p-3 rounded-lg text-lg font-bold text-center outline-none shadow-inner transition-colors ${
            errors[key]
              ? "bg-rose-50 border-2 border-rose-400 text-rose-700 focus:ring-2 focus:ring-rose-500"
              : "bg-white border border-slate-300 text-purple-700 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
          }`}
        />
        {errors[key] && (
          <p className="mt-1.5 text-[11px] font-semibold text-rose-600 text-right">
            {errors[key]}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      {isDraftSaved && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-5 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-sm font-semibold">Draft saved. Evaluation not finalised.</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 mr-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Official Evaluation Form</h1>
            <p className="text-slate-500 text-sm mt-1">
              Final grading rubric for{" "}
              <span className="font-bold text-purple-700">{student.name}</span>
            </p>
          </div>
        </div>

        <div className="bg-purple-50 text-purple-700 px-6 py-3 rounded-xl font-black text-2xl border border-purple-200 shadow-sm flex items-center">
          {totalScore}{" "}
          <span className="text-sm font-bold text-purple-500 ml-2 mt-1">/ 100 PTS</span>
        </div>
      </div>

      {/* Test Case 42: simulated failure toggle */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Test Mode
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulate a submission failure to verify entered data is retained.
          </p>
        </div>
        <label className="flex items-center gap-2 cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => {
              setSimulateFailure(e.target.checked);
              if (!e.target.checked) setSubmitFailed(false);
            }}
            className="w-4 h-4 accent-rose-600"
          />
          <span className="text-xs font-bold text-slate-700">Simulate failure</span>
        </label>
      </div>

      {submitFailed && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-rose-700">
              Submission failed — the evaluation was not stored.
            </p>
            <p className="text-xs text-rose-600 mt-0.5">
              Your entered scores and feedback have been retained. Disable test mode and try
              again.
            </p>
          </div>
          <button
            onClick={handleFinalize}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-100 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <FileSignature className="w-5 h-5 mr-2 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-800">Scoring Matrix</h3>
        </div>

        <form className="p-6 space-y-8" noValidate>
          {scoreRow(
            "presentation",
            "1. Presentation & Communication",
            "Clarity, ability to answer questions, and slide quality.",
            20
          )}
          {scoreRow(
            "technical",
            "2. Technical Implementation",
            "Code quality, system complexity, and successful deployment.",
            50
          )}
          {scoreRow(
            "documentation",
            "3. Documentation & Report",
            "Thesis formatting, literature review, and accurate citations.",
            30
          )}

          <div className="pt-6 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-800 mb-1">
              Overall Examiner Feedback <span className="text-rose-500">*</span>
            </label>
            <p className="text-xs text-slate-500 mb-2 font-medium">
              This feedback is published to the student and the coordinator.
            </p>
            <textarea
              rows="4"
              value={evaluation.overallFeedback}
              onChange={(e) => setField("overallFeedback", e.target.value)}
              aria-invalid={!!errors.overallFeedback}
              placeholder="e.g. Strong implementation with good project documentation."
              className={`w-full p-3 rounded-lg text-sm outline-none resize-none font-medium transition-colors ${
                errors.overallFeedback
                  ? "bg-rose-50 border-2 border-rose-400 focus:ring-2 focus:ring-rose-500"
                  : "bg-slate-50 border border-slate-200 text-slate-700 focus:border-purple-500"
              }`}
            />
            {errors.overallFeedback && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.overallFeedback}
              </p>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center justify-center px-6 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-all shadow-sm"
            >
              <Clock className="w-5 h-5 mr-2" /> Save Draft
            </button>
            <button
              type="button"
              onClick={handleFinalize}
              className="flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all shadow-md active:scale-95"
            >
              <Save className="w-5 h-5 mr-2" /> Finalize Grade &amp; Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}