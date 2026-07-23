// src/pages/supervisor/SupervisorSettings.jsx
import { useState } from "react";
import {
  Settings,
  Save,
  CheckCircle,
  Users,
  AlertCircle,
  UserCheck,
  UserX,
} from "lucide-react";
import { useData } from "../../context/DataContext";

const CURRENT_SUPERVISOR_ID = "F01";
const MAX_ALLOWED_CAPACITY = 20;

export default function SupervisorSettings() {
  const { faculty, updateSupervisorSettings } = useData();
  const currentSupervisor = faculty.find((f) => f.id === CURRENT_SUPERVISOR_ID);

  const [maxLoad, setMaxLoad] = useState(currentSupervisor?.maxLoad ?? 0);
  const [isAvailable, setIsAvailable] = useState(
    currentSupervisor?.isAvailable ?? true
  );
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  if (!currentSupervisor) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-800">Supervisor record not found.</h2>
      </div>
    );
  }

  const validateCapacity = (value) => {
    const raw = String(value).trim();

    if (raw === "") return "Capacity is required.";
    if (!/^-?\d+$/.test(raw)) return "Capacity must be a whole number.";

    const n = Number(raw);
    if (n < 0) return "Capacity cannot be a negative value.";
    if (n === 0) return "Capacity must be at least 1.";
    if (n < currentSupervisor.currentLoad) {
      return `Capacity cannot be lower than your current active count (${currentSupervisor.currentLoad} students).`;
    }
    if (n > MAX_ALLOWED_CAPACITY) {
      return `Capacity cannot exceed ${MAX_ALLOWED_CAPACITY} students.`;
    }
    return null;
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    setMaxLoad(value);
    if (error) setError(validateCapacity(value));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const validationError = validateCapacity(maxLoad);
    if (validationError) {
      setError(validationError);
      setIsSaved(false);
      // Nothing is written — existing capacity remains unchanged.
      return;
    }

    setError(null);
    updateSupervisorSettings(CURRENT_SUPERVISOR_ID, {
      maxLoad: Number(maxLoad),
      isAvailable,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAvailabilityChange = (value) => {
    setIsAvailable(value);
    // Availability applies immediately so the Coordinator page reflects it
    updateSupervisorSettings(CURRENT_SUPERVISOR_ID, { isAvailable: value });
  };

  const displayedMax = Number(maxLoad) > 0 ? maxLoad : currentSupervisor.maxLoad;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      {isSaved && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center z-50 animate-in slide-in-from-top-5 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
          <span className="text-sm font-semibold">Supervision limit &amp; settings saved.</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">Supervision Settings</h1>
        <p className="text-slate-500 mt-1">
          Configure the number of students you can supervise this semester.
        </p>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
          {isAvailable ? (
            <UserCheck className="w-5 h-5 mr-2 text-emerald-600" />
          ) : (
            <UserX className="w-5 h-5 mr-2 text-rose-600" />
          )}
          <h3 className="text-lg font-bold text-slate-800">Availability Status</h3>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-500 mb-4">
            When set to unavailable, the Coordinator will be blocked from assigning new
            students to you. Existing supervisees are not affected.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleAvailabilityChange(true)}
              className={`py-4 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                isAvailable
                  ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <UserCheck className="w-4 h-4" /> Available
            </button>
            <button
              type="button"
              onClick={() => handleAvailabilityChange(false)}
              className={`py-4 px-4 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                !isAvailable
                  ? "bg-rose-50 border-rose-500 text-rose-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <UserX className="w-4 h-4" /> Unavailable
            </button>
          </div>

          {!isAvailable && (
            <div className="mt-4 flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <p className="text-xs font-semibold text-rose-700">
                You are marked unavailable. New student assignments to you are blocked.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Capacity */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">
            Student Capacity Configuration
          </h3>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-8" noValidate>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Maximum Supervisee Limit
              </label>
              <p className="text-xs text-slate-500 mb-4">
                Select the total number of students you wish to supervise. You will not be
                assigned more students once you reach this limit.
              </p>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={maxLoad}
                  onChange={handleCapacityChange}
                  aria-invalid={!!error}
                  className={`w-24 p-3 rounded-lg text-lg font-bold outline-none transition-colors ${
                    error
                      ? "bg-rose-50 border-2 border-rose-400 focus:ring-2 focus:ring-rose-500"
                      : "bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
                  }`}
                />
                <span className="text-sm font-bold text-slate-600">Students Max</span>
              </div>

              {error ? (
                <div className="mt-3 flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-rose-700">
                      Update rejected — {error}
                    </p>
                    <p className="text-[11px] text-rose-600 mt-0.5">
                      Existing capacity remains {currentSupervisor.maxLoad}.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-amber-600 mt-2 font-semibold">
                  * Cannot be lower than your current active count (
                  {currentSupervisor.currentLoad} students) or higher than{" "}
                  {MAX_ALLOWED_CAPACITY}.
                </p>
              )}
            </div>

            <div className="w-full md:w-64 p-5 bg-indigo-50 border border-indigo-100 rounded-xl flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 text-indigo-500 mb-2" />
              <h4 className="text-2xl font-black text-indigo-700">
                {currentSupervisor.currentLoad}{" "}
                <span className="text-sm text-indigo-400">/ {displayedMax}</span>
              </h4>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mt-1">
                Current Supervision Slot
              </p>
              <p className="text-[11px] font-bold text-slate-500 mt-2">
                Saved limit: {currentSupervisor.maxLoad}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              <Save className="w-5 h-5 mr-2" /> Save Limits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}