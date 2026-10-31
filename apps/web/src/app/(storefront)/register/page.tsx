'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Loader2,
  X,
  KeyRound,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { authRegister, authVerifyOtp, authResendOtp } from '@/lib/api-client';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  // Field touch states
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // Submission & Alert states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP Verification Modal states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpVerifiedSuccess, setOtpVerifiedSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  // Cooldown countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Neutralize aggressive browser credential / phone autofill on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPassword('');
      setConfirmPassword('');
      setPhone((prev) => (prev.length > 0 && !prev.startsWith('0') ? '' : prev));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Validation helpers
  const isEmailValid = email.trim() !== '' && EMAIL_REGEX.test(email.trim());
  const isPhoneValid = phone.length === 10 && phone.startsWith('0');

  const getPhoneError = () => {
    if (!phoneTouched || phone.length === 0) return null;
    if (!phone.startsWith('0')) {
      return 'Mobile number must start with 0.';
    }
    if (phone.length < 10) {
      return `Must be exactly 10 digits (${phone.length}/10 entered).`;
    }
    return null;
  };
  const phoneError = getPhoneError();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');
    // If pasted with country code 94 (e.g. 94771234567), normalize to 0771234567
    if (digits.startsWith('94') && digits.length >= 11) {
      digits = '0' + digits.slice(2);
    }
    // Limit to max 10 digits
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }
    setPhone(digits);
    if (errorMessage) setErrorMessage(null);
  };

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  // Strength score
  const strengthScore = [hasMinLength, hasNumber, hasSymbol, password.length >= 12].filter(Boolean).length;
  const strengthLabel =
    password.length === 0
      ? ''
      : strengthScore <= 1
        ? 'Too short'
        : strengthScore <= 3
          ? 'Medium'
          : 'Strong';

  // Handle Register Form Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    setFullNameTouched(true);
    setEmailTouched(true);
    setPhoneTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }
    if (!phone.startsWith('0')) {
      setErrorMessage('Mobile number must start with 0 (e.g. 07XXXXXXXX).');
      return;
    }
    if (phone.length !== 10) {
      setErrorMessage('Mobile number must contain exactly 10 digits (e.g. 07XXXXXXXX).');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }
    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match. Please verify your password entry.');
      return;
    }
    if (!agreed) {
      setErrorMessage("Please agree to LankaDirect's Terms of Service and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authRegister({
        fullName: fullName.trim(),
        email: email.trim(),
        phoneNumber: phone.trim(),
        password,
      });

      if (res.requiresVerification) {
        setShowOtpModal(true);
        setResendCooldown(60);
      } else {
        router.push('/account');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP Verification Submission
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otpCode.trim();

    if (cleanOtp.length !== 6) {
      setOtpError('Please enter the full 6-digit verification code.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    try {
      await authVerifyOtp({
        email: email.trim(),
        otp: cleanOtp,
      });

      setOtpVerifiedSuccess(true);
      setTimeout(() => {
        router.push('/account');
      }, 1500);
    } catch (err: any) {
      setOtpError(err?.message || 'Invalid verification code. Please check your inbox and try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Handle Resend OTP Request
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setOtpError(null);
    setResendMessage(null);

    try {
      const res = await authResendOtp({ email: email.trim() });
      setResendMessage(res.message || 'A fresh verification code has been dispatched.');
      setResendCooldown(60);
      setTimeout(() => setResendMessage(null), 5000);
    } catch (err: any) {
      setOtpError(err?.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-20 text-slate-900 font-sans selection:bg-brand-primary selection:text-white">
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
            Create Account
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

      <Container className="pt-6 sm:pt-8 max-w-5xl">
        {/* ======================================================== */}
        {/* 3. Main 2-Column Responsive Layout */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ====================================================== */}
          {/* Left Column: Form Card (lg:col-span-7) */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-6">
            {/* Header Titles */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-hover text-[10px] font-black uppercase tracking-wider">
                  FAST ONBOARDING
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">
                  Zero NIC requirement
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Join LankaDirect to experience island-wide express doorstep delivery, live order tracking, and exclusive LKR member pricing.
              </p>
            </div>

            {/* Login / Register Segmented Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 text-xs font-bold">
              <Link
                href="/login"
                className="py-2.5 rounded-xl text-slate-500 hover:text-slate-900 text-center transition-colors hover:bg-slate-200/50"
              >
                Log In
              </Link>
              <button
                type="button"
                className="py-2.5 rounded-xl bg-white text-slate-900 shadow-2xs text-center cursor-default"
              >
                Create Account
              </button>
            </div>

            {/* Error Alert Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegisterSubmit} noValidate autoComplete="off" className="space-y-4">
              {/* Browser Autofill Neutralizers */}
              <input type="text" name="fake_username_neutralizer" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
              <input type="password" name="fake_password_neutralizer" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="reg-fullname" className="text-xs font-bold text-slate-700 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="reg-fullname"
                    name="reg_fullname"
                    type="text"
                    required
                    autoComplete="off"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    onBlur={() => setFullNameTouched(true)}
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="reg-email" className="font-bold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Verification code will be sent</span>
                </div>
                <div className="relative">
                  <Mail
                    className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${isEmailValid ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                  />
                  <input
                    id="reg-email"
                    name="reg_email"
                    type="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    onBlur={() => setEmailTouched(true)}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl border text-xs font-semibold text-slate-900 transition-colors outline-none ${isEmailValid
                        ? 'border-emerald-300 bg-emerald-50/10 focus:border-emerald-500'
                        : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-brand-primary'
                      }`}
                  />
                  {isEmailValid && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="reg-phone" className="font-bold text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">
                    For courier &amp; SMS delivery tracking
                  </span>
                </div>
                <div className="relative">
                  <Phone
                    className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${phoneError
                        ? 'text-red-500'
                        : isPhoneValid
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}
                  />
                  <input
                    id="reg-phone"
                    name="reg_phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    autoComplete="off"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => setPhoneTouched(true)}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl border text-xs font-semibold text-slate-900 transition-colors outline-none ${phoneError
                        ? 'border-red-300 bg-red-50/10 focus:border-red-500'
                        : isPhoneValid
                          ? 'border-emerald-300 bg-emerald-50/10 focus:border-emerald-500'
                          : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-brand-primary'
                      }`}
                  />
                  {isPhoneValid && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
                {phoneError && (
                  <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5 mt-1 animate-in fade-in">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="reg-password" className="font-bold text-slate-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    {password.length > 0 && (
                      <span
                        className={`text-[10px] font-bold ${strengthScore <= 1
                            ? 'text-red-500'
                            : strengthScore <= 3
                              ? 'text-amber-500'
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
                      id="reg-password"
                      name="reg_user_password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      onBlur={() => setPasswordTouched(true)}
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
                    <label htmlFor="reg-confirm-password" className="font-bold text-slate-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    {confirmPassword.length > 0 && (
                      <span
                        className={`text-[10px] font-bold ${passwordsMatch ? 'text-emerald-600' : 'text-red-500'
                          }`}
                      >
                        {passwordsMatch ? '✓ Matches' : 'Mismatch'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reg-confirm-password"
                      name="reg_user_confirm_password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      onBlur={() => setConfirmPasswordTouched(true)}
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

              {/* Password Requirements Bar */}
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
                className="w-full h-12 text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Profile &amp; Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>CREATE ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              {/* Already have an account */}
              <div className="text-center text-xs text-slate-600 pt-1">
                <span>Already have an account? </span>
                <Link href="/login" className="font-heading font-black text-brand-hover hover:underline">
                  Log In
                </Link>
              </div>

              {/* NIC Note */}
              <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
                No National Identity Card (NIC) or tax numbers required. Pure consumer convenience.
              </p>
            </form>
          </div>

          {/* ====================================================== */}
          {/* Right Column: Hero Card & Member Perks (lg:col-span-5) */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 space-y-5">
            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-md text-white min-h-[220px] sm:min-h-[260px] flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="flex items-center justify-between gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 font-bold text-xs shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Colombo &amp; Island Express</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-primary text-white font-bold text-xs shadow-xs">
                  Rs. 0 Member Perks
                </span>
              </div>

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
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">Multi-Address Hub</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Save home, office, and regional drop locations.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">Real-Time Courier</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Live rider tracking across Colombo and provinces.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">Flexible Island Pay</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Cash on Delivery, Cards, Mintpay, or Koko.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-slate-900">Effortless Returns</h5>
                <p className="text-[11px] text-slate-500 leading-snug">Doorstep pickup for easy exchanges and refunds.</p>
              </div>
            </div>

            {/* Questions Phone Support Strip */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Headphones className="w-4 h-4 text-brand-primary" />
                <span>Need support? Reach Colombo Help Desk:</span>
              </div>
              <a href="tel:+94762018285" className="font-heading font-black text-brand-hover hover:underline">
                📞 +94762018285
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* ======================================================== */}
      {/* 4. 6-Digit Email OTP Verification Modal / Dialog */}
      {/* ======================================================== */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500"></div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-primary flex items-center justify-center shrink-0 shadow-xs">
                  <KeyRound className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg text-slate-900">
                    Verify Your Email
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Instant Security Verification
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Close verification dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              We have dispatched a 6-digit verification code to:
              <span className="block font-heading font-black text-sm text-slate-900 mt-1 break-all">
                {email}
              </span>
            </div>

            {/* Error or Success notification */}
            {otpError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{otpError}</span>
              </div>
            )}

            {resendMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center animate-in fade-in">
                ✓ {resendMessage}
              </div>
            )}

            {otpVerifiedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-heading font-black text-base text-emerald-950">
                  Email Verified Successfully!
                </h4>
                <p className="text-xs text-emerald-800">
                  Activating your account and routing to your customer dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="otp-input" className="text-xs font-bold text-slate-700 block text-center">
                    Enter 6-Digit Code
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setOtpCode(val);
                      if (otpError) setOtpError(null);
                    }}
                    placeholder="000000"
                    className="w-full h-14 text-center font-mono font-black text-2xl tracking-[10px] rounded-2xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block text-center">
                    Check your inbox or spam folder • Valid for 10 minutes
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isVerifyingOtp || otpCode.length !== 6}
                  className="w-full h-11 text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] transition-transform"
                >
                  {isVerifyingOtp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <>
                      <span>VERIFY &amp; ACTIVATE ACCOUNT</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Change email
                  </button>

                  <button
                    type="button"
                    disabled={resendCooldown > 0 || isResending}
                    onClick={handleResendOtp}
                    className={`font-bold transition-colors cursor-pointer ${resendCooldown > 0
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-brand-primary hover:underline'
                      }`}
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : isResending
                        ? 'Sending...'
                        : 'Resend Code'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
