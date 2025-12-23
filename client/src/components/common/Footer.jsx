import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Makhana Enterprise</h3>
            <p className="text-sm mb-4">
              Premium quality makhana and dry fruits delivered fresh to your doorstep. 
              Taste the tradition, feel the health!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-500 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-500 transition text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-500 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-500 transition text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=makhana" className="hover:text-primary-500 transition text-sm">
                  Makhana
                </Link>
              </li>
              <li>
                <Link to="/products?category=dry-fruits" className="hover:text-primary-500 transition text-sm">
                  Dry Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=honey" className="hover:text-primary-500 transition text-sm">
                  Honey
                </Link>
              </li>
              <li>
                <Link to="/products?category=laddoo" className="hover:text-primary-500 transition text-sm">
                  Laddoos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary-500 mt-1" />
                <span className="text-sm">
                  123 Makhana Street<br />
                  Panipat, Haryana 132103
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-primary-500" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary-500" />
                <span className="text-sm">info@makhana.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Makhana Enterprise. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-primary-500 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-primary-500 transition">
              Terms & Conditions
            </Link>
            <Link to="/refund" className="text-sm text-gray-400 hover:text-primary-500 transition">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;