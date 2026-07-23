// src/pages/student/ConsultationRecords.jsx
import { useState, useMemo } from "react";
import {
  Users,
  Calendar,
  Clock,
  PlusCircle,
  Search,
  ChevronDown,
  CalendarSearch,
  X,
  CalendarX,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import { CURRENT_STUDENT } from "../../constants/milestones";

export default function ConsultationRecords() {
  const { consultations, addConsultation } = useData();
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Date range filter (Test Cases 16 & 17)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState(null);

  const myConsultations = useMemo(
    () => (consultations || []).filter((c) => c.studentId === CURRENT_STUDENT.id),
    [consultations]
  );

  const hasAnyRecords = myConsultations.length > 0;
  const isFiltering = Boolean(searchQuery || startDate || endDate);

  const sortedLogs = useMemo(() => {
    return myConsultations
      .filter((log) =>
        log.topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((log) => {
        // Inclusive on both ends; ISO date strings compare correctly as strings
        if (startDate && log.date < startDate) return false;
        if (endDate && log.date > endDate) return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA; // Most recent first
      });
  }, [myConsultations, searchQuery, startDate, endDate]);

  const handleStartDateChange = (value) => {
    setStartDate(value);
    setDateError(endDate && value && value > endDate ? "Start date cannot be after the end date." : null);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
    setDateError(startDate && value && startDate > value ? "Start date cannot be after the end date." : null);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setDateError(null);
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    addConsultation({
      studentId: CURRENT_STUDENT.id,
      studentName: CURRENT_STUDENT.name,
      date: e.target.logDate.value,
      time: e.target.logTime.value,
      topic: e.target.topic.value,
      summary: e.target.notes.value,
      actionItems: "Pending supervisor review",
      status: "Upcoming",
    });
    setShowModal(false);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Consultation Records</h1>
          <p className="text-slate-500 mt-1 font-medium">
            Log your supervisor meetings and track action items.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Book / Log Session
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-slate-800">Meeting Timeline</h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Date range filter */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 pt-1">
            <div className="flex items-center gap-2 text-slate-500 shrink-0">
              <CalendarSearch className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Date Range</span>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  End date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm"
                />
              </div>
            </div>

            {isFiltering && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {dateError && (
            <p className="text-xs font-semibold text-rose-600">{dateError}</p>
          )}

          {isFiltering && !dateError && (
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Showing {sortedLogs.length} of {myConsultations.length} records
            </p>
          )}
        </div>

        <div className="p-6">
          {sortedLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-5">
                <CalendarX className="w-8 h-8" />
              </div>
              {!hasAnyRecords ? (
                <>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    No consultation records found
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm">
                    You have not logged any consultation sessions yet. Book your first
                    session to get started.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    No consultation records found
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mb-4">
                    No sessions match the selected criteria
                    {startDate || endDate
                      ? ` (${startDate || "any"} to ${endDate || "any"})`
                      : ""}
                    .
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Clear filters
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {sortedLogs.map((log) => (
                <div
                  key={log.id}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer"
                  onClick={() => toggleExpand(log.id)}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-slate-500 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10 ${
                      log.status === "Upcoming"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    }`}
                  >
                    <Users className="w-5 h-5" />
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-indigo-700 font-bold text-sm">{log.topic}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded flex-shrink-0 ml-2 tracking-wider ${
                          log.status === "Logged"
                            ? "bg-emerald-100 text-emerald-700"
                            : log.status === "Upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-bold flex items-center mb-3">
                      <Calendar className="w-3 h-3 mr-1" /> {log.date}
                      <span className="mx-2"> </span>
                      <Clock className="w-3 h-3 mr-1" /> {log.time}
                    </div>

                    {expandedId === log.id ? (
                      <div className="animate-in slide-in-from-top-2 duration-300">
                        <div className="mt-3">
                          <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
                            Notes / Summary:
                          </p>
                          <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-medium">
                            {log.summary}
                          </p>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-bold text-indigo-700 mb-1 uppercase tracking-wider">
                            Supervisor Action Items:
                          </p>
                          <p className="text-sm text-indigo-800 bg-indigo-50 p-3 rounded-xl border border-indigo-100 italic leading-relaxed font-medium">
                            {log.actionItems}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button className="mt-1 flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                        View Details <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">Book / Log Consultation</h2>
            </div>
            <form onSubmit={handleLogSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                  <input
                    name="logDate"
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                  <input
                    name="logTime"
                    type="time"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Discussion Topic
                </label>
                <input
                  name="topic"
                  type="text"
                  required
                  placeholder="e.g. Needs help with Data Cleaning"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Meeting Agenda / Notes
                </label>
                <textarea
                  name="notes"
                  rows="4"
                  required
                  placeholder="What do you want to discuss?"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none text-sm font-medium"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-all"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}