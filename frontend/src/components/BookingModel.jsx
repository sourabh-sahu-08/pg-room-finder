import React, { useState } from 'react'
import { FaTimes, FaCalendar, FaUser, FaPhone, FaEnvelope, FaCheck, FaArrowRight, FaShieldAlt } from 'react-icons/fa'

const API_URL = 'http://localhost:5000/api'

const BookingModal = ({ isOpen, onClose, room, onSuccess }) => {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    checkInDate: '',
    duration: '1',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room._id || room.id,
          user: {
            name: bookingDetails.name,
            email: bookingDetails.email,
            phone: bookingDetails.phone
          },
          checkInDate: bookingDetails.checkInDate,
          duration: Number(bookingDetails.duration),
          message: bookingDetails.message
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const data = await response.json()
      setIsSubmitted(true)

      if (onSuccess) {
        onSuccess()
      }

      setTimeout(() => {
        setBookingDetails({
          name: '',
          email: '',
          phone: '',
          checkInDate: '',
          duration: '1',
          message: ''
        })
        setIsSubmitted(false)
        onClose()
      }, 4000)
    } catch (err) {
      console.error('Error creating booking:', err)
      setError('Service is temporarily unavailable. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
      {/* Glassmorphism Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row animate-slideUp">

        {/* Sidebar Info - Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-1/3 bg-[#0f172a] p-10 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[80px]"></div>

          <div>
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-8">
              <FaShieldAlt className="text-xl" />
            </div>
            <h2 className="text-3xl font-black mb-4 tracking-tight">Secure <br />Booking</h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              Your details are safe with us. Our verified owners will contact you directly to finalize your stay.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">1</div>
              <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Submit Request</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">2</div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Verify Details</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">3</div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Move In</span>
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="flex-1 bg-white p-6 lg:p-12 overflow-y-auto custom-scrollbar">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 lg:top-10 lg:right-10 p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors z-10"
          >
            <FaTimes size={20} />
          </button>

          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center mb-8 animate-bounce">
                <FaCheck className="text-4xl text-emerald-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Request Sent!</h2>
              <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
                Great choice! The owner of <span className="text-blue-600 font-bold">{room?.title}</span> has been notified and will reach out to you shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <span className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px]">Booking For</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2">{room?.title}</h3>
                <div className="flex items-center gap-4 mt-4">
                  <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500">{room?.type}</span>
                  <span className="text-slate-900 font-black text-lg">₹{room?.price?.toLocaleString()}</span>
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-2xl mb-8 text-sm font-bold flex items-center gap-3">
                  <span className="text-lg">⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        type="text"
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white p-5 pl-12 rounded-3xl outline-none font-bold text-slate-900 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        type="tel"
                        name="phone"
                        value={bookingDetails.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white p-5 pl-12 rounded-3xl outline-none font-bold text-slate-900 transition-all"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        type="email"
                        name="email"
                        value={bookingDetails.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white p-5 pl-12 rounded-3xl outline-none font-bold text-slate-900 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Check-in Date</label>
                    <div className="relative">
                      <FaCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        type="date"
                        name="checkInDate"
                        value={bookingDetails.checkInDate}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white p-5 pl-12 rounded-3xl outline-none font-bold text-slate-900 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Stay Duration</label>
                  <select
                    name="duration"
                    value={bookingDetails.duration}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white p-5 rounded-3xl outline-none font-bold text-slate-900 transition-all appearance-none cursor-pointer"
                  >
                    <option value="1">1 Month Plan</option>
                    <option value="3">3 Months Plan</option>
                    <option value="6">6 Months Plan</option>
                    <option value="12">12 Months Plan</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white p-6 rounded-[2rem] font-black text-lg hover:bg-blue-700 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-4 group active:scale-[0.98] disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Secure Booking Now</span>
                      <FaArrowRight className="text-sm group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  No hidden fees • Direct owner contact
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingModal
