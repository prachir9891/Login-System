import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Activity, 
  LogOut, 
  LayoutDashboard,
  Bell,
  Settings,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="text-gray-500 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col md:flex-row font-inter">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800 font-poppins">SecureDash</span>
        </div>

        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-semibold transition-all">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-all">
            <User size={20} />
            <span>Profile</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-all">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>

        <button 
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold transition-all"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 md:px-8 sticky top-0 z-10">
          {/* Mobile Logout Button (Above Search) */}
          <div className="md:hidden mb-3">
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg font-semibold transition-colors border border-red-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl flex-1 max-w-full sm:max-w-md border border-gray-100 min-w-0">
              <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full text-gray-600 truncate"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative flex-shrink-0">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-px bg-gray-200 flex-shrink-0"></div>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 truncate">{user?.username}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 flex-shrink-0">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-3 sm:p-4 md:p-8 space-y-6 sm:space-y-8 overflow-x-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-poppins truncate">Welcome back, {user?.username}! 👋</h2>
              <p className="text-gray-500 mt-1 text-sm">Here's what's happening with your account today.</p>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-shrink-0">
              <button className="px-3 sm:px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all text-xs sm:text-sm whitespace-nowrap">
                View Reports
              </button>
              <button className="px-3 sm:px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all text-xs sm:text-sm shadow-lg shadow-indigo-200 whitespace-nowrap">
                Manage Profile
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                <Mail size={24} />
              </div>
              <p className="text-gray-500 text-sm font-medium">Primary Email</p>
              <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">{user.email}</h3>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <p className="text-gray-500 text-sm font-medium">Account Status</p>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-lg font-bold text-gray-900">Verified</h3>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                <Activity size={24} />
              </div>
              <p className="text-gray-500 text-sm font-medium">Security Score</p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">98% Secure</h3>
            </div>
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 font-poppins">
                <Activity className="text-indigo-600 w-5 h-5" />
                Recent Activity
              </h3>
              <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { title: 'New Login Detected', time: '2 minutes ago', type: 'security', status: 'success' },
                { title: 'Password Changed', time: '1 hour ago', type: 'account', status: 'warning' },
                { title: 'Profile Photo Updated', time: '3 hours ago', type: 'profile', status: 'success' },
                { title: 'Connected from New Device', time: 'Yesterday', type: 'security', status: 'info' }
              ].map((item, index) => (
                <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.status === 'success' ? 'bg-green-50 text-green-600' : 
                      item.status === 'warning' ? 'bg-yellow-50 text-yellow-600' : 
                      'bg-blue-50 text-blue-600'
                    }`}>
                      <Activity size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    item.status === 'success' ? 'bg-green-100 text-green-700' : 
                    item.status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
