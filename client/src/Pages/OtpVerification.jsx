
// ===================================================================
// OTPVerification.jsx - NEW SEPARATE COMPONENT
// ===================================================================

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { register, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FiMail, FiPhone, FiArrowLeft, FiShield } from 'react-icons/fi';

function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from navigation state
  const userData = location.state?.userData;

  const [otpMethod, setOtpMethod] = useState('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  const { user, token, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  // Redirect if no user data
  useEffect(() => {
    if (!userData) {
      toast.error('Please complete registration first');
      navigate('/register');
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Registration failed');
      setIsVerifying(false);
    }
    if (isSuccess && user && token) {
      toast.success('Registration successful!');
      navigate('/');
    }
    dispatch(reset());
  }, [user, token, isSuccess, isError, message, navigate, dispatch]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async () => {
    try {
      // Call your API to send OTP
      // Example: await dispatch(sendOtp({ method: otpMethod, value: otpMethod === 'email' ? userData.email : userData.phone }));
      
      toast.success(
        `OTP sent to your ${otpMethod === 'email' ? 'email' : 'phone number'}`
      );
      setOtpSent(true);
      setResendTimer(60);
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);

    try {
      // Verify OTP with your backend
      // Example: await dispatch(verifyOtp({ otp: otpCode, method: otpMethod }));

      // If OTP is verified, proceed with registration
      dispatch(register({ ...userData, otpVerified: true, otpMethod }));
    } catch (error) {
      toast.error('Invalid OTP');
      setIsVerifying(false);
    }
  };

  const handleChangeMethod = () => {
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setResendTimer(0);
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left orange banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] text-white flex-col justify-center items-center p-12">
        <div className="max-w-md space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
            <FiShield className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold">Verify Your Identity</h1>
          <p className="text-xl font-light">
            We've sent a verification code to secure your account.
          </p>
          <p className="text-base opacity-90">
            This extra step ensures that only you can access your account and
            helps us keep your data safe.
          </p>
        </div>
      </div>

      {/* Right verification form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Back button */}
          <button
            onClick={() => navigate('/register')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiArrowLeft />
            <span className="text-sm font-medium">Back to Registration</span>
          </button>

          {/* Logo + heading */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff6b35] bg-opacity-10 text-[#ff6b35] rounded-full mb-4">
              <FiShield className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Verify Your Account
            </h2>
            <p className="text-gray-600">
              Choose how you'd like to receive your verification code
            </p>
          </div>

          {!otpSent ? (
            // OTP Method Selection
            <div className="space-y-4">
              <div className="space-y-3">
                {/* Email Option */}
                <button
                  onClick={() => setOtpMethod('email')}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    otpMethod === 'email'
                      ? 'border-[#ff6b35] bg-[#ff6b35] bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      otpMethod === 'email'
                        ? 'border-[#ff6b35]'
                        : 'border-gray-300'
                    }`}
                  >
                    {otpMethod === 'email' && (
                      <div className="w-3 h-3 bg-[#ff6b35] rounded-full" />
                    )}
                  </div>
                  <FiMail className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                </button>

                {/* Phone Option */}
                <button
                  onClick={() => setOtpMethod('phone')}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    otpMethod === 'phone'
                      ? 'border-[#ff6b35] bg-[#ff6b35] bg-opacity-5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      otpMethod === 'phone'
                        ? 'border-[#ff6b35]'
                        : 'border-gray-300'
                    }`}
                  >
                    {otpMethod === 'phone' && (
                      <div className="w-3 h-3 bg-[#ff6b35] rounded-full" />
                    )}
                  </div>
                  <FiPhone className="w-5 h-5 text-gray-600" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-500">{userData.phone}</p>
                  </div>
                </button>
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors"
              >
                Send Verification Code
              </button>
            </div>
          ) : (
            // OTP Input
            <div className="space-y-6">
              <div className="bg-[#ff6b35] bg-opacity-5 border border-[#ff6b35] border-opacity-20 rounded-lg p-4">
                <p className="text-sm text-gray-700 text-center">
                  Enter the 6-digit code sent to your{' '}
                  <span className="font-semibold">
                    {otpMethod === 'email' ? 'email' : 'phone number'}
                  </span>
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {otpMethod === 'email' ? userData.email : userData.phone}
                </p>
              </div>

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
                    onClick={handleSendOtp}
                    className="text-sm text-[#ff6b35] hover:underline font-medium"
                  >
                    Resend Verification Code
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                  className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Create Account'}
                </button>

                <button
                  onClick={handleChangeMethod}
                  className="w-full text-gray-600 py-2 rounded-lg font-medium hover:text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  Change Verification Method
                </button>
              </div>
            </div>
          )}

          {/* Security note */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              🔒 Your information is secure. We use industry-standard encryption
              to protect your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;