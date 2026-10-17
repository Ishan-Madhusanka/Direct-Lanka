'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  User,
  Phone,
  CreditCard,
  MapPin,
  Send,
  UserPlus,
  Headphones,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('kasun.perera@gmail.lk');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Interactive preview states (From Stitch Artboard)
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('registered.email@lk.com');
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login verification
    setTimeout(() => {
      setIsLoading(false);
      if (email.includes('error') || password === 'wrong') {
        setShowErrorAlert(true);
      } else {
        router.push('/');
      }
    }, 600);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail.trim()) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setResetModalOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-16 text-slate-900 font-sans">
      {/* ======================================================== */}
      {/* 1. Desktop Top Navigation Strip */}
      {/* ======================================================== */}
      <div className="hidden sm:block border-b border-slate-200/80 bg-white py-3.5">
        <Container>
          <div className="flex items-center justify-between text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-primary font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to LankaDirect Store</span>
            </Link>

            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Islandwide Express Dispatch Active</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ======================================================== */}
      {/* 2. Mobile Header */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-slate-700 p-1 -ml-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading font-black text-base text-slate-900">
            Customer Login
          </h1>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <Link href="/faq" className="p-1 hover:text-slate-900">
            <HelpCircle className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-hover flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      <Container className="pt-6 sm:pt-10 max-w-5xl">
        {/* ======================================================== */}
        {/* 3. Centered Brand Logo (Desktop Artboard) */}
        {/* ======================================================== */}
        <div className="hidden sm:flex flex-col items-center justify-center text-center mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <span className="font-heading font-black text-2xl text-slate-900 tracking-tight block">
                Lanka<span className="text-brand-primary">Direct</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                ONLINE MARKETPLACE LK
              </span>
            </div>
          </Link>
        </div>

        {/* ======================================================== */}
        {/* 4. Interactive Preview States Bar (From Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="mb-6 p-2.5 rounded-2xl bg-slate-100/80 border border-slate-200/90 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700 px-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>Interactive Preview States:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowErrorAlert(!showErrorAlert)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                showErrorAlert
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {showErrorAlert ? 'Hide Error Alert' : 'Toggle Error Alert'}
            </button>

            <button
              type="button"
              onClick={() => setResetModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-orange-100 text-brand-hover hover:bg-orange-200/80 border border-orange-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Open Reset Sheet
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Mobile Member Access Banner (Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50/50 border border-orange-200/70 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-heading font-black text-xs text-brand-hover uppercase tracking-wider block">
              LANKADIRECT MEMBER ACCESS
            </span>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Track island-wide orders, instant refunds &amp; exclusive LKR flash deals.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. Mobile Greeting (Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-4">
          <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
            Ayubowan, Welcome Back!
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sign in to sync your Colombo express cart &amp; saved cards.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 7. Error Alert State (Mobile & Desktop) */}
        {/* ======================================================== */}
        {showErrorAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-xs text-red-950">
                  Login unsuccessful
                </h4>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                  Invalid email or password. Please verify your Sri Lankan credentials or try again.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowErrorAlert(false)}
              className="text-red-400 hover:text-red-700 p-1 -mr-1 -mt-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 8. Main 2-Column Grid (Desktop & Mobile) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ====================================================== */}
          {/* Left Column: Login Card (lg:col-span-7) */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-5">
            {/* Desktop Card Header */}
            <div className="hidden sm:block space-y-1">
              <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500">
                Log in to your LankaDirect account to view past orders and track doorstep deliveries across Sri Lanka.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email Address */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">Email Address</label>
                  <span className="text-[10px] text-slate-400">e.g. nimal@gmail.com</span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full h-11 pl-10 pr-9 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                  {email.includes('@') && email.length > 5 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setResetModalOpen(true)}
                    className="text-brand-primary font-bold hover:underline cursor-pointer text-xs"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none pt-0.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-brand-primary accent-brand-primary cursor-pointer"
                />
                <span className="hidden sm:inline">Remember me on this device</span>
                <span className="sm:hidden font-medium">Stay logged in for 30 days</span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span>{isLoading ? 'Signing In...' : 'Log In'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">
                  OR
                </span>
              </div>

              {/* Don't have an account */}
              <div className="text-center text-xs text-slate-600">
                <span>Don&apos;t have an account? </span>
                <Link
                  href="/register"
                  className="text-brand-primary font-bold hover:underline"
                >
                  Create an account
                </Link>
              </div>

              {/* Continue Shopping as Guest */}
              <Link href="/" className="block">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full h-11 text-xs font-bold rounded-xl bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 border border-indigo-100 shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-indigo-600" />
                  <span>Continue Shopping as Guest</span>
                </Button>
              </Link>

              {/* Desktop Trust Strip */}
              <div className="hidden sm:flex items-center justify-center gap-4 text-xs font-semibold text-slate-400 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-bit SSL Secure Checkout</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-brand-primary" />
                  <span>Islandwide Tracking</span>
                </span>
              </div>
            </form>
          </div>

          {/* ====================================================== */}
          {/* Right Column: Reset Password & Member Perks (lg:col-span-5) */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Reset Your Password (Self Service) */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-sm sm:text-base text-slate-900">
                    Reset Your Password
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider">
                  SELF SERVICE
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your registered email address to receive a secure password reset link and instant recovery SMS code.
              </p>

              <form onSubmit={handleResetSubmit} className="space-y-3">
                <div className="relative">
                  <span className="text-xs text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 font-mono">
                    @
                  </span>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="registered.email@lk.com"
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="w-full h-10 rounded-xl bg-[#1E293B] hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Send Reset Link</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>

                {resetSent && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                    ✔ Reset link &amp; SMS code dispatched!
                  </div>
                )}
              </form>
            </div>

            {/* Card 2: Member Perks at LankaDirect */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-sm sm:text-base pb-3 border-b border-slate-100">
                <ShoppingBag className="w-4 h-4 text-brand-primary" />
                <span>Member Perks at LankaDirect</span>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Perk 1 */}
                <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Saved Sri Lankan Addresses
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      Store Western, Central, and Outstation delivery locations for fast 1-tap ordering.
                    </p>
                  </div>
                </div>

                {/* Perk 2 */}
                <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Flexible Payment Preferences
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      Seamlessly save preferences for Cash on Delivery, Mintpay, Koko, or Local Cards.
                    </p>
                  </div>
                </div>

                {/* Perk 3 */}
                <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-slate-900">
                      Live Courier Tracking
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      Track rider progress directly from warehouses in Colombo, Kandy, and Galle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Telephone Support Note */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Need telephone support?</span>
                <a
                  href="tel:+94117445500"
                  className="font-heading font-black text-brand-hover hover:underline"
                >
                  📞 +94 11 744 5500
                </a>
              </div>
            </div>

            {/* Mobile: New to LankaDirect? Card (From Mobile Artboard) */}
            <div className="sm:hidden p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
              <div className="flex items-center gap-2 font-heading font-bold text-xs text-indigo-950">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span>New to LankaDirect?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get Rs. 500 off your first delivery across Western Province with an exclusive member coupon.
              </p>
              <Link href="/register" className="block">
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-xl bg-white border-slate-200 text-brand-primary font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create an Account</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 9. Mobile Bottom Trust Strip (Stitch Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-400 pt-6 border-t border-slate-200 mt-6">
          <span className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Truck className="w-3.5 h-3.5 text-brand-primary" />
            <span>Island-wide COD</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Headphones className="w-3.5 h-3.5 text-slate-400" />
            <span>24/7 Sinhala/Tamil/Eng</span>
          </span>
        </div>

        {/* ======================================================== */}
        {/* 10. Desktop Footer Links */}
        {/* ======================================================== */}
        <div className="hidden sm:flex items-center justify-between text-xs text-slate-400 pt-10 border-t border-slate-200 mt-10">
          <p>© 2025 LankaDirect Retail (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <Link href="/privacy" className="hover:text-brand-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/delivery" className="hover:text-brand-primary transition-colors">
              Islandwide Delivery Rates
            </Link>
            <Link href="/faq" className="hover:text-brand-primary transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </Container>

      {/* ======================================================== */}
      {/* 11. Reset Password Modal / Sheet */}
      {/* ======================================================== */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-brand-primary" />
                <h3 className="font-heading font-black text-base text-slate-900">
                  Password Recovery
                </h3>
              </div>
              <button
                onClick={() => setResetModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your registered Sri Lankan email or mobile number. We will send a secure password reset link and verification code.
            </p>

            <form onSubmit={handleResetSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-xs font-bold rounded-xl shadow-md">
                Send Recovery Link
              </Button>

              {resetSent && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                  ✔ Recovery link sent successfully! Check your inbox.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
