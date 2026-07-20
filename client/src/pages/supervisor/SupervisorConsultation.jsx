// src/pages/supervisor/SupervisorConsultation.jsx
import { useState, useMemo } from "react";
import { Calendar, Plus, Users, Clock, Search, ChevronDown, ChevronUp, Video, Edit3 } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorConsultation() {
  const { consultations, addConsultation, students } = useData();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("schedule"); // "schedule" or "log"
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Edit State
  const [editLogData, setEditLogData] = useState(null);

  // Filter only supervisees belonging to this mocked supervisor
  const mySupervisees = students.filter(s => s.supervisorId === "F01");

  const [localLogs, setLocalLogs] = useState([...consultations]);

  const sortedLogs = useMemo(() => {
    return [...localLogs]
      .filter(log => log.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || log.topic.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
      });
  }, [localLogs, searchQuery]);

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setEditLogData(null);
    setShowModal(true);
  };

  const handleEdit = (log) => {
    setEditLogData(log);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === "edit" && editLogData) {
      const updatedLogs = localLogs.map(log => 
        log.id === editLogData.id ? { 
          ...log, 
          summary: e.target.summary.value, 
          actionItems: e.target.actionItems.value,
          videoLink: e.target.videoLink?.value || log.videoLink
        } : log
      );
      setLocalLogs(updatedLogs);
    } else {
      const studentData = mySupervisees.find(s => s.id === e.target.studentId.value);
      const newLog = {
        id: Date.now(),
        studentId: studentData.id,
        studentName: studentData.name,
        date: e.target.logDate.value,
        time: e.target.logTime.value,
        topic: e.target.topic.value,
        status: modalMode === "schedule" ? "Upcoming" : "Logged",
        summary: modalMode === "log" ? e.target.summary.value : "Scheduled Meeting",
        actionItems: modalMode === "log" ? e.target.actionItems.value : "Pending",
        videoLink: modalMode === "log" ? e.target.videoLink.value : ""
      };
      setLocalLogs([newLog, ...localLogs]);
    }
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
          <p className="text-slate-500 mt-1 font-medium">Book time with students, log summaries, or attach recorded videos.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleOpenModal("schedule")} className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-50 shadow-sm transition font-bold active:scale-95">
            <Calendar size={18} /> Book Time
          </button>
          <button onClick={() => handleOpenModal("log")} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 shadow-md transition font-bold active:scale-95">
            <Plus size={18} /> Log Completed Session
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-800">Meeting Logs & Schedule</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search student or topic..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 shadow-sm rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
          </div>
        </div>

        <div className="p-6 space-y-4">
          {sortedLogs.map((log) => {
            const isPast = log.status === "Logged" || new Date(`${log.date}T${log.time}`) < new Date();
            return (
              <div key={log.id} className="border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group bg-white">
                <div className="flex justify-between items-start mb-4" onClick={() => toggleExpand(log.id)}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${isPast ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-amber-50 text-amber-600 border border-amber-100'} transition-colors`}>
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Student: {log.studentName}</h3>
                      <div className="flex items-center text-xs text-slate-500 font-bold mt-1">
                        <Calendar size={14} className="mr-1" /> {log.date}
                        <span className="mx-2"> </span>
                        <Clock size={14} className="mr-1" /> {log.time}
                        <span className="mx-2"> </span>
                        <span className="text-indigo-600 font-black">{log.topic}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex-shrink-0 ${isPast ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {isPast ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                </div>

                {expandedId === log.id && (
                  <div className="animate-in slide-in-from-top-2 duration-300 border-t border-slate-100 pt-4 mt-2 relative">
                    {/* Edit Button for completed logs */}
                    {isPast && (
                       <button onClick={(e) => { e.stopPropagation(); handleEdit(log); }} className="absolute top-4 right-0 flex items-center text-xs font-bold text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                         <Edit3 className="w-3 h-3 mr-1" /> Edit Summary
                       </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Meeting Summary:</p>
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">{log.summary}</p>
                      </div>
                      <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200">
                        <p className="text-xs font-bold text-indigo-800 mb-2 uppercase tracking-wider">Action Items:</p>
                        <p className="text-sm text-indigo-900 leading-relaxed font-medium italic">{log.actionItems}</p>
                      </div>
                    </div>

                    {log.videoLink && (
                      <div className="mt-4 bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-center">
                        <Video className="w-4 h-4 text-blue-600 mr-2"/>
                        <a href={log.videoLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline">
                          Watch Recorded Video
                        </a>
                      </div>
                    )}

                    <div className="flex justify-center mt-3">
                      <button onClick={() => toggleExpand(log.id)} className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center transition-colors">
                        Close Details <ChevronUp size={14} className="ml-1"/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {modalMode === "schedule" ? "Book Time with Student" : modalMode === "edit" ? "Edit Meeting Details" : "Log Completed Session"}
              </h2>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              {modalMode !== "edit" && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Select Student</label>
                    <select name="studentId" required className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-medium bg-white shadow-sm">
                      <option value="">-- Choose Supervisee --</option>
                      {mySupervisees.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                      <input name="logDate" type="date" required className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm text-sm font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                      <input name="logTime" type="time" required className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm text-sm font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Topic</label>
                    <input name="topic" type="text" required placeholder="e.g. Chapter 3 Review" className="w-full px-4 py-3 border border-slate-300 shadow-sm rounded-xl outline-none focus:border-indigo-600 text-sm font-medium" />
                  </div>
                </>
              )}

              {(modalMode === "log" || modalMode === "edit") && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Meeting Summary (Editable)</label>
                    <textarea name="summary" rows="3" required defaultValue={editLogData?.summary || ""} placeholder="What was discussed?" className="w-full px-4 py-3 border border-slate-300 shadow-sm rounded-xl outline-none focus:border-indigo-600 resize-none text-sm font-medium"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Action Items (Editable)</label>
                    <textarea name="actionItems" rows="2" required defaultValue={editLogData?.actionItems || ""} placeholder="Tasks assigned..." className="w-full px-4 py-3 border border-slate-300 shadow-sm rounded-xl outline-none focus:border-indigo-600 resize-none text-sm font-medium"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center">
                      <Video className="w-4 h-4 mr-1"/> Recorded Video Link (Optional)
                    </label>
                    <input name="videoLink" type="url" defaultValue={editLogData?.videoLink || ""} placeholder="https://zoom.us/rec/..." className="w-full px-4 py-3 border border-slate-300 shadow-sm rounded-xl outline-none focus:border-indigo-600 text-sm font-medium" />
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-all">
                  {modalMode === "schedule" ? "Confirm Booking" : "Save Session Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}