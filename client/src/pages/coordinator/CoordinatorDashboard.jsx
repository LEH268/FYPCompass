// src/pages/coordinator/CoordinatorDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCog,
  AlertTriangle,
  Download,
  FileSpreadsheet,
  FileText,
  X,
  CheckCircle,
  BookOpen,
  ShieldCheck,
  Filter,
} from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const { students, faculty } = useData();

  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [simulateExportFailure, setSimulateExportFailure] = useState(false);
  const [exportFormat, setExportFormat] = useState("excel");

  const [tableFilter, setTableFilter] = useState("All");

  const totalStudents = students.length;
  const activeSupervisors = faculty.length;
  const unassignedStudents = students.filter(
    (s) => !s.supervisorId || s.supervisorName === "Unassigned"
  );

  const getStageBadge = (stage) => {
    switch (stage) {
      case "Completed":
        return "bg-purple-100 text-purple-700";
      case "Topic Selection":
        return "bg-slate-200 text-slate-700";
      case "Proposal Review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-emerald-100 text-emerald-700";
    }
  };

  const handleExport = () => {
    setExportError(null);
    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);

      // Test Case 38: data retrieval failure
      if (simulateExportFailure || students.length === 0) {
        setExportError(
          students.length === 0
            ? "Report generation failed — no cohort data available to export."
            : "Report generation failed — required cohort data could not be retrieved."
        );
        return;
      }

      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        setShowExportModal(false);
      }, 2000);
    }, 1500);
  };

  const closeExportModal = () => {
    setShowExportModal(false);
    setExportError(null);
    setExportSuccess(false);
  };

  const filteredStudents = students.filter((s) => {
    if (tableFilter === "All") return true;
    if (tableFilter === "At Risk") return s.status === "At Risk";
    if (tableFilter === "Completed") return s.stage === "Completed";
    if (tableFilter === "Postgrad Intent") return s.gpa >= 3.8;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Overview</h1>
          <p className="text-sm text-slate-500 font-medium">
            Semester: <span className="font-bold text-slate-700 ml-1">Aug 2026</span>
          </p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center justify-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Download className="mr-2 h-4 w-4" /> Export Report
        </button>
      </div>

      {/* Coordinator Banner */}
      <div className="relative w-full h-32 md:h-40 rounded-2xl overflow-hidden shadow-sm border border-slate-200 group">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center">
          <BookOpen className="h-8 w-8 text-emerald-400 mb-2 animate-pulse" />
          <h2 className="text-white text-lg md:text-xl font-bold max-w-lg leading-tight drop-shadow-md">
            "Managing progress, shaping success."
          </h2>
          <p className="text-emerald-100 text-xs md:text-sm mt-1 max-w-md drop-shadow-sm font-medium">
            Monitor projects, coordinate evaluations, and maintain smooth FYP operations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/coordinator/students")}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="absolute right-0 top-0 w-16 h-16 bg-blue-50/50 rounded-bl-full flex justify-end p-3">
            <Users className="h-6 w-6 text-blue-500 opacity-80" />
          </div>
          <p className="text-sm text-slate-500 font-bold mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-slate-800">{totalStudents}</h3>
        </div>

        <div
          onClick={() => navigate("/coordinator/supervisors")}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="absolute right-0 top-0 w-16 h-16 bg-indigo-50/50 rounded-bl-full flex justify-end p-3">
            <UserCog className="h-6 w-6 text-indigo-500 opacity-80" />
          </div>
          <p className="text-sm text-slate-500 font-bold mb-1">Active Supervisors</p>
          <h3 className="text-3xl font-black text-slate-800">{activeSupervisors}</h3>
        </div>

        <div
          onClick={() => navigate("/coordinator/assignment")}
          className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-rose-400 transition-all cursor-pointer group"
        >
          <div className="absolute right-0 top-0 w-16 h-16 bg-rose-100/50 rounded-bl-full flex justify-end p-3">
            <AlertTriangle className="h-6 w-6 text-rose-500 opacity-80" />
          </div>
          <p className="text-sm text-rose-700 font-bold mb-1">Unassigned Projects</p>
          <h3 className="text-3xl font-black text-rose-700">{unassignedStudents.length}</h3>
          <p className="text-xs text-rose-600 mt-2 font-bold underline">Action required</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-slate-100 bg-slate-50/50 gap-4">
          <div className="flex items-center">
            <ShieldCheck className="text-indigo-600 w-5 h-5 mr-2" />
            <h3 className="text-lg font-bold text-slate-800">Cohort Progress Tracking</h3>
          </div>

          <div className="relative w-full sm:w-48">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all appearance-none"
            >
              <option value="All">View All Students</option>
              <option value="At Risk">At Risk Students</option>
              <option value="Completed">Completed Phase</option>
              <option value="Postgrad Intent">High Performers (GPA 3.8+)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 shadow-sm z-10">
              <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100">
                <th className="p-4 pl-5">Student / ID</th>
                <th className="p-4">Phase / Stage</th>
                <th className="p-4">Progress</th>
                <th className="p-4 text-center pr-5">Health</th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <p className="text-base font-bold text-slate-700 mb-1">
                      No cohort records available
                    </p>
                    <p className="text-sm text-slate-500">
                      {students.length === 0
                        ? "No students have been registered for this semester yet."
                        : `No students match the "${tableFilter}" filter.`}
                    </p>
                    {students.length > 0 && (
                      <button
                        onClick={() => setTableFilter("All")}
                        className="mt-4 px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        Show all students
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => navigate(`/coordinator/students/${s.id}`)}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 pl-5">
                      <div className="font-bold text-slate-800 group-hover:text-indigo-600">
                        {s.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        Sup: {s.supervisorName}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${getStageBadge(
                          s.stage
                        )}`}
                      >
                        {s.stage}
                      </span>
                    </td>
                    <td className="p-4 w-1/4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600 w-8">
                          {s.progress}%
                        </span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              s.progress === 100
                                ? "bg-purple-500"
                                : s.status === "At Risk"
                                ? "bg-rose-500"
                                : "bg-indigo-500"
                            }`}
                            style={{ width: `${s.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center pr-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          s.status === "Graded"
                            ? "bg-purple-100 text-purple-700"
                            : s.status === "On Track"
                            ? "bg-emerald-100 text-emerald-700"
                            : s.status === "At Risk"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {exportSuccess ? (
              <div className="p-8 text-center flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Report Generated!</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  The FYP Cohort Report ({exportFormat.toUpperCase()}) has been generated
                  successfully with {totalStudents} student records.
                </p>
              </div>
            ) : (
              <>
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Generate Cohort Report
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Export student progress data
                    </p>
                  </div>
                  <button
                    onClick={closeExportModal}
                    className="text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">
                      Report Format
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setExportFormat("excel")}
                        className={`flex items-center justify-center p-3 rounded-xl border-2 text-sm font-bold shadow-sm transition-colors ${
                          exportFormat === "excel"
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <FileSpreadsheet className="w-4 h-4 mr-2" /> Excel
                      </button>

                      <button
                        onClick={() => setExportFormat("pdf")}
                        className={`flex items-center justify-center p-3 rounded-xl border-2 text-sm font-bold shadow-sm transition-colors ${
                          exportFormat === "pdf"
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <FileText className="w-4 h-4 mr-2" /> PDF
                      </button>
                    </div>
                  </div>

                  {exportError && (
                    <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-rose-700">{exportError}</p>
                        <p className="text-[11px] text-rose-600 mt-0.5">
                          No file was generated. Please try again.
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">
                      Data Inclusion
                    </label>
                    <select className="w-full p-3 border border-slate-300 rounded-xl text-sm font-medium outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white">
                      <option>All Students (Complete Cohort)</option>
                      <option>At Risk Students Only</option>
                      <option>Pending Assignments Only</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={simulateExportFailure}
                      onChange={(e) => {
                        setSimulateExportFailure(e.target.checked);
                        if (!e.target.checked) setExportError(null);
                      }}
                      className="w-4 h-4 accent-rose-600"
                    />
                    <span className="text-[11px] font-bold text-slate-500">
                      Test mode: simulate data retrieval failure
                    </span>
                  </label>
                </div>

                <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                  <button
                    onClick={closeExportModal}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isExporting}
                    onClick={handleExport}
                    className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center shadow-md active:scale-95 transition-all"
                  >
                    {isExporting
                      ? "Generating..."
                      : exportError
                      ? "Retry Generation"
                      : `Download ${exportFormat.toUpperCase()}`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}