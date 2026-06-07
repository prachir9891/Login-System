import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, Lock, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide navbar on login and register pages as they have their own brand/logo
  const hideNavbar = ['/login', '/register'].includes(location.pathname);
  if (hideNavbar) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        {/* Mobile Layout: Stacked */}
        <div className="md:hidden flex flex-col gap-3 py-3">
          {/* Top Row: Logo and Menu/Hamburger */}
          <div className="flex justify-between items-center min-w-0">
            <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="text-white w-5 h-5" />
              </div>
              <Link to="/" className="font-bold text-base tracking-tight text-gray-900 font-poppins truncate">LS</Link>
            </div>
            
            {/* Mobile Hamburger/Login-Signup */}
            {user ? (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors flex-shrink-0"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            ) : (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-xs sm:text-sm">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all text-xs sm:text-sm">Sign Up</Link>
              </div>
            )}
          </div>

          {/* User Profile Section (Mobile Only) */}
          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} />
              </div>
              <span className="text-gray-900 font-semibold text-sm truncate">{user.username}</span>
            </div>
          )}

          {/* Logout Button Below Profile (Mobile Only) */}
          {user && (
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg font-semibold transition-colors">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Desktop Layout: Horizontal */}
        <div className="hidden md:flex justify-between h-16 items-center min-w-0">
          <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="text-white w-5 h-5" />
            </div>
            <Link to="/" className="font-bold text-lg md:text-xl tracking-tight text-gray-900 font-poppins truncate">LoginSystem</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm lg:text-base">
                  <LayoutDashboard size={18} />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                  </div>
                  <span className="hidden lg:inline truncate max-w-[120px]">{user.username}</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all text-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden pb-3 border-t border-gray-100">
            <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2.5 text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <div className="flex items-center gap-2 px-3 py-2.5 text-gray-900 font-semibold text-sm">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="truncate">{user.username}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
