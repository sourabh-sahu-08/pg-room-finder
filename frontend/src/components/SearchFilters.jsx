import React from 'react'
import { FaFilter, FaRupeeSign, FaMapMarkerAlt, FaHome, FaUserFriends, FaUtensils, FaTimes, FaUndo } from 'react-icons/fa'

const SearchFilters = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    })
  }

  const handleFacilityToggle = (facility) => {
    const currentFacilities = filters.facilities || []
    const newFacilities = currentFacilities.includes(facility)
      ? currentFacilities.filter(f => f !== facility)
      : [...currentFacilities, facility]

    handleChange('facilities', newFacilities)
  }

  const facilities = ['AC', 'WiFi', 'Food', 'Laundry', 'Parking', 'Security', 'TV', 'GYM', 'Geyser', 'Kitchen', 'Study Room']
  const roomTypes = ['PG', 'Hostel', 'Room', 'Shared Room']
  const genders = ['Male', 'Female', 'Co-ed']

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sticky top-32 border border-slate-100 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FaFilter size={14} />
          </div>
          Filters
        </h3>
        <button
          onClick={onReset}
          className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          <FaUndo size={10} />
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Price Range */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget Range</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-300 ml-2">Min</span>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', Number(e.target.value))}
                className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/10 focus:bg-white transition-all text-sm"
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-300 ml-2">Max</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
                className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/10 focus:bg-white transition-all text-sm"
                placeholder="30000"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</h4>
          <div className="relative group">
            <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/10 focus:bg-white transition-all text-sm"
              placeholder="E.g. Koni"
            />
          </div>
        </div>

        {/* Room Type */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</h4>
          <div className="grid grid-cols-2 gap-2">
            {roomTypes.map(type => (
              <button
                key={type}
                onClick={() => handleChange('type', filters.type === type ? '' : type)}
                className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${filters.type === type
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                    : 'bg-white border-slate-100 text-slate-500 hover:border-blue-500/20'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preference</h4>
          <div className="flex gap-2">
            {genders.map(gender => (
              <button
                key={gender}
                onClick={() => handleChange('gender', filters.gender === gender ? '' : gender)}
                className={`flex-1 px-4 py-3 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${filters.gender === gender
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                    : 'bg-white border-slate-100 text-slate-500 hover:border-blue-500/20'
                  }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facilities</h4>
          <div className="flex flex-wrap gap-2">
            {facilities.map(facility => (
              <button
                key={facility}
                onClick={() => handleFacilityToggle(facility)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filters.facilities?.includes(facility)
                    ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-600/10'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
              >
                {facility}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilters
