import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiMail,
  FiPhone,
  FiArrowLeft,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from 'react-icons/fi';

function ForgotPassword() {
  const navigate = useNavigate();
  
  // Step management: 'method' -> 'otp' -> 'reset'
  const [step, setStep] = useState('method');
  const [resetMethod, setResetMethod] = useState('email');
  const [contactValue, setContactValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Resend timer countdown
  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const passwordStrength = () => {
    if (!newPassword) return { strength: 0, label: '', color: '' };
    if (newPassword.length < 6)
      return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    if (newPassword.length < 10)
      return { strength: 66, label: 'Medium', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength();
  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!contactValue) {
      toast.error(`Please enter your ${resetMethod}`);
      return;
    }

    // Validate email or phone
    if (resetMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactValue)) {
        toast.error('Please enter a valid email address');
        return;
      }
    } else {
      if (contactValue.length !== 10) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Call your API to send OTP
      // Example: await dispatch(sendPasswordResetOtp({ method: resetMethod, value: contactValue }));
      
      toast.success(`OTP sent to your ${resetMethod}`);
      setStep('otp');
      setResendTimer(60);
    } catch (error) {
      toast.error('Failed to send OTP. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Call your API to resend OTP
      toast.success(`OTP resent to your ${resetMethod}`);
      setResendTimer(60);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setIsLoading(true);

    try {
      // Call your API to verify OTP
      // Example: await dispatch(verifyPasswordResetOtp({ otp: otpCode, method: resetMethod, value: contactValue }));
      
      toast.success('OTP verified successfully');
      setStep('reset');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // Call your API to reset password
      // Example: await dispatch(resetPassword({ password: newPassword, otp: otp.join(''), method: resetMethod, value: contactValue }));
      
      toast.success('Password reset successful! Please login with your new password.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeMethod = () => {
    setStep('method');
    setOtp(['', '', '', '', '', '']);
    setResendTimer(0);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left orange banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] text-white flex-col justify-center items-center p-12">
        <div className="max-w-md space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
            <FiLock className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold">Reset Your Password</h1>
          <p className="text-xl font-light">
            Don't worry, it happens to the best of us.
          </p>
          <p className="text-base opacity-90">
            We'll help you get back into your account quickly and securely.
            Just follow the simple steps to reset your password.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Back button */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiArrowLeft />
            <span className="text-sm font-medium">Back to Login</span>
          </button>

          {/* Logo + heading */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#ff6b35] text-white rounded-lg text-xl font-bold mb-2">
              E+
            </div>
            <h2 className="text-3xl font-bold text-gray-900">E Spurt</h2>
          </div>

          {/* Step 1: Choose Method */}
          {step === 'method' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Forgot Password?
                </h3>
                <p className="text-gray-600">
                  Choose how you'd like to reset your password
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Method Selection */}
                <div className="space-y-3">
                  {/* Email Option */}
                  <button
                    type="button"
                    onClick={() => setResetMethod('email')}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      resetMethod === 'email'
                        ? 'border-[#ff6b35] bg-[#ff6b35] bg-opacity-5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        resetMethod === 'email'
                          ? 'border-[#ff6b35]'
                          : 'border-gray-300'
                      }`}
                    >
                      {resetMethod === 'email' && (
                        <div className="w-3 h-3 bg-[#ff6b35] rounded-full" />
                      )}
                    </div>
                    <FiMail className="w-5 h-5 text-gray-600" />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">Email Address</p>
                      <p className="text-sm text-gray-500">
                        Reset via email verification
                      </p>
                    </div>
                  </button>

                  {/* Phone Option */}
                  <button
                    type="button"
                    onClick={() => setResetMethod('phone')}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      resetMethod === 'phone'
                        ? 'border-[#ff6b35] bg-[#ff6b35] bg-opacity-5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        resetMethod === 'phone'
                          ? 'border-[#ff6b35]'
                          : 'border-gray-300'
                      }`}
                    >
                      {resetMethod === 'phone' && (
                        <div className="w-3 h-3 bg-[#ff6b35] rounded-full" />
                      )}
                    </div>
                    <FiPhone className="w-5 h-5 text-gray-600" />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">Phone Number</p>
                      <p className="text-sm text-gray-500">
                        Reset via SMS verification
                      </p>
                    </div>
                  </button>
                </div>

                {/* Contact Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {resetMethod === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    {resetMethod === 'email' ? (
                      <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                    ) : (
                      <FiPhone className="absolute left-3 top-2.5 text-gray-400" />
                    )}
                    <input
                      type={resetMethod === 'email' ? 'email' : 'tel'}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={
                        resetMethod === 'email'
                          ? 'Enter your email address'
                          : 'Enter your phone number'
                      }
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Verification Code'}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Verify OTP */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Enter Verification Code
                </h3>
                <div className="bg-[#ff6b35] bg-opacity-5 border border-[#ff6b35] border-opacity-20 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-700">
                    Enter the 6-digit code sent to your{' '}
                    <span className="font-semibold">{resetMethod}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{contactValue}</p>
                </div>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* OTP Input Boxes */}
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35] focus:ring-opacity-20 outline-none transition-all"
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Didn't receive the code?
                  </p>
                  {resendTimer > 0 ? (
                    <p className="text-sm text-gray-500">
                      Resend code in{' '}
                      <span className="font-semibold text-[#ff6b35]">
                        {resendTimer}s
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-[#ff6b35] hover:underline font-medium"
                    >
                      Resend Verification Code
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                  </button>

                  <button
                    type="button"
                    onClick={handleChangeMethod}
                    className="w-full text-gray-600 py-2 rounded-lg font-medium hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    Change Verification Method
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-2">
                  <FiCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Create New Password
                </h3>
                <p className="text-gray-600">
                  Your new password must be different from previously used passwords
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {newPassword && (
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.strength}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Password strength: {strength.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {confirmPassword && (
                    <div className="mt-2">
                      {passwordsMatch ? (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <FiCheck className="w-3 h-3" />
                          Passwords match
                        </p>
                      ) : (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <FiX className="w-3 h-3" />
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </form>
            </div>
          )}

          {/* Security note */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              🔒 Your password reset request is secure and encrypted.
            </p>
          </div>

          {/* Sign in link */}
          {step === 'method' && (
            <p className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-[#ff6b35] hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;