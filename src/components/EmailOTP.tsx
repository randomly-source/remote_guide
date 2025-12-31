import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

interface EmailOTPProps {
  onVerified: (email: string) => void;
}

type OTPStep = 'email' | 'otp';

export function EmailOTP({ onVerified }: EmailOTPProps) {
  const [step, setStep] = useState<OTPStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setResendCooldown(60); // 60 second cooldown
    }, 1500);
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResendCooldown(60);
      setOtp(['', '', '', '']);
      otpInputRefs.current[0]?.focus();
    }, 1000);
  };

  const handleEditEmail = () => {
    setStep('email');
    setOtp(['', '', '', '']);
    setError('');
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 4 digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      otpInputRefs.current[3]?.focus();
      // Auto-verify
      setTimeout(() => handleVerifyOTP(pastedData), 100);
    }
  };

  const handleVerifyOTP = async (otpValue?: string) => {
    const codeToVerify = otpValue || otp.join('');
    if (codeToVerify.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API verification
    setTimeout(() => {
      // For demo: accept any 4-digit code
      // In production, verify against backend
      setIsLoading(false);
      onVerified(email);
    }, 1500);
  };

  return (
    <>
      {/* Email Input - Always visible */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 pb-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendOTP();
                  }
                }}
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>

          <Button
            onClick={handleSendOTP}
            disabled={isLoading || !email.trim()}
            fullWidth
            className="h-12 text-base font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Send OTP'
            )}
          </Button>
        </motion.div>
      </div>

      {/* OTP Modal - Bottom to top sliding */}
      <AnimatePresence>
        {step === 'otp' && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleEditEmail}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[70vh] flex flex-col"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Almost there!
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Check your email inbox on your phone and tap the verification link to verify your account.
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-3 text-center">
                      Enter verification code
                    </label>
                    <div className="flex justify-center gap-2 mb-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      ))}
                    </div>
                    {error && (
                      <p className="text-xs text-red-600 text-center mb-2">{error}</p>
                    )}
                  </div>

                  {/* Email Display */}
                  <div className="text-center mb-3">
                    <p className="text-xs text-gray-600">
                      Sent to: <span className="font-medium text-gray-900">{email}</span>
                    </p>
                  </div>

                  {/* Verify Button */}
                  <Button
                    onClick={() => handleVerifyOTP()}
                    disabled={isLoading || otp.some(d => !d)}
                    fullWidth
                    className="h-11 text-sm font-semibold bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleEditEmail}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-xs font-medium transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Edit email
                    </button>
                    <button
                      onClick={handleResendOTP}
                      disabled={resendCooldown > 0 || isLoading}
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : 'Resend code'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Safe area padding */}
              <div className="pb-safe" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

