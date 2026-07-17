// src/pages/supervisor/SupervisorSettings.jsx
import { useState } from "react";
import { Settings, Save, CheckCircle, Users } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function SupervisorSettings() {
  const { faculty } = useData();
  const currentSupervisor = faculty.find(f => f.id === "F01"); // Mock Dr. Alan Turing
  
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
          <span className="text-sm font-semibold">Supervision settings updated successfully.</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">Supervision Settings</h1>
        <p className="text-slate-500 mt-1">Manage your supervision capacity and availability for student assignments.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">Capacity Configuration</h3>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-2">Maximum Supervisee Load</label>
              <p className="text-xs text-slate-500 mb-4">Set the maximum number of FYP students you can supervise this semester. The coordinator will not be able to assign students beyond this limit.</p>
              
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  min={currentSupervisor.currentLoad} 
                  max="15" 
                  value={maxLoad} 
                  onChange={(e) => setMaxLoad(e.target.value)} 
                  className="w-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-lg font-bold outline-none focus:border-indigo-600" 
                />
                <span className="text-sm font-medium text-slate-600">Students</span>
              </div>
              <p className="text-[11px] text-amber-600 mt-2 font-semibold">
                * Note: Cannot be set lower than your current active load ({currentSupervisor.currentLoad} students).
              </p>
            </div>

            <div className="w-full md:w-64 p-5 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 text-indigo-500 mb-2" />
              <h4 className="text-2xl font-black text-indigo-700">{currentSupervisor.currentLoad} <span className="text-sm text-indigo-400">/ {maxLoad}</span></h4>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mt-1">Current Capacity</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Assignment Availability</h4>
                <p className="text-xs text-slate-500 mt-1">Toggle your visibility for new student allocations.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                <span className={`ml-3 text-sm font-bold ${isAvailable ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isAvailable ? 'Accepting Students' : 'Unavailable'}
                </span>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" className="flex items-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95">
              <Save className="w-5 h-5 mr-2" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}