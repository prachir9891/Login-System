import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { Fingerprint, Smartphone, Cloud, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      await googleLogin(tokenResponse.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
    }
  };

  const googleSignIn = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google login failed'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-8 bg-gray-100 overflow-x-hidden">
      <div className="max-w-5xl w-full bg-white rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] sm:min-h-[600px]">
        
        {/* Left side (Form Section) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center overflow-x-hidden">
          <div className="min-w-0">
            <div className="space-y-2 mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Holla,<br />Welcome Back
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">Hey, welcome back to your special place</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm border border-red-100 animate-pulse">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-gray-50/50"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <Link to="#" className="text-gray-400 hover:text-indigo-600 transition-colors">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign In
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-gray-100"></div>
                <span className="absolute bg-white px-4 text-xs text-gray-400">Or</span>
              </div>

              <button
                type="button"
                onClick={() => googleSignIn()}
                className="w-full py-3.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 font-semibold text-gray-700"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span>Sign in with Google</span>
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Sign Up</Link>
          </div>
        </div>

        {/* Right side (Illustration Section) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 p-12 relative overflow-hidden items-center justify-center">
          {/* Decorative elements */}
          <Cloud className="absolute top-12 left-12 text-white/20 w-16 h-16 animate-bounce transition-all duration-3000" />
          <Cloud className="absolute bottom-24 right-12 text-white/20 w-20 h-20 animate-pulse" />
          
          <div className="relative z-10 w-full max-w-sm">
            {/* Main Phone Mockup */}
            <div className="bg-gray-900 rounded-[3rem] p-4 shadow-2xl border-4 border-white/10 relative transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="bg-gray-800 h-[450px] rounded-[2.5rem] overflow-hidden relative flex flex-col items-center justify-center p-8 text-white text-center">
                <div className="w-1 h-1 bg-white/20 rounded-full absolute top-4 left-1/2 -translate-x-1/2" />
                
                <div className="mb-8 p-6 bg-indigo-500/30 rounded-full animate-pulse">
                  <Lock size={80} className="text-white" />
                </div>
                
                <div className="space-y-3">
                  <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 w-3/4 animate-shimmer" />
                  </div>
                  <p className="text-xs text-white/60">Secure Authentication<br />Protecting your data</p>
                </div>
              </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-xl transform hover:scale-110 transition-transform">
              <Lock className="text-indigo-600 w-8 h-8" />
            </div>
            
            <div className="absolute -left-12 top-1/4 bg-white p-4 rounded-full shadow-xl transform hover:scale-110 transition-transform">
              <CheckCircle2 className="text-green-500 w-8 h-8" />
            </div>

            {/* Character (Simplified representation using div shapes) */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-yellow-400 rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
              <Smartphone className="text-indigo-900 w-12 h-12" />
            </div>
          </div>

          {/* Background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Login;
