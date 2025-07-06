import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, SOCIAL_MEDIA } from '../../config/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/MayaNaturelsicon.png" 
                alt="Maya Naturals" 
                className="w-10 h-10"
              />
              <div>
                <span className="text-xl font-bold">{APP_NAME}</span>
                <p className="text-sm text-gray-400">Beauty with herbs</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Since 2011, crafting 100% organic, chemical-free beauty solutions using only natural herbs. 
              Experience the power of nature with 98% proven results.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-primary-400">
                <span className="font-medium">✓ ZED Certified</span>
              </div>
              <div className="flex items-center text-primary-400">
                <span className="font-medium">✓ UDYAM Registered</span>
              </div>
              <div className="flex items-center text-primary-400">
                <span className="font-medium">✓ 98% Proven Results</span>
              </div>
            </div>
            <div className="flex space-x-4">
              {SOCIAL_MEDIA.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Natural Collections</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/products?category=skincare" className="hover:text-white transition-colors">Skin Care</Link></li>
              <li><Link to="/products?category=haircare" className="hover:text-white transition-colors">Hair Care</Link></li>
              <li><Link to="/products?category=bodycare" className="hover:text-white transition-colors">Body Care</Link></li>
              <li><Link to="/products?category=herbal" className="hover:text-white transition-colors">Herbal Products</Link></li>
              <li><Link to="/products?featured=true" className="hover:text-white transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Maya Naturals</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/beauty-consultation" className="hover:text-white transition-colors">Beauty Consultation</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div>
                <p className="font-medium text-white">MAYA Naturals</p>
                <p>UDYAM-MH-04-0160386</p>
                <p>Aurangabad, Maharashtra</p>
              </div>
              <div>
                <p className="font-medium text-white">Customer Support</p>
                <p>1800-123-4567</p>
                <p>support@mayanaturals.com</p>
              </div>
              <div>
                <p className="font-medium text-white">Business Hours</p>
                <p>Mon-Sat: 9:00 AM - 7:00 PM</p>
                <p>Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Get Natural Beauty Tips & Exclusive Offers</h3>
              <p className="text-gray-400 text-sm">
                Join our community of natural beauty enthusiasts and receive weekly tips, exclusive discounts, and early access to new products.
              </p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border border-gray-700"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 {APP_NAME}. All rights reserved. | Proudly made in Maharashtra, India
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;