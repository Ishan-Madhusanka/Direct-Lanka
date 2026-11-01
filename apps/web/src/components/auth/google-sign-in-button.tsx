'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { authGoogleLogin } from '@/lib/api-client';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  redirectUrl?: string;
  text?: 'signin_with' | 'signup_with' | 'continue_with';
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: 'standard' | 'icon';
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: string;
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: string | number;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleSignInButton({
  onSuccess,
  onError,
  redirectUrl = '/account',
  text = 'continue_with',
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  const handleCredentialResponse = async (response: { credential: string }) => {
    if (!response.credential) {
      const err = 'Failed to obtain Google credentials';
      setErrorMessage(err);
      onError?.(err);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const authRes = await authGoogleLogin(response.credential);
      onSuccess?.();

      // If user is ADMIN, route directly to /admin
      if (authRes.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push(redirectUrl);
      }
    } catch (err: any) {
      const msg = err?.message || 'Google sign-in failed. Please try again.';
      setErrorMessage(msg);
      onError?.(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if Google script is already loaded in window
    if (window.google?.accounts?.id && clientId && buttonContainerRef.current) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        // Clear container and render official Google button
        buttonContainerRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(buttonContainerRef.current, {
          theme: 'outline',
          size: 'large',
          text,
          shape: 'rectangular',
          width: 380,
          logo_alignment: 'left',
        });
      } catch (e) {
        console.error('Error rendering Google button:', e);
      }
    }
  }, [scriptLoaded, clientId, text]);

  // If no Google Client ID is configured yet, render our custom beautiful Google UI button
  // with informative helper notice
  if (!clientId) {
    return (
      <div className="w-full space-y-2">
        <button
          type="button"
          onClick={() => {
            setErrorMessage('Google Client ID is not configured yet in .env (NEXT_PUBLIC_GOOGLE_CLIENT_ID). Please add your Google Client ID.');
          }}
          className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 text-slate-700 text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-3 cursor-pointer group"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.64v3.03h3.88c2.28-2.09 3.66-5.17 3.66-9.11z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.44 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.56 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span className="group-hover:text-slate-900 transition-colors">
            Continue with Google
          </span>
        </button>

        {errorMessage && (
          <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-start gap-1.5 animate-in fade-in">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
            <span>{errorMessage}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {isProcessing ? (
        <div className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
          <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
          <span>Authenticating with Google...</span>
        </div>
      ) : (
        <div ref={buttonContainerRef} className="w-full flex justify-center min-h-[44px]" />
      )}

      {errorMessage && (
        <p className="text-[11px] text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-xl flex items-start gap-1.5 w-full animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
}

