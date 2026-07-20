// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import bgGif from "../assets/Login and Signup Background.gif";

export default function Login() {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 已修复：添加了缺失的状态
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(`/${role}`);
  };

  const handleForgotSubmit = () => {
    if (step === 1) {
      if (!email) return alert("Please enter your email.");
      alert("OTP sent successfully!");
      setStep(2);
    } else {
      if (otp.length !== 6) return alert("Invalid OTP.");
      alert("OTP Verified!");
      setShowForgotModal(false);
      setStep(1);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Left Panel - GIF Background */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 text-white overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ backgroundImage: `url(${bgGif})`, backgroundSize: "160%", backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-[2px] z-0" />
        
        <div className="relative z-10 flex items-center space-x-3">
          <GraduationCap className="h-10 w-10 text-white animate-pulse" />
          <span className="text-3xl font-bold tracking-tight">FYPCompass</span>
        </div>
        
        <div className="relative z-10 max-w-lg mt-20">
          <h1 className="text-4xl font-bold leading-tight mb-6 drop-shadow-lg">Streamline Your Final Year Project Journey.</h1>
          <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">
            The all-in-one platform for Sunway University students, supervisors, coordinators, and examiners to manage milestones, submissions, and feedback.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-white/70 font-medium">
          &copy; 2026 Sunway University. Faculty of Computing.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 bg-academic-pattern backdrop-blur-md">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 transition-all hover:shadow-2xl">
          <div className="flex items-center space-x-2 mb-8 lg:hidden">
            <GraduationCap className="h-8 w-8 text-indigo-700" />
            <span className="text-2xl font-bold text-slate-800">FYPCompass</span>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-slate-500 mb-8">Please enter your institutional credentials.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6 shadow-inner">
              {['student', 'supervisor', 'coordinator', 'examiner'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 capitalize text-xs font-bold py-2.5 rounded-md transition-all duration-300 ${
                    role === r ? 'bg-white shadow-md text-indigo-700' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input type="text" required placeholder="e.g. john.doe" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <button 
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-3 mt-6 text-sm font-bold rounded-lg text-white bg-indigo-700 hover:bg-indigo-800 transition-all">
              Sign In <ArrowRight className="ml-2 h-4 w-4 inline" />
            </button>
          </form>

          {/* Forgot Password Modal */}
          {showForgotModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Forgot Password</h2>
                <p className="text-sm text-slate-500 mb-6">{step === 1 ? "Enter your email" : "Enter 6-digit OTP"}</p>
                
                {step === 1 ? (
                  <input type="email" placeholder="example@imail.sunway.edu.my" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-indigo-500" />
                ) : (
                  <input type="text" maxLength={6} placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border rounded-lg px-4 py-3 mb-3 text-center tracking-[8px] text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                )}

                <button onClick={handleForgotSubmit} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  {step === 1 ? "Send OTP" : "Verify OTP"}
                </button>
                <button onClick={() => setShowForgotModal(false)} className="mt-4 w-full text-slate-500 hover:text-slate-700 text-sm">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}