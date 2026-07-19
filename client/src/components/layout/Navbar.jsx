// src/components/layout/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Menu, ChevronDown, LogOut, User, Check, CheckCircle2 } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function Navbar({ role }) {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const getUserProfile = () => {
    switch (role) {
      case "student":
        return { id: "25001001", name: "Oliver Smith", avatar: "OS", subtitle: "Student" };
      case "supervisor":
        return { id: "F01", name: "Dr. Alan Turing", avatar: "AT", subtitle: "Senior Lecturer" };
      case "coordinator":
        return { id: "C01", name: "Dr. Jane Watson", avatar: "JW", subtitle: "Coordinator" };
      case "examiner":
        return { id: "E01", name: "Prof. John Smith", avatar: "JS", subtitle: "Examiner" };
      default:
        return { id: "000", name: "User", avatar: "U", subtitle: "Guest" };
    }
  };

  const user = getUserProfile();
  
  // Filter notifications for current user
  const userNotifications = notifications.filter(n => n.userId === user.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 sticky top-0 shadow-sm">
      <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg mr-2 transition-colors">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 flex items-center">
        <div className="hidden md:flex items-center bg-slate-100/80 hover:bg-slate-100 border border-transparent focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 rounded-xl px-3 py-2 w-96 transition-all duration-200">
          <Search className="h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search projects, students, or files..." className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder-slate-400 text-slate-700 font-medium" />
        </div>
      </div>
      
      <div className="flex items-center space-x-3 lg:space-x-5">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)} 
            className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <p className="text-sm font-bold text-slate-800">Notifications</p>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => markAllNotificationsAsRead(user.id)} 
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {userNotifications.length === 0 ? (
                  <div className="p-6 text-center flex flex-col items-center">
                    <CheckCircle2 className="h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-sm text-slate-500 font-medium">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {userNotifications.map(n => (
                      <div key={n.id} className={`p-4 transition-colors flex items-start justify-between gap-3 ${!n.read ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}>
                        <div className="flex-1">
                          <p className={`text-sm ${!n.read ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>{n.message}</p>
                          <p className="text-xs text-slate-400 mt-1.5 font-medium">{n.date}</p>
                        </div>
                        {!n.read && (
                          <button 
                            onClick={() => markNotificationAsRead(n.id)}
                            className="p-1.5 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-700 rounded-full transition-colors flex-shrink-0"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50">
                <button className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm mr-2 lg:mr-3 border border-indigo-200">
              {user.avatar}
            </div>
            <div className="flex-col hidden lg:flex">
              <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
              <span className="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-wider">{user.subtitle}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 ml-2 hidden lg:block" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{user.subtitle}</p>
              </div>
              <div className="p-2 space-y-1">
                <button onClick={() => setDropdownOpen(false)} className="w-full flex items-center px-3 py-2 text-sm font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                  <User className="h-4 w-4 mr-3 text-slate-400" /> My Profile
                </button>
              </div>
              <div className="p-2 border-t border-slate-100">
                <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-sm font-bold text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
                  <LogOut className="h-4 w-4 mr-3" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}