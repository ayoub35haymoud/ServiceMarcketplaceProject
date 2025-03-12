import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-gray-800 py-10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-orange-500 border border-orange-500 p-1">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <h2 className="text-xl font-bold">E-tutor</h2>
            </div>
            <p className="text-sm text-gray-600">
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec mattis elitr sit.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-cyan-600 hover:text-white transition-all duration-300">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-cyan-600 hover:text-white transition-all duration-300">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="p-2 rounded-md text-gray-700 hover:bg-cyan-600 transition-all duration-300">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-cyan-600 hover:text-white transition-all duration-300">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-cyan-600 hover:text-white transition-all duration-300">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* TOP 4 CATEGORY */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold tracking-wider">Top 4 Category</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Development</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Finance & Accounting</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Design</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Business</a>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">About</a>
              </li>
              <li>
                <a href="#" className="group flex items-center hover:text-cyan-600 transition-all duration-300">
                  <span>Become Instructor</span>
                  <i className="fa-solid fa-chevron-right ml-2 text-orange-500 text-xs"></i>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Career</a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold tracking-wider">Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Terms & Condition</a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-600 transition-all duration-300">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* DOWNLOAD OUR APP */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold tracking-wider">Download Our App</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center border border-gray-200 rounded-md p-2 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-300">
                <i className="fa-brands fa-apple text-2xl mr-2"></i>
                <div>
                  <div className="text-xs text-gray-500">Download now</div>
                  <div className="text-sm">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center border border-gray-200 rounded-md p-2 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-300">
                <i className="fa-brands fa-google-play text-2xl mr-2"></i>
                <div>
                  <div className="text-xs text-gray-500">Download now</div>
                  <div className="text-sm">Play Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-500">
            © 2025 - brikol website ofppt
          </div>
          <div className="mt-4 md:mt-0">
            <select className="bg-gray-100 border border-gray-200 text-gray-700 rounded-md px-3  text-sm focus:outline-none focus:ring-1 focus:ring-cyan-600">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;