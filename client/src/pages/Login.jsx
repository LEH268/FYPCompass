import { useState } from "react";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
// 1. Import useNavigate
import { useNavigate } from "react-router-dom"; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
  // 2. Initialize the navigate function
  const navigate = useNavigate(); 

  // 3. Create a function to handle the login
  const handleLogin = (e) => {
    e.preventDefault(); // This stops the page from refreshing
    
    // For now, since this is just a UI prototype, we will 
    // directly send the user to the student dashboard.
    // Later, you would add your backend authentication logic here.
    navigate("/student/dashboard"); 
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Left Branding Section */}
      <div className="hidden md:flex w-1/2 bg-blue-900 text-white flex-col justify-center px-16">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap size={50}/>
          <h1 className="text-4xl font-bold">
            FYPCompass
          </h1>
        </div>
        <p className="text-xl leading-relaxed">
          A centralized Final Year Project supervision and milestone tracking system.
        </p>
        <p className="mt-6 text-blue-200">
          Track progress • Submit milestones • Receive feedback • Manage supervision
        </p>
      </div>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white shadow-xl rounded-xl p-10 w-[400px]">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 mb-8">
            Login to your FYPCompass account
          </p>

          {/* 4. Attach the handleLogin function to the form's onSubmit event */}
          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* Email */}
            <div>
              <label className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="example@student.com"
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full mt-2 px-4 py-3 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium">
                Login As
              </label>
              <select
                className="w-full mt-2 px-4 py-3 border rounded-lg"
              >
                <option>Student</option>
                <option>Supervisor</option>
                <option>FYP Coordinator</option>
                <option>Examiner</option>
              </select>
            </div>

            <button
              // Ensure this is a submit button (which is the default, but good practice to declare)
              type="submit" 
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}