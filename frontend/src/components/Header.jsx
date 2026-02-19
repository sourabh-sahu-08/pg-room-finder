import React, { useState, useEffect } from 'react'
import { FaHome, FaBars, FaTimes, FaPhone, FaChevronRight, FaUserShield } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Header = ({ onLoginClick, onDashboardClick }) => {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled
      ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3'
      : 'bg-transparent py-6'
      }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform duration-300">
              <FaHome className="text-white text-xl" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Basera
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {['Home', 'Rooms', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-600 hover:text-blue-600 font-bold text-sm tracking-wide uppercase transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <button
                onClick={onDashboardClick}
                className="flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 group"
              >
                <FaUserShield className="text-sm" />
                <span className="font-bold">Admin Panel</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-slate-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wide px-4 py-2"
              >
                Owner Login
              </button>
            )}
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-3 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 group"
            >
              <FaPhone className="text-sm" />
              <span className="font-bold">Contact Support</span>
              <FaChevronRight className="text-[10px] opacity-50 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-3 rounded-2xl transition-colors ${scrolled ? 'bg-slate-100' : 'bg-white/50 backdrop-blur-md'
              }`}
          >
            {isMenuOpen ? <FaTimes size={20} className="text-slate-900" /> : <FaBars size={20} className="text-slate-900" />}
          </button>
        </div>

        {/* Mobile Navigation Overly */}
        <div className={`lg:hidden fixed inset-0 top-[72px] bg-white transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <nav className="p-8 flex flex-col space-y-6">
            {['Home', 'Rooms', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-black text-slate-900 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-10 border-t border-slate-100">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-5 rounded-3xl font-bold shadow-xl shadow-blue-100"
              >
                <FaPhone size={18} />
                <span>Call Us Now</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
