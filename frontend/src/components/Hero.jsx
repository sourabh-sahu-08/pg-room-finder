import React from 'react'
import { FaSearch, FaMapMarkerAlt, FaHome, FaUsers, FaStar } from 'react-icons/fa'

const Hero = ({ onSearch, searchTerm }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
      {/* Premium Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f172a]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8 animate-fadeIn">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-400 text-sm font-bold tracking-wide uppercase">New rooms added daily</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1] animate-slideUp">
            The Smart Way to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-200">
              Live in Bilaspur
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slideUp" style={{ animationDelay: '100ms' }}>
            Discover curated PG accommodations that blend comfort, security, and community. Perfect for modern professionals and ambitious students.
          </p>

          {/* Premium Search Box */}
          <div className="relative max-w-3xl mx-auto animate-slideUp" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 lg:p-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-blue-500/30 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex-1 flex items-center px-6 py-4 w-full">
                  <FaSearch className="text-blue-500 text-xl shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by area or room type..."
                    value={searchTerm}
                    onChange={onSearch}
                    className="w-full bg-transparent text-white px-4 outline-none placeholder-slate-500 text-lg font-medium"
                  />
                </div>
                <button className="w-full lg:w-auto bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95">
                  Start Exploring
                </button>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['Koni', 'Sipat Road', 'City Center', 'River View'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearch({ target: { value: tag } })}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-1.5 rounded-full text-sm text-slate-400 hover:text-white transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* High-End Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '400ms' }}>
            {[
              { label: 'Properties', value: '500+', icon: FaHome },
              { label: 'Happy Tenants', value: '1K+', icon: FaUsers },
              { label: 'Avg Rating', value: '4.9', icon: FaStar },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <stat.icon className="text-3xl text-blue-500 mb-3" />
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafc] to-transparent pointer-events-none"></div>
    </div>
  )
}

export default Hero
