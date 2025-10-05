import React, { useContext, useState } from 'react';
import { Wallet, Mail, Lock, Eye, EyeOff, PersonStanding } from 'lucide-react';
import logo from "../assets/logo.png";
import {AuthContext} from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const {login, logout} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      console.log(data);

      login(data.username, data.token);
      navigate('/home');
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021526] via-[#1B3C53] to-[#234C6A] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img className='w-7 h-7' src={logo} />
            <span className="text-3xl font-bold text-white">FinDock</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#1B3C53]/50 backdrop-blur-sm border border-[#fff]/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Log In</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-[#D2C1B6] text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <PersonStanding className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[#021526]/50 border border-[#456882]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D2C1B6] transition-colors"
                  placeholder="Enter Username"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#D2C1B6] text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-[#021526]/50 border border-[#456882]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D2C1B6] transition-colors"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D2C1B6] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#D2C1B6] text-[#021526] rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Sign In
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-[#456882]/30"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-[#456882]/30"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-[#D2C1B6] hover:text-white font-medium transition-colors">
              Sign up
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-400 hover:text-[#D2C1B6] transition-colors">
            ← Back to home
          </a>
        </div>

        <button onClick={() => logout()}>logout</button>
      </div>
    </div>
  );
};

export default LoginPage;