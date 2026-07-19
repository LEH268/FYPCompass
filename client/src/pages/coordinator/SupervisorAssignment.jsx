// src/pages/coordinator/SupervisorAssignment.jsx
import { useState } from "react";
import { UserPlus, AlertCircle, Search, CheckCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorAssignment() {
  const { students, faculty, assignSupervisor } = useData();
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unassignedStudents = students.filter(s => !s.supervisorId || s.supervisorName === "Unassigned");
  const filteredFaculty = faculty.filter(f => 
    f.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.expertise?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = (facultyId) => {
    if (unassignedStudents.length === 0) return;
    const studentToAssign = unassignedStudents[0];
    
    assignSupervisor(studentToAssign.id, facultyId);
    
    setAssignmentSuccess(true);
    setTimeout(() => setAssignmentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {assignmentSuccess && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-5 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-sm font-bold tracking-wide">Student successfully assigned. Workload updated.</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">Supervisor Allocation</h1>
        <p className="text-slate-500 mt-1 font-medium">Manage faculty workload and assign pending students.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className={`border rounded-xl p-4 flex items-start shadow-sm ${unassignedStudents.length > 0 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
            {unassignedStudents.length > 0 ? (
              <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <div>
              <h3 className={`text-sm font-black tracking-wide ${unassignedStudents.length > 0 ? 'text-rose-800' : 'text-emerald-800'}`}>
                {unassignedStudents.length > 0 ? 'Action Required' : 'All Clear'}
              </h3>
              <p className={`text-xs mt-1 font-bold ${unassignedStudents.length > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {unassignedStudents.length} students awaiting assignment.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Pending Students Queue</h3>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {unassignedStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm font-bold">All students have been assigned!</div>
              ) : (
                unassignedStudents.map((student) => (
                  <div key={student.id} className="p-4 bg-white border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-800 text-sm">{student.name}</span>
                      <span className="text-[10px] font-black tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded">CGPA: {student.gpa}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 font-bold tracking-wide">ID: {student.id}</p>
                    <p className="text-xs font-semibold text-indigo-700 bg-indigo-50 p-2 rounded border border-indigo-100">
                      Proposed: {student.topic}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-slate-800">Faculty Capacity Dashboard</h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search faculty or expertise..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium outline-none focus:border-indigo-600 shadow-sm" />
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto max-h-[700px]">
            {filteredFaculty.map((member) => {
              const capacityPercentage = (member.currentLoad / member.maxLoad) * 100;
              const isFull = member.currentLoad >= member.maxLoad;
              
              return (
                <div key={member.id} className={`p-5 rounded-xl border transition-all shadow-sm ${isFull ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200 hover:border-indigo-300 bg-white'}`}>
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 font-black text-sm border-2 border-white shadow-sm ${isFull ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{member.name}</h4>
                      <p className="text-xs font-medium text-slate-500 truncate max-w-[150px]">{member.expertise}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-600">Current Load</span>
                      <span className={isFull ? 'text-rose-600 font-black' : 'text-slate-800 font-bold'}>{member.currentLoad} / {member.maxLoad} Students</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                      <div className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-rose-500' : capacityPercentage >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${capacityPercentage}%` }}></div>
                    </div>
                  </div>
                  
                  <button onClick={() => handleAssign(member.id)} disabled={isFull || unassignedStudents.length === 0} className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${isFull || unassignedStudents.length === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white border border-slate-300 text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm active:scale-95'}`}>
                    <UserPlus className="w-4 h-4 mr-2" /> {isFull ? 'Capacity Full' : 'Assign Top Student'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}