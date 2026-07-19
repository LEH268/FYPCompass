// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, User, Hash } from "lucide-react";
import bgGif from "../assets/Login and Signup Background.gif";
import cartoonGif from "../assets/cartoon.gif";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Left Panel - GIF Background */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 text-white overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ backgroundImage: `url(${bgGif})`, backgroundSize: "160%", backgroundPosition: 'center' }}
        ></div>
        <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-[2px] z-0"></div>
        <div className="relative z-10 flex items-center space-x-3">
          <GraduationCap className="h-10 w-10 text-white animate-pulse" />
          <span className="text-3xl font-bold tracking-tight">FYPCompass</span>
        </div>

        <img src={cartoonGif} alt="Cartoon" className="w-80 h-80 mb-1 mx-auto object-contain drop-shadow-lg translate-y-12"/>
        <div className="relative z-10 max-w-lg mt-20">
          <h1 className="text-4xl font-bold leading-tight mb-6 drop-shadow-lg">Begin Your Final Year Project Journey.</h1>
          <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">
            Join the all-in-one platform for Sunway University students and faculty to seamlessly collaborate, manage milestones, and track project success.
          </p>
        </div>
        <div className="relative z-10 text-sm text-white/70 font-medium">
          &copy; 2026 Sunway University. Faculty of Computing.
        </div>
      </div>
      
      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 bg-academic-pattern backdrop-blur-md overflow-y-auto">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200 transition-all hover:shadow-2xl my-8">
          <div className="flex items-center space-x-2 mb-8 lg:hidden">
            <GraduationCap className="h-8 w-8 text-indigo-700" />
            <span className="text-2xl font-bold text-slate-800">FYPCompass</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Create an account</h2>
          <p className="text-slate-500 mb-8">Register with your institutional details to get started.</p>
          
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6 shadow-inner">
              {['student', 'supervisor', 'coordinator', 'examiner'].map((r) => (
                <button
                  key={r} 
                  type="button" 
                  onClick={() => setRole(r)}
                  className={`flex-1 capitalize text-[10px] sm:text-xs font-bold py-2.5 rounded-md transition-all duration-300 ${
                    role === r ? 'bg-white shadow-md text-indigo-700 transform scale-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
                </div>
                <input type="text" required placeholder="e.g. Oliver Smith" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                {role === 'student' ? 'Student ID' : 'Staff ID'}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <Hash className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
                </div>
                <input type="text" required placeholder="e.g. 25001001" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Institutional Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
                </div>
                <input type="email" required placeholder="id@imail.sunway.edu.my" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
                </div>
                <input type={showPassword ? "text" : "password"} required placeholder="Create a strong password" className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="w-full flex justify-center items-center py-3 px-4 mt-6 text-sm font-bold rounded-lg text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition-all shadow-lg hover:shadow-indigo-700/30 transform active:scale-[0.98]">
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
            <div className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}