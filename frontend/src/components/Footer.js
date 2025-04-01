import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook className="text-xl" />, url: "https://facebook.com" },
    { icon: <FaTwitter className="text-xl" />, url: "https://twitter.com" },
    { icon: <FaLinkedin className="text-xl" />, url: "https://linkedin.com" },
    { icon: <FaInstagram className="text-xl" />, url: "https://instagram.com" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Donate", path: "/donate" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Logo and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">DLF Africa</h2>
            <p className="text-green-100 leading-relaxed">
              Bridging the digital divide through education, mentorship, and technology access.
            </p>
          </div>

          {/* Quick Links with Animation */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-green-600 pb-2">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    className="hover:text-green-300 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b border-green-600 pb-2">
              Connect With Us
            </h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@dlfafrica.org
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +233 123 456 789
              </p>
              
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-green-100 text-sm mt-8 pt-4 border-t border-green-600"
        >
          &copy; {new Date().getFullYear()} DLF Africa. All Rights Reserved. |{" "}
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link> |{" "}
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;