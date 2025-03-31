import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Brief Description */}
          <div>
            <h2 className="text-xl font-bold">DLF Africa</h2>
            <p className="mt-2 text-sm">
              Bridging the digital divide through education, mentorship, and technology access.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-gray-300">Courses</Link></li>
              <li><Link to="/donate" className="hover:text-gray-300">Donate</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-lg font-semibold">Connect with Us</h2>
            <p className="mt-2 text-sm">Email: support@dlfafrica.org</p>
            <p className="text-sm">Phone: +233 123 456 789</p>
            <div className="flex space-x-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-6 border-t border-gray-400 pt-4">
          &copy; {new Date().getFullYear()} DLF Africa. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
