// src/pages/student/FeedbackNotifications.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Bell,
  Filter,
  Inbox,
  Check,
  CheckCheck,
  FileText,
  Calendar,
  Eye,
  BellOff,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import {
  MILESTONE_NAMES,
  SUBMISSION_STATUS,
  CURRENT_STUDENT,
} from "../../constants/milestones";

export default function FeedbackNotifications() {
  const navigate = useNavigate();
  const {
    submissions,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useData();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("feedback");

  // A feedback record = any submission that has supervisor feedback attached
  const allFeedback = useMemo(
    () =>
      (submissions || [])
        .filter((s) => s.studentId === CURRENT_STUDENT.id)
        .filter((s) => s.feedback !== null && s.feedback !== undefined && s.feedback !== "")
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [submissions]
  );

  const filteredFeedback = useMemo(
    () =>
      allFeedback.filter(
        (f) => categoryFilter === "All" || f.milestone === categoryFilter
      ),
    [allFeedback, categoryFilter]
  );

  const myNotifications = useMemo(
    () =>
      (notifications || [])
        .filter((n) => n.userId === CURRENT_STUDENT.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [notifications]
  );

  const unreadCount = myNotifications.filter((n) => !n.read).length;
  const hasAnyFeedback = allFeedback.length > 0;

  const statusTone = (status) => {
    switch (status) {
      case SUBMISSION_STATUS.APPROVED:
        return "bg-emerald-100 text-emerald-700";
      case SUBMISSION_STATUS.REVISION:
        return "bg-rose-100 text-rose-700";
      case SUBMISSION_STATUS.PENDING:
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-200 text-slate-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Feedback &amp; Notifications</h1>
        <p className="text-slate-500 mt-1">
          Review supervisor comments on your deliverables and system alerts.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("feedback")}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "feedback"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Supervisor Feedback
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]">
            {allFeedback.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "notifications"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Bell className="w-4 h-4" />
          Notifications
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px]">
              {unreadCount} new
            </span>
          )}
        </button>
      </div>

      {/* ---------- FEEDBACK TAB ---------- */}
      {activeTab === "feedback" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-slate-800">Feedback History</h3>

            <div className="relative w-full sm:w-72">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all appearance-none"
              >
                <option value="All">All Categories</option>
                {MILESTONE_NAMES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {!hasAnyFeedback ? (
              // Test Case 14: no feedback at all
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-5">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">
                  No feedback available
                </h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Your supervisor has not left any feedback yet. Feedback appears here once
                  a submitted deliverable has been reviewed.
                </p>
              </div>
            ) : filteredFeedback.length === 0 ? (
              // Test Case 13 negative path: category has no records
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-700 mb-1">
                  No feedback in this category
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  No feedback records found for "{categoryFilter}".
                </p>
                <button
                  onClick={() => setCategoryFilter("All")}
                  className="px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Show all categories
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Showing {filteredFeedback.length} of {allFeedback.length} feedback records
                </p>

                {filteredFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2 gap-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                        <h4 className="font-bold text-slate-800 text-sm">{fb.milestone}</h4>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded whitespace-nowrap ${statusTone(
                          fb.status
                        )}`}
                      >
                        {fb.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {fb.date}
                      </span>
                      <span>File: {fb.file}</span>
                    </div>

                    <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4">
                      <p className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> Supervisor Feedback
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed italic">
                        "{fb.feedback}"
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/student/proposal")}
                      className="mt-3 flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" /> View submission
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* ---------- NOTIFICATIONS TAB ---------- */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-slate-800">System Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllNotificationsAsRead(CURRENT_STUDENT.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all as read
              </button>
            )}
          </div>

          <div className="p-6 space-y-3">
            {myNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-5">
                  <BellOff className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">No notifications</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  You have no system notifications at the moment.
                </p>
              </div>
            ) : (
              myNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                    !n.read
                      ? "bg-indigo-50/40 border-indigo-100"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        !n.read ? "font-bold text-slate-800" : "font-medium text-slate-600"
                      }`}
                    >
                      {n.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {n.date}
                      {!n.read && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[9px] font-bold uppercase">
                          Unread
                        </span>
                      )}
                    </p>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => markNotificationAsRead(n.id)}
                      title="Mark as read"
                      className="p-1.5 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-700 rounded-full transition-colors shrink-0"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}