// src/pages/supervisor/SupervisorSettings.jsx
import { useState } from "react";
import { Settings, Save, CheckCircle, Users } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorSettings() {
  const { faculty } = useData();
  const currentSupervisor = faculty.find(f => f.id === "F01"); 
  const [maxLoad, setMaxLoad] = useState(currentSupervisor.maxLoad);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      {isSaved && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-5 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-sm font-semibold">Supervision limit & settings saved.</span>
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Supervision Settings</h1>
        <p className="text-slate-500 mt-1">Configure the number of students you can supervise this semester.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">Student Capacity Configuration</h3>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-2">Maximum Supervisee Limit</label>
              <p className="text-xs text-slate-500 mb-4">Select the total number of students you wish to supervise. You will not be assigned more students once you reach this limit.</p>
              
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  min={currentSupervisor.currentLoad} 
                  max="20" 
                  value={maxLoad} 
                  onChange={(e) => setMaxLoad(e.target.value)} 
                  className="w-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-lg font-bold outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
                />
                <span className="text-sm font-bold text-slate-600">Students Max</span>
              </div>
              <p className="text-[11px] text-amber-600 mt-2 font-semibold">
                * Cannot be lower than your current active count ({currentSupervisor.currentLoad} students).
              </p>
            </div>
            
            <div className="w-full md:w-64 p-5 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 text-indigo-500 mb-2" />
              <h4 className="text-2xl font-black text-indigo-700">{currentSupervisor.currentLoad} <span className="text-sm text-indigo-400">/ {maxLoad}</span></h4>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mt-1">Current Supervision Slot</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button type="submit" className="flex items-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95">
              <Save className="w-5 h-5 mr-2" /> Save Limits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}