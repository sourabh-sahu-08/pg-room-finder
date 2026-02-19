import React from 'react'
import { FaTimes, FaMapMarkerAlt, FaStar, FaCheck, FaUtensils, FaUserShield, FaPhone, FaArrowRight, FaHome, FaShieldAlt } from 'react-icons/fa'

const RoomModal = ({ isOpen, onClose, room, onBookNow }) => {
    if (!isOpen || !room) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fadeIn"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row animate-slideUp">

                {/* Left Side - Image Carousel / Gallery */}
                <div className="lg:w-1/2 h-80 lg:h-auto relative overflow-hidden bg-slate-100">
                    <img
                        src={room.photos && room.photos[0] ? room.photos[0] : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                        alt={room.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                    <div className="absolute bottom-6 left-6 text-white lg:hidden">
                        <h2 className="text-3xl font-black mb-2">{room.title}</h2>
                        <div className="flex items-center gap-2 text-sm font-bold opacity-80">
                            <FaMapMarkerAlt /> {room.area}, {room.location}
                        </div>
                    </div>

                    {/* Availability Badge */}
                    <div className="absolute top-8 left-8">
                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 ${room.available ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            }`}>
                            {room.available ? (
                                <>
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                    Available Now
                                </>
                            ) : 'Sold Out'}
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-4 rounded-2xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all z-10 lg:hidden"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-8 lg:p-12">
                    {/* Desktop Close */}
                    <button
                        onClick={onClose}
                        className="hidden lg:block absolute top-10 right-10 p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
                    >
                        <FaTimes size={20} />
                    </button>

                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {room.type}
                            </span>
                            <div className="flex items-center text-amber-400 gap-1 text-sm font-black">
                                <FaStar /> {room.rating || 'New'}
                            </div>
                        </div>

                        <h2 className="hidden lg:block text-4xl font-black text-slate-900 mb-4 tracking-tight">
                            {room.title}
                        </h2>

                        <div className="flex items-center gap-6 mb-10 text-slate-500 font-bold">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-500" />
                                {room.area}, {room.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUserShield className="text-blue-500" />
                                {room.gender} Only
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div className="bg-slate-50 p-6 rounded-[2rem] text-center border border-slate-100 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly</span>
                                <span className="text-xl font-black text-slate-900">₹{room.price?.toLocaleString()}</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[2rem] text-center border border-slate-100 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Deposit</span>
                                <span className="text-xl font-black text-slate-900">₹{room.depositAmount?.toLocaleString()}</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[2rem] text-center border border-slate-100 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Food</span>
                                <span className={`text-[10px] font-black uppercase ${room.foodIncluded ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {room.foodIncluded ? 'Included' : 'Not Incl.'}
                                </span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[2rem] text-center border border-slate-100 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Verify</span>
                                <FaShieldAlt className="text-blue-500 text-xl mt-1" />
                            </div>
                        </div>

                        <div className="mb-10">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">The Space</h4>
                            <p className="text-slate-500 font-medium leading-relaxed text-lg">
                                {room.description}
                            </p>
                        </div>

                        <div className="mb-10">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Amenities</h4>
                            <div className="flex flex-wrap gap-3">
                                {room.facilities?.map((facility, idx) => (
                                    <span key={idx} className="bg-white border-2 border-slate-50 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-3">
                                        <FaCheck className="text-emerald-500" /> {facility}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-12">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Exact Location</h4>
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                                    <FaHome />
                                </div>
                                <div>
                                    <span className="block text-sm font-black text-slate-900 mb-1">Full Address</span>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        {room.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Final Call to Action */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <button
                                onClick={() => onBookNow(room)}
                                className="w-full sm:flex-1 bg-blue-600 text-white p-6 rounded-[2rem] font-black text-lg hover:bg-blue-700 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-4 group active:scale-[0.98]"
                            >
                                <span>Request to Book</span>
                                <FaArrowRight className="text-sm group-hover:translate-x-2 transition-transform" />
                            </button>
                            <a
                                href={`tel:${room.contactNumber}`}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 text-white p-6 rounded-[2rem] font-black text-lg hover:bg-white hover:text-slate-900 border-2 border-slate-900 transition-all active:scale-[0.98]"
                            >
                                <FaPhone size={18} />
                                <span>Call Owner</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomModal
