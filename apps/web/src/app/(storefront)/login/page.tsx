'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  CreditCard,
  MapPin,
  Send,
  UserPlus,
  Headphones,
  Loader2,
  KeyRound,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { authLogin, authForgotPassword, authResetPassword } from '@/lib/api-client';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Field touch / blur states
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Server & Form-level status states
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal states
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailTouched, setResetEmailTouched] = useState(false);
  const [resetEmailError, setResetEmailError] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [resetOtpError, setResetOtpError] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [resetCooldown, setResetCooldown] = useState(0);
  const [resetIsLoading, setResetIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loginSuccessBanner, setLoginSuccessBanner] = useState<string | null>(null);

  // Cooldown countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resetCooldown > 0) {
      timer = setTimeout(() => setResetCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resetCooldown]);

  // Client-side validation helpers
  const getEmailValidationError = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Email address is required.';
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const getPasswordValidationError = (value: string): string => {
    if (!value) {
      return 'Password is required.';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  };

  const emailError = emailTouched ? getEmailValidationError(email) : '';
  const isEmailValid = email.trim() !== '' && EMAIL_REGEX.test(email.trim());

  const passwordError = passwordTouched ? getPasswordValidationError(password) : '';
  const isPasswordValid = password.length >= 6;

  // Handle Form Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched for instant visual validation
    setEmailTouched(true);
    setPasswordTouched(true);

    const emailErr = getEmailValidationError(email);
    const passErr = getPasswordValidationError(password);

    if (emailErr || passErr) {
      return;
    }

    setIsLoading(true);
    setShowErrorAlert(false);

    try {
      const authRes = await authLogin({
        email: email.trim(),
        password,
      });

      // Smart role-based redirection:
      // If user is ADMIN, route directly to /admin
      // If customer, route to redirectParam or /account
      if (authRes.user.role === 'ADMIN') {
        router.push('/admin');
      } else if (redirectParam) {
        router.push(redirectParam);
      } else {
        router.push('/account');
      }
    } catch (err: any) {
      setLoginErrorMessage(
        err?.message ||
          'Invalid email or password. Please verify your credentials or reset your password.'
      );
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Request 6-digit Reset OTP
  const handleRequestResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetEmailTouched(true);

    const trimmed = resetEmail.trim();
    if (!trimmed) {
      setResetEmailError('Please enter your email address.');
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setResetEmailError('Please enter a valid email address.');
      return;
    }

    setResetEmailError('');
    setResetIsLoading(true);

    try {
      await authForgotPassword(trimmed);
      setResetStep(2);
      setResetCooldown(60);
      setResetOtp('');
      setResetNewPassword('');
      setResetConfirmPassword('');
      setResetOtpError('');
    } catch (err: any) {
      setResetEmailError(err?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setResetIsLoading(false);
    }
  };

  // Step 2: Resend 6-digit Reset OTP
  const handleResendResetCode = async () => {
    if (resetCooldown > 0 || resetIsLoading) return;
    setResetIsLoading(true);
    setResetOtpError('');
    try {
      await authForgotPassword(resetEmail.trim());
      setResetCooldown(60);
    } catch (err: any) {
      setResetOtpError(err?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResetIsLoading(false);
    }
  };

  // Step 2: Submit OTP and New Password
  const handlePerformReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = resetOtp.trim();

    if (cleanOtp.length !== 6) {
      setResetOtpError('Please enter the full 6-digit verification code.');
      return;
    }
    if (resetNewPassword.length < 6) {
      setResetOtpError('New password must be at least 6 characters in length.');
      return;
    }
    if (resetNewPassword !== resetConfirmPassword) {
      setResetOtpError('Passwords do not match. Please verify your password entry.');
      return;
    }

    setResetIsLoading(true);
    setResetOtpError('');

    try {
      await authResetPassword(resetEmail.trim(), cleanOtp, resetNewPassword);
      setResetSuccess(true);

      // Pre-populate login form credentials for smooth sign-in
      setEmail(resetEmail.trim());
      setPassword(resetNewPassword);
      setEmailTouched(true);
      setPasswordTouched(true);
      setLoginSuccessBanner('Password reset successfully! You can now sign in with your new password.');

      setTimeout(() => {
        setResetModalOpen(false);
        setResetStep(1);
        setResetSuccess(false);
        setResetOtp('');
        setResetNewPassword('');
        setResetConfirmPassword('');
      }, 1500);
    } catch (err: any) {
      setResetOtpError(err?.message || 'Invalid or expired reset code. Please try again.');
    } finally {
      setResetIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-16 text-slate-900 font-sans selection:bg-brand-primary selection:text-white">
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
      {/* 2. Mobile Sticky Header */}
      {/* ======================================================== */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-slate-700 p-1 -ml-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading font-black text-base text-slate-900">
            Sign In
          </h1>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <Link href="/faq" className="p-1 hover:text-slate-900" aria-label="Help & FAQ">
            <HelpCircle className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-hover flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      <Container className="pt-6 sm:pt-10 max-w-5xl">
        {/* ======================================================== */}
        {/* 3. Centered Brand Identity Header */}
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
        {/* 4. Mobile Member Greeting */}
        {/* ======================================================== */}
        <div className="sm:hidden mb-4">
          <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
            Ayubowan, Welcome Back!
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sign in to sync your cart, view order statuses &amp; saved addresses.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 5. Server / API Error Alert Notification */}
        {/* ======================================================== */}
        {loginSuccessBanner && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-xs text-emerald-950">
                  Password Updated Successfully
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed font-medium">
                  {loginSuccessBanner}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLoginSuccessBanner(null)}
              className="text-emerald-500 hover:text-emerald-800 p-1 -mr-1 -mt-1 cursor-pointer transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showErrorAlert && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-xs text-red-950">
                  Authentication Failed
                </h4>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                  {loginErrorMessage}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowErrorAlert(false)}
              className="text-red-400 hover:text-red-700 p-1 -mr-1 -mt-1 cursor-pointer transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. Main 2-Column Responsive Layout */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ====================================================== */}
          {/* Left Column: Premium Login Form Card (lg:col-span-7) */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs space-y-6">
            {/* Desktop Card Header */}
            <div className="hidden sm:block space-y-1">
              <h2 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500">
                Sign in to your LankaDirect account to access past orders, track live shipments, and manage deliveries.
              </p>
            </div>

            {/* Login / Register Segmented Tab Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 text-xs font-bold">
              <button
                type="button"
                className="py-2.5 rounded-xl bg-white text-slate-900 shadow-2xs text-center transition-all cursor-default"
              >
                Log In
              </button>
              <Link
                href="/register"
                className="py-2.5 rounded-xl text-slate-500 hover:text-slate-900 text-center transition-colors hover:bg-slate-200/50"
              >
                Create Account
              </Link>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} noValidate autoComplete="off" className="space-y-4">
              {/* Prevent browser from auto-filling saved localhost passwords */}
              <input type="text" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
              <input type="password" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
              {/* Email Address Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="login-email" className="font-bold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative">
                  <Mail
                    className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                      emailError
                        ? 'text-red-500'
                        : isEmailValid
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  />
                  <input
                    id="login-email"
                    name="customer_email"
                    type="email"
                    autoComplete="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (showErrorAlert) setShowErrorAlert(false);
                    }}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="Enter your registered email"
                    aria-invalid={Boolean(emailError)}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl border text-xs font-semibold text-slate-900 transition-all duration-200 outline-none ${
                      emailError
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : isEmailValid
                        ? 'border-emerald-300 bg-emerald-50/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                    }`}
                  />
                  {/* Validation Icon Feedback */}
                  {emailError ? (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  ) : isEmailValid ? (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : null}
                </div>
                {/* Inline Error Helper */}
                {emailError && (
                  <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="login-password" className="font-bold text-slate-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setResetModalOpen(true);
                      setResetStep(1);
                      setResetEmail(email.trim());
                      setResetEmailError('');
                      setResetOtpError('');
                      setResetSuccess(false);
                    }}
                    className="text-brand-primary font-bold hover:underline cursor-pointer text-xs"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                      passwordError
                        ? 'text-red-500'
                        : isPasswordValid
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  />
                  <input
                    id="login-password"
                    name="customer_password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (showErrorAlert) setShowErrorAlert(false);
                    }}
                    onBlur={() => setPasswordTouched(true)}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(passwordError)}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl border text-xs font-semibold text-slate-900 transition-all duration-200 outline-none ${
                      passwordError
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Inline Error Helper */}
                {passwordError && (
                  <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>

              {/* Remember Me Option */}
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
                className="w-full h-11 text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-1">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">
                  OR
                </span>
              </div>

              {/* Create Account Link */}
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
                  className="w-full h-11 text-xs font-bold rounded-xl bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 border border-indigo-100 shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-indigo-600" />
                  <span>Continue Shopping as Guest</span>
                </Button>
              </Link>

              {/* Security & Encryption Trust Strip */}
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
          {/* Right Column: Password Recovery & Member Perks (lg:col-span-5) */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Self-Service Password Reset */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-sm sm:text-base text-slate-900">
                    Lost Your Password?
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider">
                  SELF SERVICE
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Receive an instant 6-digit verification code to your registered email address and easily set a new password.
              </p>

              <Button
                type="button"
                onClick={() => {
                  setResetModalOpen(true);
                  setResetStep(1);
                  setResetEmail(email.trim());
                  setResetEmailError('');
                  setResetOtpError('');
                  setResetSuccess(false);
                }}
                className="w-full h-10 rounded-xl bg-[#1E293B] hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Recover Account Password</span>
              </Button>
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
                  href="tel:+94762018285"
                  className="font-heading font-black text-brand-hover hover:underline"
                >
                  📞 +94762018285
                </a>
              </div>
            </div>

            {/* Mobile: New to LankaDirect? Card */}
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
        {/* 7. Mobile Bottom Trust Strip */}
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
        {/* 8. Desktop Footer Links */}
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
      {/* 9. Reset Password Modal / Dialog Sheet */}
      {/* ======================================================== */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-primary flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-slate-900">
                    {resetStep === 1 ? 'Password Recovery' : 'Create New Password'}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {resetStep === 1 ? 'Step 1 of 2: Verification Code' : 'Step 2 of 2: Set New Password'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResetModalOpen(false);
                  setResetStep(1);
                }}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                aria-label="Close recovery dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Enter Email */}
            {resetStep === 1 && (
              <form onSubmit={handleRequestResetCode} noValidate className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered email address. We will send a secure 6-digit password reset code directly to your inbox.
                </p>

                <div className="space-y-1.5">
                  <label htmlFor="reset-email-input" className="text-xs font-bold text-slate-700 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reset-email-input"
                      type="email"
                      required
                      autoComplete="off"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        if (resetEmailError) setResetEmailError('');
                      }}
                      placeholder="Enter registered email"
                      className={`w-full h-11 pl-10 pr-3 rounded-xl border text-xs font-semibold text-slate-900 outline-none transition-colors ${
                        resetEmailError
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                          : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-brand-primary'
                      }`}
                    />
                  </div>
                </div>

                {resetEmailError && (
                  <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{resetEmailError}</span>
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={resetIsLoading}
                  className="w-full h-11 text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {resetIsLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Sending reset code...</span>
                    </>
                  ) : (
                    <span>Send Reset Code</span>
                  )}
                </Button>
              </form>
            )}

            {/* Step 2: Enter OTP & New Password */}
            {resetStep === 2 && (
              <form onSubmit={handlePerformReset} noValidate className="space-y-4">
                <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="truncate text-slate-700">
                      Code sent to <strong className="text-slate-900">{resetEmail}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResetStep(1)}
                    className="text-[11px] font-bold text-brand-primary hover:underline shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* 6-Digit OTP */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="reset-otp-input" className="font-bold text-slate-700">
                      6-Digit Reset Code <span className="text-red-500">*</span>
                    </label>
                    {resetCooldown > 0 ? (
                      <span className="text-[10px] text-slate-400 font-medium">
                        Resend in {resetCooldown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendResetCode}
                        disabled={resetIsLoading}
                        className="text-[10px] font-bold text-brand-primary hover:underline cursor-pointer"
                      >
                        Resend code
                      </button>
                    )}
                  </div>
                  <input
                    id="reset-otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    autoComplete="one-time-code"
                    required
                    value={resetOtp}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setResetOtp(digits);
                      if (resetOtpError) setResetOtpError('');
                    }}
                    placeholder="123456"
                    className="w-full h-12 text-center font-mono font-black text-xl tracking-[0.35em] rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <label htmlFor="reset-new-password" className="text-xs font-bold text-slate-700 block">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reset-new-password"
                      name="reset_new_password"
                      type={showResetPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={resetNewPassword}
                      onChange={(e) => {
                        setResetNewPassword(e.target.value);
                        if (resetOtpError) setResetOtpError('');
                      }}
                      placeholder="Min. 6 characters"
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                    >
                      {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="reset-confirm-password" className="font-bold text-slate-700">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    {resetConfirmPassword.length > 0 && (
                      <span
                        className={`text-[10px] font-bold ${
                          resetNewPassword === resetConfirmPassword ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        {resetNewPassword === resetConfirmPassword ? '✓ Matches' : 'Mismatch'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reset-confirm-password"
                      name="reset_confirm_password"
                      type={showResetConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={resetConfirmPassword}
                      onChange={(e) => {
                        setResetConfirmPassword(e.target.value);
                        if (resetOtpError) setResetOtpError('');
                      }}
                      placeholder="Re-type new password"
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-900 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                    >
                      {showResetConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {resetOtpError && (
                  <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5 animate-in fade-in">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{resetOtpError}</span>
                  </p>
                )}

                {resetSuccess ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Password Reset Successfully! Updating...</span>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={resetIsLoading}
                    className="w-full h-11 text-xs font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    {resetIsLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        <span>Updating password...</span>
                      </>
                    ) : (
                      <span>Reset Password &amp; Sign In</span>
                    )}
                  </Button>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFBFD] flex items-center justify-center text-slate-400 text-xs font-medium">
          Loading login portal...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
