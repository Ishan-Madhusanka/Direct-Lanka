'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Store,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  ShieldCheck,
  RotateCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authLogin, authForgotPassword } from '@/lib/api-client';

export default function AdminLoginPage() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('admin@lankadirect.lk');
  const [password, setPassword] = useState('Admin@Lanka2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Error Alert State (Matches Artboard screenshot demonstration)
  const [showAlert, setShowAlert] = useState(false);
  const [adminErrorMessage, setAdminErrorMessage] = useState('Invalid email or password. Please verify your admin credentials.');
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('admin@lankadirect.lk');
  const [forgotFeedback, setForgotFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowAlert(false);

    try {
      const res = await authLogin({
        email: email.trim(),
        password,
      });

      if (res.user.role !== 'ADMIN') {
        setAdminErrorMessage('Unauthorized access: This account does not possess administrator privileges.');
        setShowAlert(true);
        return;
      }

      router.push('/admin');
    } catch (err: any) {
      setAdminErrorMessage(err?.message || 'Invalid administrator credentials. Access denied.');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authForgotPassword(forgotEmail.trim());
    } catch {
      // acknowledge safely
    }
    setForgotFeedback('A secure reset link has been dispatched to your authorized inbox.');
    setTimeout(() => {
      setForgotFeedback('');
      setShowForgotModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans selection:bg-brand-primary selection:text-white">
      {/* ======================================================== */}
      {/* 1. Mobile Top Bar Header (Stitch Mobile Artboard) */}
      {/* ======================================================== */}
      <div className="sm:hidden flex items-center justify-center gap-2 pt-2 pb-4 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-brand-primary text-white font-heading font-black flex items-center justify-center text-sm shadow-xs">
          L
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-heading font-black text-sm text-slate-900">LankaDirect</span>
          <span className="text-[9px] font-black tracking-wider text-brand-primary uppercase">
            ADMIN
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Main Login Container (Desktop Centered Card / Mobile View) */}
      {/* ======================================================== */}
      <div className="w-full max-w-md mx-auto my-auto">
        {/* Mobile Header Graphic & Badge (Stitch Mobile Artboard) */}
        <div className="sm:hidden text-center mb-5 pt-3">
          <div className="relative inline-block mb-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
              <Store className="w-8 h-8 stroke-[2]" />
            </div>
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center absolute -bottom-1 -right-1 shadow-xs border-2 border-white">
              <Zap className="w-3 h-3 fill-white" />
            </div>
          </div>

          <div className="block">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-slate-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
              <span>Store Owner Portal</span>
            </span>
          </div>

          <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight mt-3">
            Admin Login
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
            Manage products, stock, and orders on the go.
          </p>
        </div>

        {/* Desktop Container Card (Stitch Desktop Artboard) */}
        <div className="bg-white rounded-3xl sm:border sm:border-slate-100 sm:shadow-xl sm:p-9 p-4 space-y-5">
          {/* Desktop Brand Header */}
          <div className="hidden sm:block text-center space-y-3 pb-2">
            <div className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-xs">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-xl text-slate-900 tracking-tight">
                LankaDirect
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] tracking-wide uppercase">
                ADMIN
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                Store Owner Login
              </h1>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                Sign in to manage LankaDirect products, inventory, and customer orders.
              </p>
            </div>
          </div>

          {/* ==================================================== */}
          {/* Alert Box (Error demonstration matching Artboard) */}
          {/* ==================================================== */}
          {showAlert && (
            <div className="rounded-2xl bg-red-50/90 border border-red-200/90 p-3.5 text-xs text-red-800 flex items-start justify-between gap-3 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  {/* Desktop copy */}
                  <span className="hidden sm:inline font-semibold">
                    {adminErrorMessage}
                  </span>
                  {/* Mobile copy */}
                  <div className="sm:hidden space-y-0.5">
                    <span className="font-heading font-bold text-red-900 block">
                      Invalid credentials
                    </span>
                    <span className="text-[11px] text-red-700 block">
                      {adminErrorMessage}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAlert(false)}
                className="text-red-400 hover:text-red-700 p-0.5 transition-colors cursor-pointer"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ==================================================== */}
          {/* Login Form */}
          {/* ==================================================== */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Admin Email */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-heading font-bold text-slate-700">Admin Email</label>
                <span className="hidden sm:inline text-[10px] text-slate-400 font-semibold">
                  Authorized access
                </span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lankadirect.lk"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-[#F8FAFC] sm:bg-[#F1F5F9]/70 text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-heading font-bold text-slate-700 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-[#F8FAFC] sm:bg-[#F1F5F9]/70 text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Options Row: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-semibold text-xs">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-primary accent-brand-primary focus:ring-brand-primary/20 cursor-pointer"
                />
                <span className="hidden sm:inline">Remember 30 days</span>
                <span className="sm:hidden">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-brand-hover font-bold text-xs hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-xs sm:text-sm font-heading font-bold shadow-xs flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating Store Admin...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Sign In to Store Admin</span>
                  <span className="sm:hidden">Log In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick 1-Click Demo Login Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                router.push('/admin');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
              <span>1-Click Quick Demo Login (Admin)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Mobile Switcher Button: Go to Customer Website */}
          <div className="sm:hidden pt-3">
            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-full bg-[#EEF2FF] hover:bg-[#E0E7FF] text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go to Customer Website</span>
            </Link>
          </div>

          {/* Desktop Gateway Active Footer Bar */}
          <div className="hidden sm:flex items-center justify-between pt-3 border-t border-slate-100 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Gateway Active (Colombo Hub)</span>
            </span>
            <span className="font-heading font-bold text-slate-800">SLST (UTC+05:30)</span>
          </div>
        </div>

        {/* Demo Helper Banner */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setEmail('admin@lankadirect.lk');
              setPassword('Admin@Lanka2025!');
              setShowAlert(!showAlert);
            }}
            className="text-[11px] text-slate-400 hover:text-brand-primary underline transition-colors cursor-pointer"
          >
            {showAlert ? 'Dismiss Demo Error Alert' : 'Show Demo Error Alert'}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Page Bottom Footers (Desktop & Mobile) */}
      {/* ======================================================== */}
      <div className="pt-6 text-center text-xs text-slate-400">
        <p className="hidden sm:block">
          LankaDirect Retail Operations • Single Store Management • Protected Admin Access
        </p>
        <p className="sm:hidden text-[11px] font-mono">
          LankaDirect Online Retail • Admin v1.0
        </p>
      </div>

      {/* ======================================================== */}
      {/* 4. Modal: Forgot Admin Password */}
      {/* ======================================================== */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-primary" />
                <h3 className="font-heading font-black text-sm text-slate-900">
                  Reset Admin Password
                </h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-3.5 text-xs">
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Enter your authorized LankaDirect admin email to receive a time-sensitive access
                recovery link.
              </p>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Authorized Admin Email</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-xs font-bold rounded-xl mt-2">
                Send Recovery Link
              </Button>

              {forgotFeedback && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold text-center">
                  ✔ {forgotFeedback}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
