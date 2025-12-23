import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiSettings } from 'react-icons/fi';
import { toast } from 'react-toastify';
import logo from "../../assets/images/image.png"


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
    setShowUserMenu(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 border-b border-orange-300">
        <div className="container-custom">
          <div className="flex justify-between items-center py-2 text-sm">
            {/* Left - Contact Info */}
            <div className="flex items-center space-x-6 text-gray-700">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span className="font-medium">+91-8888888888</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span>✉️</span>
                <span>websupport@healthnest.com</span>
              </div>
            </div>
            
            {/* Right - User Actions */}
            <div className="flex items-center space-x-6 text-gray-700">
              <div className="hidden md:flex items-center space-x-2">
                <span>📍</span>
                <span>Panipat, Haryana</span>
              </div>
              <Link to="/orders" className="hidden md:flex items-center space-x-1 hover:text-green-600 transition">
                <FiPackage className="w-4 h-4" />
                <span>Track Order</span>
              </Link>
              {user && token ? (
                <span className="font-medium text-green-600">{user.name}</span>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 hover:text-green-600 transition font-medium">
                  <FiUser className="w-4 h-4" />
                  <span>Log In | Sign Up</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3"> 
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <img
                    src={logo} 
                    alt="HealthNest Enterprises Logo" 
                    className="w-9 h-9 object-contain"
                /> 
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-gray-800"> 
                    HealthNest
                </span>
                <span className="text-xs text-green-600 font-semibold -mt-1">Enterprises</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-emerald-600 transition-all font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Cart Button - Desktop */}
            <div className="hidden md:block">
              <Link to="/cart" className="flex items-center space-x-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all group">
                <FiShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-green-600" />
                <span className="font-semibold text-gray-700 group-hover:text-green-600">Cart</span>
                {totalItems > 0 && (
                  <span className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center justify-center space-x-1 pb-4">
            <Link to="/" className="px-5 py-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all uppercase tracking-wide">
              Home
            </Link>
            <Link to="/products" className="px-5 py-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all uppercase tracking-wide">
              Products
            </Link>
            <Link to="/about" className="px-5 py-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all uppercase tracking-wide">
              About Us
            </Link>
            <Link to="/contact" className="px-5 py-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all uppercase tracking-wide">
              Contact Us
            </Link>
            {user && token && (
              <>
                <Link to="/orders" className="px-5 py-2 text-gray-700 hover:text-green-600 font-semibold text-base transition-all uppercase tracking-wide">
                  My Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="px-5 py-2 text-green-600 hover:text-green-700 font-semibold text-base transition-all uppercase tracking-wide">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-red-600 hover:text-red-700 font-semibold text-base transition-all uppercase tracking-wide"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 pt-2 border-t">
              {/* Mobile Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Link to="/" className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-semibold uppercase" onClick={toggleMenu}>
                  Home
                </Link>
                <Link to="/products" className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-semibold uppercase" onClick={toggleMenu}>
                  Products
                </Link>
                <Link to="/about" className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-semibold uppercase" onClick={toggleMenu}>
                  About Us
                </Link>
                <Link to="/contact" className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-semibold uppercase" onClick={toggleMenu}>
                  Contact Us
                </Link>
                <Link to="/cart" className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-semibold uppercase flex items-center justify-between" onClick={toggleMenu}>
                  <span className="flex items-center">
                    <FiShoppingCart className="mr-2" />
                    Cart
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {user && token ? (
                  <>
                    <hr className="my-2" />
                    <Link to="/orders" className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-semibold uppercase" onClick={toggleMenu}>
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="px-4 py-3 bg-green-50 text-green-600 font-semibold rounded-lg uppercase" onClick={toggleMenu}>
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-left font-semibold uppercase">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <hr className="my-2" />
                    <Link to="/login" className="mx-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg text-center uppercase" onClick={toggleMenu}>
                      Login | Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navbar;