// src/pages/student/ProposalSubmission.jsx
import { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  X,
  Download,
  Send,
  ShieldAlert,
  MessageSquare,
  PlusCircle,
  Filter,
  Save,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useData } from "../../context/DataContext";

const MILESTONES = [
  "Project Proposal",
  "System Requirements Document (SRD)",
  "System Design Specification (SDS)",
  "System Implementation",
  "Final Report",
];

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "zip"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
  "multipart/x-zip",
];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPT_ATTR = ".pdf,.doc,.docx,.zip";
const MIN_DESCRIPTION_LENGTH = 10;

export default function ProposalSubmission() {
  const { submissions, addSubmission, updateSubmission, deleteSubmission } =
    useData();

  // Modals & filters
  const [showForm, setShowForm] = useState(false);
  const [filterMilestone, setFilterMilestone] = useState("All");

  // Form state — milestone now starts EMPTY so "not selected" is a real state
  const [editingId, setEditingId] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [studentMessage, setStudentMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const mySubmissions = submissions
    .filter((sub) => sub.studentId === "25001001")
    .filter(
      (sub) => filterMilestone === "All" || sub.milestone === filterMilestone
    )
    .sort((a, b) => b.id - a.id);

  // ---------- Validation ----------

  const validateFile = (candidate) => {
    const ext = candidate.name.split(".").pop()?.toLowerCase() || "";

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return `Invalid file type ".${ext}". Only PDF, DOC, DOCX and ZIP files are accepted.`;
    }
    if (candidate.type && !ALLOWED_MIME_TYPES.includes(candidate.type)) {
      return "Invalid file type. Only PDF, DOC, DOCX and ZIP files are accepted.";
    }
    if (candidate.size > MAX_FILE_SIZE) {
      return `File is too large (${(candidate.size / 1024 / 1024).toFixed(
        1
      )}MB). Maximum allowed size is 50MB.`;
    }
    if (candidate.size === 0) {
      return "This file appears to be empty. Please select a valid document.";
    }
    return null;
  };

  // Draft mode is lenient: only the file is mandatory.
  const validateForm = (isDraft = false) => {
    const nextErrors = {};

    if (!selectedMilestone) {
      nextErrors.milestone = "Please select a milestone type.";
    }

    if (!fileName) {
      nextErrors.file = "Please upload a document before submitting.";
    } else if (errors.file) {
      nextErrors.file = errors.file; // keep an existing file-type error
    }

    if (!isDraft) {
      const trimmed = studentMessage.trim();
      if (!trimmed) {
        nextErrors.description = "Please provide a description of this submission.";
      } else if (trimmed.length < MIN_DESCRIPTION_LENGTH) {
        nextErrors.description = `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`;
      }
    }

    return nextErrors;
  };

  // ---------- Handlers ----------

  const handleFileChange = (e) => {
    const picked = e.target.files && e.target.files[0];
    if (!picked) return;

    setTouched((t) => ({ ...t, file: true }));
    const error = validateFile(picked);

    if (error) {
      setErrors((prev) => ({ ...prev, file: error }));
      setFile(null);
      if (!editingId) setFileName(null);
      e.target.value = "";
      return;
    }

    setErrors((prev) => {
      const { file: _removed, ...rest } = prev;
      return rest;
    });
    setFile(picked);
    setFileName(picked.name);
    e.target.value = "";
  };

  const handleMilestoneChange = (e) => {
    const value = e.target.value;
    setSelectedMilestone(value);
    setTouched((t) => ({ ...t, milestone: true }));
    setErrors((prev) => {
      if (!value) return { ...prev, milestone: "Please select a milestone type." };
      const { milestone: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setStudentMessage(value);
    if (touched.description) {
      setErrors((prev) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return { ...prev, description: "Please provide a description of this submission." };
        }
        if (trimmed.length < MIN_DESCRIPTION_LENGTH) {
          return {
            ...prev,
            description: `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`,
          };
        }
        const { description: _removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setSelectedMilestone("");
    setFile(null);
    setFileName(null);
    setStudentMessage("");
    setErrors({});
    setTouched({});
  };

  const openNewForm = () => {
    clearForm();
    setShowForm(true);
  };

  const openEditForm = (sub) => {
    setEditingId(sub.id);
    setSelectedMilestone(sub.milestone);
    setFile(null);
    setFileName(sub.file);
    setStudentMessage(sub.studentMessage || "");
    setErrors({});
    setTouched({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    clearForm();
  };

  const processSubmission = (status) => {
    const isDraft = status === "Draft";
    const validationErrors = validateForm(isDraft);

    // Mark every field as touched so all messages surface at once
    setTouched({ milestone: true, file: true, description: true });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Nothing is written to storage — submission is rejected here.
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const payload = {
        milestone: selectedMilestone,
        file: fileName,
        date: new Date().toISOString().split("T")[0],
        studentMessage: studentMessage.trim(),
        status: status,
      };

      if (editingId) {
        updateSubmission(editingId, {
          ...payload,
          ...(status === "Pending Review" && {
            similarityScore: Math.floor(Math.random() * 15) + 5,
          }),
        });
        setSuccessMessage(
          isDraft
            ? "Your draft has been updated."
            : "Your draft has been submitted for review."
        );
      } else {
        addSubmission({
          studentId: "25001001",
          studentName: "Oliver Smith",
          ...payload,
          similarityScore: isDraft ? null : Math.floor(Math.random() * 15) + 5,
        });
        setSuccessMessage(
          isDraft
            ? "Your draft has been saved. You can edit it any time."
            : "Your file has been successfully saved to your records."
        );
      }

      setIsSubmitting(false);
      setShowForm(false);
      clearForm();
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

  const handleDeleteDraft = (id) => {
    if (window.confirm("Delete this draft? This action cannot be undone.")) {
      deleteSubmission(id);
    }
  };

  const errorCount = Object.keys(errors).length;
  const showError = (field) => touched[field] && errors[field];

  // ---------- Render ----------

  if (successMessage) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-200">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Deliverable Processed!
        </h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          {successMessage}
        </p>
        <button
          onClick={() => setSuccessMessage(null)}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Back to Submissions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Submissions &amp; Feedback
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your deliverables and track supervisor feedback.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="flex items-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> New Submission
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-slate-800">
            Submission History
          </h3>

          <div className="relative w-full sm:w-72">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filterMilestone}
              onChange={(e) => setFilterMilestone(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all appearance-none"
            >
              <option value="All">All Milestones</option>
              {MILESTONES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {mySubmissions.length === 0 ? (
            <div className="bg-slate-50 p-10 text-center rounded-xl border border-slate-200 border-dashed">
              <p className="text-slate-500 font-bold">
                No submissions found for the selected filter.
              </p>
            </div>
          ) : (
            mySubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800">
                      {sub.milestone}
                    </h3>
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                        sub.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : sub.status === "Draft"
                          ? "bg-slate-200 text-slate-700"
                          : sub.status === "Pending Review"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Last Updated: {sub.date}
                  </p>

                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-indigo-500" />
                      <p className="text-sm font-semibold text-slate-700">
                        {sub.file}
                      </p>
                    </div>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {sub.status !== "Draft" && (
                    <div className="flex items-center gap-2 mb-4 p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                      <ShieldAlert className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-semibold text-slate-600">
                        Turnitin Similarity:
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          sub.similarityScore > 20
                            ? "text-rose-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {sub.similarityScore || 0}%
                      </span>
                    </div>
                  )}

                  {sub.studentMessage && (
                    <div className="mt-2">
                      <p className="text-xs font-bold text-slate-500">
                        Your Notes:
                      </p>
                      <p className="text-sm text-slate-700 italic">
                        "{sub.studentMessage}"
                      </p>
                    </div>
                  )}

                  {sub.status === "Draft" && (
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => openEditForm(sub)}
                        className="flex items-center px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit Draft
                      </button>
                      <button
                        onClick={() => handleDeleteDraft(sub.id)}
                        className="flex items-center px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col justify-center">
                  <p className="text-xs font-bold text-indigo-800 mb-2 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" /> Supervisor
                    Feedback:
                  </p>
                  {sub.status === "Draft" ? (
                    <p className="text-sm text-slate-400 italic">
                      This is a draft. Submit to request evaluation.
                    </p>
                  ) : sub.feedback ? (
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "{sub.feedback}"
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 italic">
                      Pending evaluation by supervisor.
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Submission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit Draft" : "New Submission"}
              </h2>
              <button
                onClick={closeForm}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6 space-y-6" noValidate>
              {/* Summary banner — makes "validation fails" unambiguous in a screenshot */}
              {errorCount > 0 && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-rose-700">
                      Submission rejected — {errorCount} required field
                      {errorCount > 1 ? "s are" : " is"} incomplete.
                    </p>
                    <p className="text-xs text-rose-600 mt-0.5">
                      Please complete the highlighted fields below and try again.
                    </p>
                  </div>
                </div>
              )}

              {/* Milestone */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Select Milestone <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedMilestone}
                  onChange={handleMilestoneChange}
                  onBlur={() => setTouched((t) => ({ ...t, milestone: true }))}
                  aria-invalid={!!showError("milestone")}
                  className={`w-full px-4 py-3 rounded-xl outline-none text-sm font-semibold transition-colors ${
                    showError("milestone")
                      ? "bg-rose-50 border-2 border-rose-400 text-slate-700 focus:ring-2 focus:ring-rose-500"
                      : "bg-slate-50 border border-slate-200 text-slate-700 focus:ring-2 focus:ring-indigo-600"
                  }`}
                >
                  <option value="" disabled={false}>
                    -- Select a milestone --
                  </option>
                  {MILESTONES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {showError("milestone") && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.milestone}
                  </p>
                )}
              </div>

              {/* File */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Upload Document <span className="text-rose-500">*</span>
                </label>
                {!fileName ? (
                  <div
                    className={`mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-dashed rounded-xl transition-colors cursor-pointer relative ${
                      showError("file")
                        ? "border-rose-400 bg-rose-50/50 hover:border-rose-500"
                        : "border-slate-300 bg-slate-50/50 hover:border-indigo-500"
                    }`}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept={ACCEPT_ATTR}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="space-y-2 text-center">
                      <UploadCloud
                        className={`mx-auto h-12 w-12 ${
                          showError("file") ? "text-rose-400" : "text-slate-400"
                        }`}
                      />
                      <p
                        className={`font-bold ${
                          showError("file") ? "text-rose-600" : "text-indigo-600"
                        }`}
                      >
                        Click or drag file to upload
                      </p>
                      <p className="text-xs text-slate-500">
                        PDF, DOC, DOCX, ZIP up to 50MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-indigo-600" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {fileName}
                        </p>
                        {editingId && !file && (
                          <p className="text-xs text-slate-500">
                            Current file. Remove it to upload a replacement.
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setFileName(null);
                        setErrors((prev) => ({
                          ...prev,
                          file: "Please upload a document before submitting.",
                        }));
                        setTouched((t) => ({ ...t, file: true }));
                      }}
                      className="text-slate-500 hover:text-rose-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {showError("file") && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.file}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows="3"
                  value={studentMessage}
                  onChange={handleDescriptionChange}
                  onBlur={() => setTouched((t) => ({ ...t, description: true }))}
                  aria-invalid={!!showError("description")}
                  placeholder="e.g., Hi Dr., I have updated chapter 3 methodology..."
                  className={`w-full px-4 py-3 rounded-xl outline-none resize-none text-sm transition-colors ${
                    showError("description")
                      ? "bg-rose-50 border-2 border-rose-400 focus:ring-2 focus:ring-rose-500"
                      : "bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-600"
                  }`}
                />
                <div className="mt-2 flex items-start justify-between gap-3">
                  {showError("description") ? (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Required for final submission. Minimum{" "}
                      {MIN_DESCRIPTION_LENGTH} characters.
                    </p>
                  )}
                  <span className="text-xs text-slate-400 shrink-0">
                    {studentMessage.trim().length}/{MIN_DESCRIPTION_LENGTH}
                  </span>
                </div>
              </div>

              <div className="flex pt-4 space-x-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="w-1/2 flex justify-center items-center px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 transition-all shadow-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? "Update Draft" : "Save as Draft"}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-1/2 flex justify-center items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Final Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}