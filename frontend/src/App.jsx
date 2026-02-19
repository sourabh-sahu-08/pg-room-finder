import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchFilters from './components/SearchFilters'
import RoomCard from './components/RoomCard'
import Footer from './components/Footer'
import BookingModal from './components/BookingModel'
import RoomModal from './components/RoomModal'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import { FaFilter, FaTimes, FaRedoAlt, FaPhone } from 'react-icons/fa'

const API_URL = 'http://localhost:5000/api'

const App = () => {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [bookingModal, setBookingModal] = useState({ isOpen: false, room: null })
  const [roomDetailsModal, setRoomDetailsModal] = useState({ isOpen: false, room: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Initial filters state
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 30000,
    location: '',
    type: '',
    facilities: [],
    gender: '',
    foodIncluded: null
  })

  // Initial fetch and filter change listener
  useEffect(() => {
    fetchRooms()
  }, [filters, searchTerm])

  const fetchRooms = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)
      if (filters.location) queryParams.append('location', filters.location)
      if (filters.type) queryParams.append('type', filters.type)
      if (filters.gender) queryParams.append('gender', filters.gender)
      if (filters.foodIncluded !== null) queryParams.append('foodIncluded', filters.foodIncluded)
      if (filters.facilities.length > 0) queryParams.append('facilities', filters.facilities.join(','))
      if (searchTerm) queryParams.append('search', searchTerm)

      const response = await fetch(`${API_URL}/rooms?${queryParams.toString()}`)
      const data = await response.json()
      setRooms(data)
      setFilteredRooms(data)
      setError(null)
    } catch (err) {
      setError('Could not connect to the server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleResetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 30000,
      location: '',
      type: '',
      facilities: [],
      gender: '',
      foodIncluded: null
    })
    setSearchTerm('')
  }

  const openBookingModal = (room) => setBookingModal({ isOpen: true, room })
  const closeBookingModal = () => setBookingModal({ isOpen: false, room: null })

  const openRoomDetails = (room) => setRoomDetailsModal({ isOpen: true, room })
  const closeRoomDetails = () => setRoomDetailsModal({ isOpen: false, room: null })

  const handleBookingSuccess = () => {
    setNotification({ type: 'success', message: 'Booking requested successfully!' })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleJumpToBooking = (room) => {
    setRoomDetailsModal({ isOpen: false, room: null })
    setBookingModal({ isOpen: true, room })
  }

  if (showDashboard && user) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Header onLoginClick={() => setShowLoginModal(true)} onDashboardClick={() => setShowDashboard(true)} />

      <Hero onSearch={handleSearch} searchTerm={searchTerm} />

      {/* Login Modal Overlay */}
      {showLoginModal && !user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowLoginModal(false)}></div>
          <div className="relative z-10 w-full max-w-md animate-slideUp">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl text-slate-400 hover:text-slate-900 transition-all z-20"
            >
              <FaTimes size={18} />
            </button>
            <Login onSuccess={() => {
              setShowLoginModal(false);
              setShowDashboard(true);
            }} />
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-2xl transform transition-all duration-300 animate-bounce ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          }`}>
          {notification.message}
        </div>
      )}

      <main className="container mx-auto px-4 py-12" id="rooms">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Mobile Filters Drawer */}
          <div className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-300 ${showMobileFilters ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
            <aside className={`absolute right-0 top-0 bottom-0 w-[85%] bg-white shadow-2xl transition-transform duration-500 ease-in-out ${showMobileFilters ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto p-6`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-500">
                  <FaTimes size={20} />
                </button>
              </div>
              <SearchFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />
            </aside>
          </div>

          <aside className="hidden lg:block lg:w-1/4">
            <SearchFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />
          </aside>

          <section className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  Available Rooms
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                  {filteredRooms.length} spaces matched your preferences
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <FaRedoAlt size={14} />
                <span>Reset All</span>
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-3xl h-96 animate-pulse shadow-sm"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-white rounded-[2rem] shadow-xl border border-slate-100 max-w-2xl mx-auto">
                <div className="text-7xl mb-6">🔌</div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Connection Issue</h3>
                <p className="text-slate-500 text-lg mb-8 px-10">{error}</p>
                <button
                  onClick={fetchRooms}
                  className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Try Reconnecting
                </button>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[2rem] shadow-xl border border-slate-100 max-w-2xl mx-auto">
                <div className="text-7xl mb-6">🔍</div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">No Matches Found</h3>
                <p className="text-slate-500 text-lg mb-8 px-10">We couldn't find any rooms matching your current filters. Try broadening your search.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                {filteredRooms.map(room => (
                  <RoomCard
                    key={room._id || room.id}
                    room={room}
                    onBook={openBookingModal}
                    onDetails={openRoomDetails}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 animate-fadeIn">
              <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Our Story
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight animate-slideUp">
                Crafting Exceptional Living <br /> Experiences Since 2024
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-8 animate-slideUp" style={{ animationDelay: '100ms' }}>
                Basera was born from a simple observation: finding quality, safe, and comfortable PG accommodations in Bilaspur was far too difficult. We set out to change that by curating only the best spaces that meet our rigorous standards.
              </p>
              <div className="grid grid-cols-2 gap-8 animate-slideUp" style={{ animationDelay: '200ms' }}>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors group">
                  <h4 className="text-3xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">Verified</h4>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Property Owners</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors group">
                  <h4 className="text-3xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">Transparent</h4>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Pricing Policy</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative animate-fadeIn" style={{ animationDelay: '300ms' }}>
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Living Space"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[4rem] p-10 lg:p-20 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 animate-scaleIn">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Ready to find your <br /> perfect room?</h2>
              <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                Our support team is available 24/7 to help you with your booking. Reach out to us for any queries.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                <a href="tel:+919876543210" className="bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4 group shadow-xl shadow-blue-600/20">
                  <FaPhone className="text-lg group-hover:rotate-12 transition-transform" />
                  Call Support
                </a>
                <a href="mailto:support@basera.com" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-white/20 transition-all">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={closeBookingModal}
        room={bookingModal.room}
        onSuccess={handleBookingSuccess}
      />

      <RoomModal
        isOpen={roomDetailsModal.isOpen}
        onClose={closeRoomDetails}
        room={roomDetailsModal.room}
        onBookNow={handleJumpToBooking}
      />

      <Footer />
    </div>
  );
}

export default App
