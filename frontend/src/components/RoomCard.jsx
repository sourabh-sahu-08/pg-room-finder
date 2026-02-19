import React from 'react'
import { FaMapMarkerAlt, FaStar, FaCheck, FaUtensils, FaUserShield, FaArrowRight, FaShareAlt } from 'react-icons/fa'

const RoomCard = ({ room, onBook, onDetails }) => {
  return (
    <div
      onClick={() => onDetails(room)}
      className="group bg-white rounded-[2.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] transition-all duration-500 border border-slate-100/50 flex flex-col h-full cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
        <img
          src={room.photos && room.photos[0] ? room.photos[0] : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
          alt={room.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          {room.available ? (
            <span className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center">
              Available
            </span>
          ) : (
            <span className="bg-rose-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
              Full
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const text = `Check out this room: ${room.title} in ${room.area}, Bilaspur. Rent: ₹${room.price}/mo`;
              if (navigator.share) {
                navigator.share({
                  title: 'Basera - Room Finder',
                  text: text,
                  url: window.location.href,
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(text + " " + window.location.href);
                alert('Details copied to clipboard!');
              }
            }}
            className="bg-white/90 backdrop-blur-md text-slate-900 p-2.5 rounded-2xl shadow-lg hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            title="Share"
          >
            <FaShareAlt size={12} />
          </button>
          <span className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-2xl text-[10px] font-black shadow-lg flex items-center">
            <FaStar className="mr-1.5 text-amber-400" /> {room.rating || 'New'}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <span className="bg-slate-900/40 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-bold border border-white/20">
            {room.type}
          </span>
          <span className="bg-white text-slate-900 px-4 py-2 rounded-2xl text-xs font-black shadow-xl">
            ₹{room.price?.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-2 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {room.title}
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center text-slate-400 text-xs font-bold mb-5 tracking-wide uppercase">
          <FaMapMarkerAlt className="mr-2 text-blue-500" />
          <span>{room.area}, {room.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-slate-50 text-slate-500 px-4 py-2 rounded-xl text-[10px] font-black border border-slate-100 flex items-center">
            <FaUserShield className="mr-2 text-blue-400" /> {room.gender}
          </span>
          {room.foodIncluded && (
            <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black border border-emerald-100 flex items-center">
              <FaUtensils className="mr-2" /> Meal Included
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deposit</span>
            <span className="text-sm font-extrabold text-slate-900">₹{room.depositAmount?.toLocaleString()}</span>
          </div>
          <button
            onClick={() => onBook(room)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] font-bold text-sm hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 group/btn"
          >
            <span>Book Now</span>
            <FaArrowRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
