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
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Lock className="text-white w-5 h-5" />
            </div>
            <Link to="/" className="font-bold text-lg sm:text-xl tracking-tight text-gray-900 font-poppins hidden sm:block">LoginSystem</Link>
            <Link to="/" className="font-bold text-base tracking-tight text-gray-900 font-poppins sm:hidden">LS</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  <LayoutDashboard size={18} />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                  </div>
                  <span className="hidden lg:inline whitespace-nowrap">{user.username}</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          {user && (
            <div className="md:hidden flex items-center gap-2">
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                <LogOut size={20} />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}

          {!user && (
            <div className="md:hidden flex items-center gap-2">
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all text-sm">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <div className="flex items-center gap-2 px-4 py-3 text-gray-900 font-semibold">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span>{user.username}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
