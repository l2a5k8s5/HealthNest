// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { register, reset } from '../redux/slices/authSlice';
// import { toast } from 'react-toastify';
// import {
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiLock,
//   FiEye,
//   FiEyeOff,
//   FiCheck,
// } from 'react-icons/fi';
// // import heroImage from '../assets/login-people.png'; // same art as login

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, token, isLoading, isSuccess, isError, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message || 'Registration failed');
//     }

//     if (isSuccess && user && token) {
//       toast.success('Registration successful!');
//       navigate('/');
//     }

//     dispatch(reset());
//   }, [user, token, isSuccess, isError, message, navigate, dispatch]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const passwordStrength = () => {
//     const password = formData.password;
//     if (!password) return { strength: 0, label: '', color: '' };
//     if (password.length < 6)
//       return { strength: 33, label: 'Weak', color: 'bg-red-500' };
//     if (password.length < 10)
//       return { strength: 66, label: 'Medium', color: 'bg-yellow-500' };
//     return { strength: 100, label: 'Strong', color: 'bg-green-500' };
//   };

//   const strength = passwordStrength();
//   const passwordsMatch =
//     formData.password &&
//     formData.confirmPassword &&
//     formData.password === formData.confirmPassword;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!agreedToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     const { confirmPassword, ...userData } = formData;
//     dispatch(register(userData));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f3f5fb] px-4">
// <div
//     className="
//       w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden
//       grid grid-cols-1 md:grid-cols-2
//       transform transition-all duration-500 ease-out
//       hover:shadow-[0_25px_60px_rgba(15,23,42,0.25)] hover:-translate-y-1
//       animate-fadeIn
//     "
//   >        {/* Left orange banner */}
//         <div className="relative bg-gradient-to-b from-[#ff8b3d] to-[#ff5c2a] text-white p-10 flex flex-col justify-between">
//           <div>
//             <p className="text-sm uppercase tracking-[0.25em] mb-4 opacity-90">
//               E Spurt
//             </p>
//             <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
//               Manage your store<br />with powerful tools.
//             </h1>
//             <p className="text-sm md:text-base max-w-xs opacity-90">
//               Create your account and start simplifying your e‑commerce
//               management with our intuitive dashboards.
//             </p>
//           </div>

//           {/* <div className="mt-8 flex items-end justify-center">
//             <img
//               src={heroImage}
//               alt="People standing"
//               className="w-full max-w-xs md:max-w-sm object-contain drop-shadow-xl"
//             />
//           </div> */}
//         </div>

//         {/* Right register form */}
//         <div className="px-8 py-10 md:px-10 flex flex-col justify-center">
//           {/* Logo + heading */}
//           <div className="flex items-center justify-end mb-6">
//             <div className="flex items-center space-x-2">
//               <div className="w-9 h-9 rounded-full bg-[#ff6b35] flex items-center justify-center text-white font-bold">
//                 E+
//               </div>
//               <span className="font-semibold text-gray-800 text-sm">E Spurt</span>
//             </div>
//           </div>

//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
//             Create Account
//           </h2>
//           <p className="text-sm text-gray-500 mb-7">
//             Join us and start your journey today
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Full name */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <FiUser className="absolute left-3 top-3.5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <FiMail className="absolute left-3 top-3.5 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                   className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="9876543210"
//                   pattern="[0-9]{10}"
//                   className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
//                   required
//                 />
//               </div>
//               <p className="text-[11px] text-gray-500 mt-1 ml-1">
//                 Enter 10‑digit phone number
//               </p>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <FiLock className="absolute left-3 top-3.5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
//                   required
//                   minLength={6}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>

//               {formData.password && (
//                 <div className="mt-2">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-[11px] text-gray-600">
//                       Password strength:
//                     </span>
//                     <span
//                       className={`text-[11px] font-semibold ${
//                         strength.label === 'Weak'
//                           ? 'text-red-600'
//                           : strength.label === 'Medium'
//                           ? 'text-yellow-600'
//                           : 'text-green-600'
//                       }`}
//                     >
//                       {strength.label}
//                     </span>
//                   </div>
//                   <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className={`h-full ${strength.color} transition-all duration-300`}
//                       style={{ width: `${strength.strength}%` }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Confirm password */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <FiLock className="absolute left-3 top-3.5 text-gray-400" />
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowConfirmPassword((prev) => !prev)
//                   }
//                   className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? (
//                     <FiEyeOff size={18} />
//                   ) : (
//                     <FiEye size={18} />
//                   )}
//                 </button>
//               </div>
//               {formData.confirmPassword && (
//                 <div className="flex items-center mt-1 ml-1">
//                   {passwordsMatch ? (
//                     <p className="text-[11px] text-green-600 flex items-center">
//                       <FiCheck className="w-3 h-3 mr-1" />
//                       Passwords match
//                     </p>
//                   ) : (
//                     <p className="text-[11px] text-red-600">
//                       Passwords do not match
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Terms */}
//             <div className="flex items-start pt-1">
//               <input
//                 id="terms"
//                 type="checkbox"
//                 checked={agreedToTerms}
//                 onChange={(e) => setAgreedToTerms(e.target.checked)}
//                 className="mt-0.5 w-4 h-4 text-[#ff6b35] border-gray-300 rounded focus:ring-2 focus:ring-[#ff6b35] cursor-pointer"
//                 required
//               />
//               <label
//                 htmlFor="terms"
//                 className="ml-3 text-[11px] text-gray-600 leading-relaxed"
//               >
//                 I agree to the{' '}
//                 <Link
//                   to="/terms"
//                   className="text-[#ff6b35] hover:underline font-medium"
//                 >
//                   Terms and Conditions
//                 </Link>{' '}
//                 and{' '}
//                 <Link
//                   to="/privacy"
//                   className="text-[#ff6b35] hover:underline font-medium"
//                 >
//                   Privacy Policy
//                 </Link>
//                 .
//               </label>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="mt-3 w-full py-2.5 rounded-lg bg-[#ff6b35] text-white text-sm font-semibold shadow-md hover:bg-[#ff5c2a] transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </form>

//           {/* Already have account */}
//           <p className="mt-6 text-center text-xs text-gray-500">
//             Already have an account?{' '}
//             <Link
//               to="/login"
//               className="text-[#ff6b35] font-semibold hover:underline"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from 'react-icons/fi';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // OTP related states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpMethod, setOtpMethod] = useState('email'); // 'email' or 'phone'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Registration failed');
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 6)
      return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10)
      return { strength: 66, label: 'Medium', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength();
  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Show OTP modal instead of registering directly
    setShowOtpModal(true);
  };

  const handleSendOtp = async () => {
    try {
      // Here you would call your API to send OTP
      // Example: await dispatch(sendOtp({ method: otpMethod, value: otpMethod === 'email' ? formData.email : formData.phone }));
      
      // Simulating API call
      toast.success(`OTP sent to your ${otpMethod === 'email' ? 'email' : 'phone number'}`);
      setOtpSent(true);
      setResendTimer(60); // 60 seconds cooldown
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
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

    try {
      // Here you would verify OTP with your backend
      // Example: await dispatch(verifyOtp({ otp: otpCode, method: otpMethod }));
      
      // If OTP is verified, proceed with registration
      const { confirmPassword, ...userData } = formData;
      dispatch(register({ ...userData, otpVerified: true }));
      setShowOtpModal(false);
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left orange banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] text-white flex-col justify-center items-center p-12">
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold">E Spurt</h1>
          <p className="text-xl font-light">
            Manage your store with powerful tools.
          </p>
          <p className="text-base opacity-90">
            Create your account and start simplifying your e‑commerce management
            with our intuitive dashboards.
          </p>
        </div>
      </div>

      {/* Right register form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo + heading */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#ff6b35] text-white rounded-lg text-xl font-bold mb-2">
              E+
            </div>
            <h2 className="text-3xl font-bold text-gray-900">E Spurt</h2>
            <h3 className="text-2xl font-semibold text-gray-800">
              Create Account
            </h3>
            <p className="text-gray-600">Join us and start your journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10‑digit phone number"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formData.password && (
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

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
              {formData.confirmPassword && (
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

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#ff6b35] border-gray-300 rounded focus:ring-2 focus:ring-[#ff6b35] cursor-pointer"
                required
              />
              <label className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-[#ff6b35] hover:underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#ff6b35] hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ff6b35] text-white py-2.5 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Already have account */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#ff6b35] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff6b35] bg-opacity-10 text-[#ff6b35] rounded-full mb-4">
                {otpMethod === 'email' ? (
                  <FiMail className="w-8 h-8" />
                ) : (
                  <FiPhone className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Verify Your Account</h3>
              <p className="text-gray-600 mt-2">
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
                      <p className="text-sm text-gray-500">{formData.email}</p>
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
                      <p className="text-sm text-gray-500">{formData.phone}</p>
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleSendOtp}
                  className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              // OTP Input
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Enter the 6-digit code sent to your{' '}
                  {otpMethod === 'email' ? 'email' : 'phone number'}
                </p>

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
                  {resendTimer > 0 ? (
                    <p className="text-sm text-gray-500">
                      Resend OTP in {resendTimer}s
                    </p>
                  ) : (
                    <button
                      onClick={handleSendOtp}
                      className="text-sm text-[#ff6b35] hover:underline font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold hover:bg-[#ff5722] transition-colors"
                >
                  Verify & Create Account
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(['', '', '', '', '', '']);
                  }}
                  className="w-full text-gray-600 py-2 rounded-lg font-medium hover:text-gray-800 transition-colors"
                >
                  Change Method
                </button>
              </div>
            )}

            {/* Close Modal */}
            <button
              onClick={() => {
                setShowOtpModal(false);
                setOtpSent(false);
                setOtp(['', '', '', '', '', '']);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;