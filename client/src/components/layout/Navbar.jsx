import { Bell, Search, Menu, ChevronDown } from "lucide-react";

export default function Navbar({ role }) {
  const getUserProfile = () => {
    switch (role) {
      case "student":
        return { name: "Lee Earn Hui", avatar: "LE", subtitle: "Student" };
      case "supervisor":
        return { name: "Dr. Alan Turing", avatar: "AT", subtitle: "Senior Lecturer" };
      case "coordinator":
        return { name: "Dr. Jane Watson", avatar: "JW", subtitle: "Coordinator" };
      default:
        return { name: "User", avatar: "U", subtitle: "Guest" };
    }
  };

  const user = getUserProfile();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 sticky top-0">
      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg mr-2">
        <Menu className="h-5 w-5" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 flex items-center">
        <div className="hidden md:flex items-center bg-slate-100/80 hover:bg-slate-100 border border-transparent focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 rounded-xl px-3 py-2 w-96 transition-all duration-200">
          <Search className="h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects, students, or files..." 
            className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder-slate-400 text-slate-700"
          />
        </div>
      </div>
      
      {/* Right Actions */}
      <div className="flex items-center space-x-3 lg:space-x-5">
        <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
        
        <div className="flex items-center cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm mr-2 lg:mr-3">
            {user.avatar}
          </div>
          <div className="flex-col hidden lg:flex">
            <span className="text-sm font-semibold text-slate-800 leading-tight">{user.name}</span>
            <span className="text-[11px] font-medium text-slate-500 leading-tight">{user.subtitle}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400 ml-2 hidden lg:block" />
        </div>
      </div>
    </header>
  );
}