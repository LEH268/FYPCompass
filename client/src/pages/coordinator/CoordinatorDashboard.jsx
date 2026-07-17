// src/pages/coordinator/CoordinatorDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCog, AlertTriangle, Download, ChevronRight, FileSpreadsheet, X, CheckCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const { students, faculty } = useData();
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const totalStudents = students.length;
  const activeSupervisors = faculty.length;
  const unassignedStudents = students.filter(s => !s.supervisorId || s.supervisorName === "Unassigned");

  const getStageBadge = (stage) => {
    switch (stage) {
      case "Completed": return "bg-purple-100 text-purple-700";
      case "Topic Selection": return "bg-slate-200 text-slate-700";
      case "Proposal Review": return "bg-blue-100 text-blue-700";
      default: return "bg-emerald-100 text-emerald-700";
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        setShowExportModal(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Overview</h1>
          <p className="text-slate-500 mt-1">Semester: <span className="font-semibold text-slate-700">Aug 2026</span></p>
        </div>
        <button onClick={() => setShowExportModal(true)} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" /> Export Cohort Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div onClick={() => navigate('/coordinator/students')} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-blue-50/50 rounded-bl-full flex justify-end p-3">
            <Users className="h-6 w-6 text-blue-500 opacity-80" />
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-slate-800">{totalStudents}</h3>
        </div>
                  
        <div onClick={() => navigate('/coordinator/supervisors')} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-indigo-50/50 rounded-bl-full flex justify-end p-3">
            <UserCog className="h-6 w-6 text-indigo-500 opacity-80" />
          </div>
          <p className="text-sm text-slate-500 font-medium mb-1">Active Supervisors</p>
          <h3 className="text-3xl font-black text-slate-800">{activeSupervisors}</h3>
        </div>
        
        <div onClick={() => navigate('/coordinator/assignment')} className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden hover:shadow-md hover:border-rose-400 transition-all cursor-pointer group">
          <div className="absolute right-0 top-0 w-16 h-16 bg-rose-100/50 rounded-bl-full flex justify-end p-3">
            <AlertTriangle className="h-6 w-6 text-rose-500 opacity-80" />
          </div>
          <p className="text-sm text-rose-700 font-medium mb-1">Unassigned Projects</p>
          <h3 className="text-3xl font-black text-rose-700">{unassignedStudents.length}</h3>
          <p className="text-xs text-rose-600 mt-2 font-bold underline">Action required</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Complete Cohort Tracking</h3>
        </div>
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 shadow-sm z-10">
              <tr className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100">
                <th className="p-4 pl-5">Student / ID</th>
                <th className="p-4">Phase / Stage</th>
                <th className="p-4">Progress</th>
                <th className="p-4 text-center pr-5">Health</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {students.map((s) => (
                <tr key={s.id} onClick={() => navigate(`/coordinator/students/${s.id}`)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="p-4 pl-5">
                    <div className="font-bold text-slate-800 group-hover:text-indigo-600">{s.name}</div>
                    <div className="text-xs text-slate-500">Sup: {s.supervisorName}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${getStageBadge(s.stage)}`}>
                      {s.stage}
                    </span>
                  </td>
                  <td className="p-4 w-1/4">
                    <div className="flex items-center">
                      <span className="text-xs font-bold text-slate-600 w-8">{s.progress}%</span>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${s.progress === 100 ? 'bg-purple-500' : s.status === 'At Risk' ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${s.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center pr-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${
                      s.status === 'Graded' ? 'bg-purple-100 text-purple-700' :
                      s.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' :
                      s.status === 'At Risk' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {exportSuccess ? (
              <div className="p-8 text-center flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Report Generated!</h3>
                <p className="text-sm text-slate-500 mt-2">The FYP Cohort Report has been downloaded to your device.</p>
              </div>
            ) : (
              <>
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-lg font-bold text-slate-800">Generate Cohort Report</h2>
                  <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-slate-600">Select the format and data range for the cohort progress report.</p>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Report Format</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center p-3 border-2 border-indigo-600 bg-indigo-50 text-indigo-700 rounded-xl font-semibold text-sm">
                        <FileSpreadsheet className="w-4 h-4 mr-2" /> Excel (.xlsx)
                      </button>
                      <button className="flex items-center justify-center p-3 border border-slate-200 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-50">
                        PDF Document
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 mt-4">Data Inclusion</label>
                    <select className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-600">
                      <option>All Students (Complete Cohort)</option>
                      <option>At Risk Students Only</option>
                      <option>Pending Assignments Only</option>
                    </select>
                  </div>
                </div>
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                  <button onClick={() => setShowExportModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleExport} disabled={isExporting} className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center">
                    {isExporting ? 'Generating...' : 'Download Report'}
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