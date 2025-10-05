import React, { useState } from 'react';
import { Wallet, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021526] via-[#1B3C53] to-[#234C6A] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Wallet className="w-10 h-10 text-[#D2C1B6]" />
            <span className="text-3xl font-bold text-white">FinDock</span>
          </div>
          <p className="text-gray-400">Create your account and start investing</p>
        </div>

        {/* Register Card */}
        <div className="bg-[#1B3C53]/50 backdrop-blur-sm border border-[#456882]/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
          
          <div className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-[#D2C1B6] text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[#021526]/50 border border-[#456882]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D2C1B6] transition-colors"
                  placeholder="Enter Username"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[#D2C1B6] text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[#021526]/50 border border-[#456882]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D2C1B6] transition-colors"
                  placeholder="Enter Email"
                />
              </div>
            </div>

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[#D2C1B6] text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-[#021526]/50 border border-[#456882]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D2C1B6] transition-colors"
                  placeholder="Re-write to Confirm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D2C1B6] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#D2C1B6] text-[#021526] rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-[#456882]/30"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-[#456882]/30"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-[#D2C1B6] hover:text-white font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-400 hover:text-[#D2C1B6] transition-colors">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;