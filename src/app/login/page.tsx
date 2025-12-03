'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const addToast = useUIStore((state) => state.addToast);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data);
      addToast({
        message: 'Login successful! Welcome back.',
        severity: 'success',
      });
      router.push('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      addToast({
        message: errorMessage,
        severity: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tight">HELP STUDY</span>
            </div>
            <div className="w-20 h-1.5 bg-white/60 rounded-full"></div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Welcome to the<br />
            Admin Portal
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-md leading-relaxed">
            Manage your platform with powerful tools designed for efficiency and growth.
          </p>

          {/* Feature Pills */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:translate-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Secure Authentication</p>
                <p className="text-sm text-white/80">Enterprise-grade security</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:translate-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Lightning Fast</p>
                <p className="text-sm text-white/80">Optimized performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-tl-[100px] border-l-2 border-t-2 border-white/20"></div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 sm:px-8 lg:px-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">HELP STUDY</span>
          </div>

          {/* Form Header */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-3">Welcome Back</h2>
            <p className="text-slate-600 text-lg">Sign in to access your admin dashboard</p>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-sm text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-sm text-blue-800">
              <p><span className="font-medium">Username:</span> emilys</p>
              <p><span className="font-medium">Password:</span> emilyspass</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  {...register('username')}
                  autoComplete="username"
                  className={`w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 shadow-lg hover:shadow-xl ${
                    errors.username ? 'border-red-400 shadow-red-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  placeholder="Enter your username"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.username && (
                <p className="mt-3 text-sm text-red-600 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  autoComplete="current-password"
                  className={`w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 shadow-lg hover:shadow-xl pr-14 ${
                    errors.password ? 'border-red-400 shadow-red-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-emerald-600 transition-all duration-200 rounded-lg hover:bg-emerald-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.password && (
                <p className="mt-3 text-sm text-red-600 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              {isLoading ? (
                <span className="flex items-center gap-3 relative z-10">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-3 relative z-10">
                  Sign In
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            Protected by enterprise-grade security
          </div>
        </div>
      </div>
    </div>
  );
}