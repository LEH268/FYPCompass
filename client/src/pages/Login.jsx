import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login redirect based on role
    navigate(`/${role}`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Panel - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-indigo-900 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex items-center space-x-3">
          <Compass className="h-10 w-10 text-blue-400" />
          <span className="text-3xl font-bold tracking-tight">FYPCompass</span>
        </div>
        
        <div className="relative z-10 max-w-lg mt-20">
          <h1 className="text-4xl font-bold leading-tight mb-6">Streamline Your Final Year Project Journey.</h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            The all-in-one platform for Sunway University students, supervisors, and coordinators to manage milestones, submissions, and feedback.
          </p>
        </div>
        <div className="relative z-10 text-sm text-indigo-400">
          &copy; 2026 Sunway University. Faculty of Computing.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex items-center space-x-2 mb-8 lg:hidden">
            <Compass className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-slate-800">FYPCompass</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-500 mb-8">Please enter your institutional credentials.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Quick Demo Role Selector */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
              {['student', 'supervisor', 'coordinator'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 capitalize text-xs font-semibold py-2 rounded-md transition-all ${
                    role === r ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Student/Staff ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 25008442"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex justify-center items-center py-2.5 px-4 mt-4 text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-md"
            >
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}