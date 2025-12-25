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
} from 'react-icons/fi';
// import heroImage from '../assets/login-people.png'; // same art as login

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    const { confirmPassword, ...userData } = formData;
    dispatch(register(userData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f5fb] px-4">
<div
    className="
      w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden
      grid grid-cols-1 md:grid-cols-2
      transform transition-all duration-500 ease-out
      hover:shadow-[0_25px_60px_rgba(15,23,42,0.25)] hover:-translate-y-1
      animate-fadeIn
    "
  >        {/* Left orange banner */}
        <div className="relative bg-gradient-to-b from-[#ff8b3d] to-[#ff5c2a] text-white p-10 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] mb-4 opacity-90">
              E Spurt
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Manage your store<br />with powerful tools.
            </h1>
            <p className="text-sm md:text-base max-w-xs opacity-90">
              Create your account and start simplifying your e‑commerce
              management with our intuitive dashboards.
            </p>
          </div>

          {/* <div className="mt-8 flex items-end justify-center">
            <img
              src={heroImage}
              alt="People standing"
              className="w-full max-w-xs md:max-w-sm object-contain drop-shadow-xl"
            />
          </div> */}
        </div>

        {/* Right register form */}
        <div className="px-8 py-10 md:px-10 flex flex-col justify-center">
          {/* Logo + heading */}
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-[#ff6b35] flex items-center justify-center text-white font-bold">
                E+
              </div>
              <span className="font-semibold text-gray-800 text-sm">E Spurt</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-7">
            Join us and start your journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-500 mt-1 ml-1">
                Enter 10‑digit phone number
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-gray-600">
                      Password strength:
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        strength.label === 'Weak'
                          ? 'text-red-600'
                          : strength.label === 'Medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-gray-50"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="flex items-center mt-1 ml-1">
                  {passwordsMatch ? (
                    <p className="text-[11px] text-green-600 flex items-center">
                      <FiCheck className="w-3 h-3 mr-1" />
                      Passwords match
                    </p>
                  ) : (
                    <p className="text-[11px] text-red-600">
                      Passwords do not match
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#ff6b35] border-gray-300 rounded focus:ring-2 focus:ring-[#ff6b35] cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="ml-3 text-[11px] text-gray-600 leading-relaxed"
              >
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="text-[#ff6b35] hover:underline font-medium"
                >
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-[#ff6b35] hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 w-full py-2.5 rounded-lg bg-[#ff6b35] text-white text-sm font-semibold shadow-md hover:bg-[#ff5c2a] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-6 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#ff6b35] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
