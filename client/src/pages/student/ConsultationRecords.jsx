import { useState, useMemo } from "react";
import { Users, Calendar, Clock, PlusCircle, Search, ChevronDown, ChevronUp } from "lucide-react";

export default function ConsultationRecords() {
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "2026-07-16",
      time: "10:00",
      topic: "Initial Topic Brainstorming",
      notes: "Presented 3 ideas. Settled on Healthcare AI. Need to read 5 more IEEE papers before next meeting.",
      status: "Verified",
      supervisorFeedback: "Good start. Focus heavily on finding a local dataset."
    },
    {
      id: 2,
      date: "2026-07-18",
      time: "14:30",
      topic: "System Design Review",
      notes: "Going to review the ERD and Sequence diagrams. Preparing questions about database normalization.",
      status: "Upcoming",
      supervisorFeedback: null
    },
    {
      id: 3,
      date: "2026-07-17",
      time: "11:00",
      topic: "Proposal Draft Review",
      notes: "Discussed the scope of the AI model. Supervisor advised to narrow down the dataset to local hospitals only.",
      status: "Pending Verification",
      supervisorFeedback: null
    }
  ]);

  // Sort logs chronologically (Past -> Present -> Future)
  const sortedLogs = useMemo(() => {
    return [...logs]
      .filter(log => log.topic.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });
  }, [logs, searchQuery]);

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      date: e.target.logDate.value,
      time: e.target.logTime.value,
      topic: e.target.topic.value,
      notes: e.target.notes.value,
      status: "Pending Verification",
      supervisorFeedback: null
    };
    setLogs([...logs, newLog]);
    setShowModal(false);
  };

  const toggleExpand = (id) => {
    if (expandedId === id) setExpandedId(null);
    else setExpandedId(id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Consultation Records</h1>
          <p className="text-slate-500 mt-1">Log your supervisor meetings to track progress.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Book / Log Session
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-slate-800">Meeting Timeline</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            
            {sortedLogs.map((log) => (
              <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer" onClick={() => toggleExpand(log.id)}>
                
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10 ${log.status === 'Upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                  <Users className="w-5 h-5" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-indigo-600 font-bold text-sm">{log.topic}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded flex-shrink-0 ml-2 ${
                      log.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 
                      log.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  
                  <div className="text-xs text-slate-500 font-medium flex items-center mb-3">
                    <Calendar className="w-3 h-3 mr-1" /> {log.date} 
                    <span className="mx-2">•</span> 
                    <Clock className="w-3 h-3 mr-1" /> {log.time}
                  </div>

                  {expandedId === log.id ? (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <div className="mt-3">
                        <p className="text-xs font-bold text-slate-700 mb-1">My Notes / Discussion:</p>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                          {log.notes}
                        </p>
                      </div>
                      {log.supervisorFeedback && (
                        <div className="mt-3">
                          <p className="text-xs font-bold text-indigo-700 mb-1">Supervisor Feedback:</p>
                          <p className="text-sm text-indigo-800 bg-indigo-50 p-3 rounded-lg border border-indigo-100 italic leading-relaxed">
                            "{log.supervisorFeedback}"
                          </p>
                        </div>
                      )}
                      <button className="mt-3 w-full py-1.5 flex justify-center items-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                        Hide Details <ChevronUp className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  ) : (
                    <button className="mt-1 flex items-center text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">
                      View Details <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {sortedLogs.length === 0 && (
              <div className="text-center text-slate-500 py-10 w-full relative z-10 bg-white/50 backdrop-blur-sm rounded-xl">
                No consultations found. Book your first session!
              </div>
            )}

          </div>
        </div>
      </div>

      {/* New Log Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Book / Log Consultation</h2>
              <p className="text-sm text-slate-500">Schedule an upcoming meeting or record a past one.</p>
            </div>
            <form onSubmit={handleLogSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                  <input name="logDate" type="date" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                  <input name="logTime" type="time" required className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Discussion Topic</label>
                <input name="topic" type="text" required placeholder="e.g. Chapter 2 Review" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Meeting Notes / Agenda</label>
                <textarea name="notes" rows="4" required placeholder="What was discussed? Or what do you plan to discuss?" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
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