import { useState, useMemo } from "react";
import { Calendar, Plus, Users, Clock, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorConsultation() {
  const { consultations, addConsultation, students } = useData();
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter only supervisees belonging to this mocked supervisor (Dr. Alan Turing context -> F01)
  const mySupervisees = students.filter(s => s.supervisorId === "F01");

  const sortedLogs = useMemo(() => {
    return [...consultations]
      .filter(log => log.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || log.topic.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
      });
  }, [consultations, searchQuery]);

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const studentData = mySupervisees.find(s => s.id === e.target.studentId.value);
    
    addConsultation({
      studentId: studentData.id,
      studentName: studentData.name,
      date: e.target.logDate.value,
      time: e.target.logTime.value,
      topic: e.target.topic.value,
      summary: e.target.summary.value,
      actionItems: e.target.actionItems.value,
      status: "Logged"
    });
    
    setShowModal(false);
  };

  const toggleExpand = (id) => {
    if (expandedId === id) setExpandedId(null);
    else setExpandedId(id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Consultation Management</h1>
          <p className="text-slate-500 mt-1">Schedule meetings or log summaries for your supervisees.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-md transition font-semibold active:scale-95">
          <Plus size={18} /> Record New Session
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-800">Meeting Logs</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search student or topic..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
          </div>
        </div>
        <div className="p-6 space-y-4">
          {sortedLogs.map((log) => {
            const isPast = new Date(`${log.date}T${log.time}`) < new Date();
            return (
              <div key={log.id} className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors cursor-pointer group" onClick={() => toggleExpand(log.id)}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${isPast ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'} transition-colors`}>
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Student: {log.studentName}</h3>
                      <div className="flex items-center text-xs text-slate-500 font-medium mt-1">
                        <Calendar size={14} className="mr-1" /> {log.date}
                        <span className="mx-2"> </span>
                        <Clock size={14} className="mr-1" /> {log.time}
                        <span className="mx-2"> </span>
                        <span className="text-indigo-600 font-bold">{log.topic}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex-shrink-0 ${isPast ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isPast ? 'Logged' : 'Upcoming'}
                  </span>
                </div>
                {expandedId === log.id && (
                  <div className="animate-in slide-in-from-top-2 duration-300 border-t border-slate-100 pt-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="text-xs font-bold text-slate-700 mb-2">Meeting Summary:</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{log.summary}</p>
                      </div>
                      <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                        <p className="text-xs font-bold text-indigo-800 mb-2">Action Items:</p>
                        <p className="text-sm text-indigo-700 leading-relaxed">{log.actionItems}</p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3">
                      <button className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center transition-colors">
                        Close Details <ChevronUp size={14} className="ml-1"/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {sortedLogs.length === 0 && (
            <div className="text-center text-slate-500 py-10 w-full bg-slate-50 rounded-xl border border-dashed border-slate-300">
              No meetings found.
            </div>
          )}
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">Record Meeting Session</h2>
              <p className="text-sm text-slate-500">Document the consultation details and assign action items.</p>
            </div>
            <form onSubmit={handleLogSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Select Student</label>
                <select name="studentId" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm bg-white">
                  <option value="">-- Choose Supervisee --</option>
                  {mySupervisees.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                  <input name="logDate" type="date" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                  <input name="logTime" type="time" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Discussion Topic</label>
                <input name="topic" type="text" required placeholder="e.g. Chapter 3 Methodology" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Meeting Summary</label>
                <textarea name="summary" rows="3" required placeholder="What was evaluated or discussed?" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Action Items</label>
                <textarea name="actionItems" rows="2" required placeholder="Tasks assigned to the student." className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 resize-none"></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
                  Save Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}