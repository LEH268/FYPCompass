// src/pages/student/MilestoneTimeline.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  CircleDashed,
  AlertTriangle,
  ArrowRight,
  Eye,
  Filter,
  CalendarX,
  TrendingUp,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import {
  MILESTONE_STATUS,
  toMilestoneStatus,
  formatDueDate,
} from "../../constants/milestones";

const CURRENT_STUDENT_ID = "25001001";

export default function MilestoneTimeline() {
  const navigate = useNavigate();
  const { submissions, getAssignedMilestones } = useData();
  const [statusFilter, setStatusFilter] = useState("All");

  const assignedMilestones = getAssignedMilestones(CURRENT_STUDENT_ID);

  const mySubmissions = useMemo(
    () => (submissions || []).filter((s) => s.studentId === CURRENT_STUDENT_ID),
    [submissions]
  );

  const milestones = useMemo(
    () =>
      assignedMilestones.map((m) => {
        const sub = mySubmissions.find((s) => s.milestone === m.title);
        return { ...m, status: toMilestoneStatus(sub?.status) };
      }),
    [assignedMilestones, mySubmissions]
  );

  const progress = useMemo(() => {
    const total = milestones.length;
    const count = (st) => milestones.filter((m) => m.status === st).length;
    const completed = count(MILESTONE_STATUS.COMPLETED);
    return {
      total,
      completed,
      pending: count(MILESTONE_STATUS.PENDING),
      revision: count(MILESTONE_STATUS.REVISION),
      drafts: count(MILESTONE_STATUS.DRAFT),
      notSubmitted: count(MILESTONE_STATUS.NOT_SUBMITTED),
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [milestones]);

  const filteredMilestones = milestones.filter(
    (m) => statusFilter === "All" || m.status === statusFilter
  );

  const hasAssignedMilestones = milestones.length > 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case MILESTONE_STATUS.COMPLETED:
        return <CheckCircle className="text-emerald-500 bg-white rounded-full shadow-sm" size={28} />;
      case MILESTONE_STATUS.PENDING:
        return <Clock className="text-amber-500 bg-white rounded-full shadow-sm" size={28} />;
      case MILESTONE_STATUS.REVISION:
        return <AlertTriangle className="text-rose-500 bg-white rounded-full shadow-sm" size={28} />;
      case MILESTONE_STATUS.DRAFT:
        return <CircleDashed className="text-blue-400 bg-white rounded-full shadow-sm" size={28} />;
      default:
        return <CircleDashed className="text-slate-300 bg-white rounded-full" size={28} />;
    }
  };

  const cardTone = (status) => {
    switch (status) {
      case MILESTONE_STATUS.PENDING:
        return "border-amber-200 bg-amber-50/50 shadow-sm ring-1 ring-amber-500/10";
      case MILESTONE_STATUS.COMPLETED:
        return "border-emerald-100 bg-emerald-50/20";
      case MILESTONE_STATUS.REVISION:
        return "border-rose-200 bg-rose-50/40";
      case MILESTONE_STATUS.DRAFT:
        return "border-blue-200 bg-blue-50/50";
      default:
        return "border-slate-100 bg-slate-50/50 hover:border-slate-200";
    }
  };

  const badgeTone = (status) => {
    switch (status) {
      case MILESTONE_STATUS.COMPLETED:
        return "bg-emerald-100 text-emerald-700";
      case MILESTONE_STATUS.PENDING:
        return "bg-amber-100 text-amber-700";
      case MILESTONE_STATUS.REVISION:
        return "bg-rose-100 text-rose-700";
      case MILESTONE_STATUS.DRAFT:
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-200 text-slate-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Milestone Timeline</h1>
          <p className="text-slate-500 mt-1">
            Track your project phases and upcoming submission deadlines.
          </p>
        </div>

        {hasAssignedMilestones && (
          <div className="relative w-full sm:w-52">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all appearance-none"
            >
              <option value="All">All Statuses</option>
              <option value={MILESTONE_STATUS.COMPLETED}>Completed</option>
              <option value={MILESTONE_STATUS.PENDING}>Pending Review</option>
              <option value={MILESTONE_STATUS.REVISION}>Revision Required</option>
              <option value={MILESTONE_STATUS.DRAFT}>Drafts</option>
              <option value={MILESTONE_STATUS.NOT_SUBMITTED}>Not Submitted</option>
            </select>
          </div>
        )}
      </div>

      {hasAssignedMilestones && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-800">Overall Progress</h2>
            </div>
            <span className="text-2xl font-bold text-indigo-600">{progress.percent}%</span>
          </div>

          <div
            className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-700"
              style={{ width: `${progress.percent}%` }}
            />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-600">
            {progress.completed} of {progress.total} milestones completed
          </p>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { n: progress.completed, l: "Completed", c: "emerald" },
              { n: progress.pending, l: "Pending", c: "amber" },
              { n: progress.revision, l: "Revision", c: "rose" },
              { n: progress.drafts, l: "Drafts", c: "blue" },
              { n: progress.notSubmitted, l: "Not Sub.", c: "slate" },
            ].map((s) => (
              <div key={s.l} className={`p-3 rounded-xl bg-${s.c}-50 border border-${s.c}-100`}>
                <p className={`text-xl font-bold text-${s.c}-700`}>{s.n}</p>
                <p className={`text-[10px] font-bold uppercase tracking-wide text-${s.c}-600`}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {!hasAssignedMilestones ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-5">
              <CalendarX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">No milestones assigned</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Your supervisor has not assigned any milestones to your project yet. This page
              will update automatically once they do.
            </p>
          </div>
        ) : filteredMilestones.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700 mb-1">
              No milestones match this filter
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              No milestones currently have the status "{statusFilter}".
            </p>
            <button
              onClick={() => setStatusFilter("All")}
              className="px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Show all milestones
            </button>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
            {filteredMilestones.map((milestone) => (
              <div key={milestone.id} className="relative pl-8">
                <div className="absolute -left-[15px] top-1">
                  {getStatusIcon(milestone.status)}
                </div>

                <div className={`p-5 rounded-xl border transition-all ${cardTone(milestone.status)}`}>
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h3
                      className={`text-lg font-bold ${
                        milestone.status === MILESTONE_STATUS.NOT_SUBMITTED
                          ? "text-slate-600"
                          : "text-slate-800"
                      }`}
                    >
                      {milestone.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold whitespace-nowrap ${badgeTone(
                        milestone.status
                      )}`}
                    >
                      {milestone.status}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    {milestone.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-medium">
                    <span className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm w-fit">
                      Due: {formatDueDate(milestone.dueDate)}
                    </span>

                    {milestone.status === MILESTONE_STATUS.NOT_SUBMITTED ? (
                      <button
                        onClick={() => navigate("/student/proposal")}
                        className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center justify-center font-bold text-sm transition-colors shadow-sm w-full sm:w-auto"
                      >
                        Make Submission <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/student/proposal")}
                        className="text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-lg flex items-center justify-center font-bold text-sm transition-colors w-full sm:w-auto shadow-sm"
                      >
                        <Eye className="w-4 h-4 mr-2" /> View Status &amp; File
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}