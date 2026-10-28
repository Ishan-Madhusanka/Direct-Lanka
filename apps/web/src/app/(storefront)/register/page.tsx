'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  MapPin,
  CreditCard,
  RotateCcw,
  Zap,
  HelpCircle,
  Headphones,
  Check,
  Clock,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { authRegister } from '@/lib/api-client';

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  // Status & preview states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessPreview, setShowSuccessPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  // Password strength calculation
  const strengthScore = [hasMinLength, hasNumber, hasSymbol, password.length >= 12].filter(Boolean).length;
  const strengthLabel =
    password.length === 0
      ? ''
      : strengthScore <= 1
      ? 'Too short'
      : strengthScore <= 3
      ? 'Medium'
      : 'Strong';

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreed) {
      setErrorMessage("Please agree to LankaDirect's Terms of Service and Privacy Policy.");
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match. Please verify your password entry.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authRegister({
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phone.trim(),
        password,
      });
      setShowSuccessPreview(true);
      setTimeout(() => {
        router.push('/account');
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-20 text-slate-900 font-sans">
      {/* ======================================================== */}
      {/* 1. Desktop Breadcrumbs Bar & Protocol Note */}
      {/* ======================================================== */}
      <div className="hidden sm:block border-b border-slate-200/80 bg-white py-3">
        <Container>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Link href="/" className="hover:text-brand-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/account" className="hover:text-brand-primary transition-colors">
                Account
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900">Customer Registration</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secure Regional Retail Protocol</span>
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
            Customer Registration
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

      <Container className="pt-6 sm:pt-10 max-w-6xl">
        {/* ======================================================== */}
        {/* 3. Mobile Club Pill & Title (Mobile Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-5 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-brand-hover text-xs font-bold border border-orange-200/60">
            <ShoppingBag className="w-3.5 h-3.5 text-brand-primary" />
            <span>Join LankaDirect Club</span>
          </div>

          <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Unlock fast islandwide delivery, points on every order, and exclusive local deals.
          </p>

          {/* In a rush? Callout (Mobile) */}
          <div className="pt-2">
            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 font-bold block text-xs">In a rush?</strong>
                  <span className="text-[11px] text-slate-600">Guest checkout available without regist...</span>
                </div>
              </div>
              <Link href="/cart">
                <Button size="sm" variant="outline" className="h-8 px-3 rounded-xl text-xs font-bold bg-white border-slate-200 text-slate-700">
                  Skip
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. Main 2-Column Grid (Desktop & Mobile) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ====================================================== */}
          {/* Left Column: Registration Form (lg:col-span-7) */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-5">
            {/* Desktop Form Header */}
            <div className="hidden sm:block space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-brand-hover text-[11px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                <span>NEW SHOPPER PROFILE</span>
              </span>

              <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Quick sign-up to manage your orders, saved delivery addresses, and fast checkout.
              </p>
            </div>

            {/* Guest Checkout Callout Box (Desktop) */}
            <div className="hidden sm:flex items-start gap-3.5 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 text-xs">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">
                  Guest checkout is always available
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  You do not need an account to place an order. Continue as a guest at cart anytime with pure Cash on Delivery or Card payment.
                </p>
              </div>
            </div>

            {/* Login / Register Segmented Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 text-xs font-bold">
              <Link
                href="/login"
                className="py-2 rounded-xl text-slate-500 hover:text-slate-900 text-center transition-colors"
              >
                Log In
              </Link>
              <button
                type="button"
                className="py-2 rounded-xl bg-white text-slate-900 shadow-2xs text-center"
              >
                Create Account
              </button>
            </div>

            {/* Registration Form */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kasun Perera"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kasun.p@example.lk"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Sri Lankan Mobile Number */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    Sri Lankan Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">
                    For courier &amp; SMS delivery tracking
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="h-11 px-3 rounded-xl border border-slate-200 bg-slate-100/70 flex items-center gap-1.5 text-xs font-bold text-slate-800 shrink-0">
                    <span>🇱🇰</span>
                    <span>+94</span>
                  </div>
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="077 348 9120"
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 sm:hidden">
                  We&apos;ll send order updates &amp; delivery pin via SMS
                </p>
              </div>

              {/* Password & Confirm Password (2 Columns on Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-slate-700">
                      Create Password <span className="text-red-500">*</span>
                    </label>
                    {strengthLabel && (
                      <span
                        className={`text-[10px] font-bold ${
                          strengthScore <= 1
                            ? 'text-red-500'
                            : strengthScore <= 3
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {strengthLabel}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
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

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-slate-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    {confirmPassword.length > 0 && (
                      <span
                        className={`text-[10px] font-bold ${
                          passwordsMatch ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        {passwordsMatch ? '✔ Matches' : 'Mismatch'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type your password"
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Requirements Bar (Matching Artboard) */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-500">Security Requirements:</span>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 ${hasMinLength ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${hasMinLength ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>At least 8 characters</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 ${hasNumber || hasSymbol ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${hasNumber || hasSymbol ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>1 number or symbol</span>
                  </span>
                </div>
              </div>

              {/* Terms of Service Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-primary accent-brand-primary cursor-pointer"
                />
                <span>
                  I agree to LankaDirect&apos;s{' '}
                  <Link href="/terms" className="text-brand-primary font-bold underline">
                    Terms of Service
                  </Link>{' '}
                  and confirm I have read the{' '}
                  <Link href="/privacy" className="text-brand-primary font-bold underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span>{isSubmitting ? 'Creating Profile...' : 'CREATE ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Already have an account */}
              <div className="text-center text-xs text-slate-600 pt-1">
                <span>Already have an account? </span>
                <Link href="/login" className="font-heading font-black text-brand-hover hover:underline">
                  Log In
                </Link>
              </div>

              {/* NIC / Tax Note (Desktop Artboard) */}
              <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
                No National Identity Card (NIC) or tax numbers required. Pure consumer convenience.
              </p>
            </form>
          </div>

          {/* ====================================================== */}
          {/* Right Column: Hero Card & Member Perks (lg:col-span-5) */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 space-y-5">
            {/* Hero Card (Desktop Photo Card) */}
            <div className="relative rounded-3xl overflow-hidden shadow-md text-white min-h-[220px] sm:min-h-[260px] flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              {/* Top Badges */}
              <div className="flex items-center justify-between gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 font-bold text-xs shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Colombo &amp; Island Express</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-brand-primary text-white font-bold text-xs shadow-xs">
                  Rs. 0 Member Perks
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="z-10 space-y-1.5 pt-12">
                <span className="text-[10px] uppercase font-bold tracking-widest text-orange-300 block">
                  CUSTOMER FIRST ARCHITECTURE
                </span>
                <h3 className="font-heading font-black text-lg sm:text-xl text-white leading-snug">
                  Shop seamlessly across 25 Sri Lankan Districts
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                  Save multiple home, office, and outstation family addresses for lightning fast courier delivery.
                </p>
              </div>

              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-radial from-orange-500/10 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* 4 Feature Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Card 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">
                  Multi-Address Hub
                </h5>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Save home, office, and regional drop locations easily.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">
                  Real-Time Courier
                </h5>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Instant dispatch alerts directly through SMS &amp; Portal.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">
                  Flexible Island Pay
                </h5>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Pay upon arrival (COD), Card, or seamless BNPL.
                </p>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">
                  Effortless Returns
                </h5>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Direct door pickup for hassle-free swaps and refunds.
                </p>
              </div>
            </div>

            {/* Trusted Payment Integrations Strip (Desktop) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  TRUSTED PAYMENT INTEGRATIONS
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit SSL</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['VISA', 'Mastercard', 'Mintpay', 'koko.', 'Cash on Delivery'].map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Questions Phone Support Strip */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Headphones className="w-4 h-4 text-brand-primary" />
                <span>Questions? Reach Colombo Support:</span>
              </div>
              <a
                href="tel:+94112000000"
                className="font-heading font-black text-brand-hover hover:underline"
              >
                +94 11 200 0000
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. Account Creation Success Preview (Desktop Artboard) */}
        {/* ======================================================== */}
        {showSuccessPreview && (
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm text-emerald-950">
                    Account Creation Success Preview
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-bold">
                    System Verified
                  </span>
                </div>
                <p className="text-xs text-emerald-800/90 mt-0.5 leading-snug">
                  Account created successfully! Welcome to LankaDirect. You can now save your addresses and manage orders.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-emerald-900 font-semibold pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>Immediate Activation</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-brand-primary" />
                    <span>1-Click Islandwide Checkout Unlocked</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessPreview(false)}
              className="text-emerald-700 hover:text-emerald-950 text-xs font-semibold px-2 py-1 rounded hover:bg-emerald-100 self-end sm:self-center cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. Mobile Bottom Trust Card (Mobile Artboard) */}
        {/* ======================================================== */}
        <div className="sm:hidden mt-6 p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-around text-xs text-slate-500 font-semibold shadow-xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>SSL Encrypted</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-primary" />
            <span>Verified Merchant</span>
          </span>
        </div>
      </Container>
    </div>
  );
}
