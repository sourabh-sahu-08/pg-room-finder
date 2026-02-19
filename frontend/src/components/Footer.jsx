import React from 'react'
import { FaHome, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-blue-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                <FaHome className="text-white text-xl" />
              </div>
              <span className="text-3xl font-black tracking-tight">Basera</span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Redefining student and professional living in Bilaspur with curated spaces that prioritize comfort, safety, and modern amenities.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 rounded-[1.25rem] bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Navigation</h3>
              <ul className="space-y-4">
                {['Home', 'Rooms', 'About', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-white font-bold transition-colors flex items-center group">
                      <FaChevronRight className="text-[8px] mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {link === 'About Us' ? 'About' : link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Accommodations</h3>
              <ul className="space-y-4">
                {['Boys PG', 'Girls PG', 'Shared Hostel', 'Private Rooms'].map(link => (
                  <li key={link}>
                    <a href="#rooms" className="text-slate-400 hover:text-white font-bold transition-colors flex items-center group">
                      <FaChevronRight className="text-[8px] mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Get In Touch</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase text-slate-500 mb-1">Office</span>
                    <span className="text-sm font-bold text-slate-300">Bilaspur, Chhattisgarh</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 shrink-0">
                    <FaPhone />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase text-slate-500 mb-1">Support</span>
                    <span className="text-sm font-bold text-slate-300">+91 98765 43210</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold">
            &copy; {new Date().getFullYear()} BASERA LIVING. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-white text-xs font-black uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs font-black uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
