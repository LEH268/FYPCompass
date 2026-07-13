import { useState } from "react";
import { Users, Calendar, Clock, PlusCircle, CheckCircle, Search } from "lucide-react";

export default function ConsultationRecords() {
  const [showModal, setShowModal] = useState(false);
  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "Aug 12, 2026",
      time: "10:00 AM",
      topic: "Proposal Draft Review",
      notes: "Discussed the scope of the AI model. Supervisor advised to narrow down the dataset to local hospitals only.",
      status: "Verified"
    },
    {
      id: 2,
      date: "July 28, 2026",
      time: "2:30 PM",
      topic: "Initial Topic Brainstorming",
      notes: "Presented 3 ideas. Settled on Healthcare AI. Need to read 5 more IEEE papers before next meeting.",
      status: "Verified"
    }
  ]);

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      date: "Today",
      time: "Just now",
      topic: e.target.topic.value,
      notes: e.target.notes.value,
      status: "Pending Verification"
    };
    setLogs([newLog, ...logs]);
    setShowModal(false);
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
          <PlusCircle className="w-4 h-4 mr-2" /> Log New Session
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-slate-800">Meeting History</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            
            {logs.map((log) => (
              <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                  <Users className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-indigo-600 font-bold text-sm">{log.topic}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      log.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium flex items-center mb-3">
                    <Calendar className="w-3 h-3 mr-1" /> {log.date} 
                    <span className="mx-2">•</span> 
                    <Clock className="w-3 h-3 mr-1" /> {log.time}
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {log.notes}
                  </p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>

      {/* New Log Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Log Consultation Session</h2>
              <p className="text-sm text-slate-500">Record the details of your recent meeting.</p>
            </div>
            <form onSubmit={handleLogSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Discussion Topic</label>
                <input name="topic" type="text" required placeholder="e.g. Chapter 2 Review" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Meeting Notes / Action Items</label>
                <textarea name="notes" rows="4" required placeholder="What was discussed? What are your next steps?" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm resize-none"></textarea>
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