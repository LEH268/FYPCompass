import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigates exactly to the selected role's route (e.g., "/examiner")
    navigate(`/${role}`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Left Panel - Dynamic Video Background (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 text-white overflow-hidden shadow-2xl">
        
        {/* Abstract Looping Tech Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://cdn.pixabay.com/video/2020/05/25/40134-424785663_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-indigo-900/70 bg-gradient-to-b from-indigo-900/50 to-indigo-900/95 z-0"></div>

        <div className="relative z-10 flex items-center space-x-3">
          <Compass className="h-10 w-10 text-blue-400 animate-pulse" />
          <span className="text-3xl font-bold tracking-tight">FYPCompass</span>
        </div>
        
        <div className="relative z-10 max-w-lg mt-20">
          <h1 className="text-4xl font-bold leading-tight mb-6 drop-shadow-lg">Streamline Your Final Year Project Journey.</h1>
          <p className="text-indigo-100 text-lg leading-relaxed drop-shadow-md">
            The all-in-one platform for Sunway University students, supervisors, coordinators, and examiners to manage milestones, submissions, and feedback.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-indigo-300 font-medium">
          &copy; 2026 Sunway University. Faculty of Computing.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 bg-white/95 backdrop-blur-md">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 transition-all hover:shadow-2xl">
          <div className="flex items-center space-x-2 mb-8 lg:hidden">
            <Compass className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-slate-800">FYPCompass</span>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-500 mb-8">Please enter your institutional credentials.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Quick Demo Role Selector */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6 shadow-inner">
              {['student', 'supervisor', 'coordinator', 'examiner'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 capitalize text-xs font-bold py-2.5 rounded-md transition-all duration-300 ${
                    role === r ? 'bg-white shadow-md text-indigo-600 transform scale-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Student/Staff ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
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
                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex justify-center items-center py-3 px-4 mt-6 text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/30 transform active:scale-[0.98]"
            >
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}