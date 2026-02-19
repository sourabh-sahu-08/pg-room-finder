import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaImage, FaCheckSquare } from 'react-icons/fa';

const RoomFormModal = ({ isOpen, onClose, onSubmit, room }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        area: '',
        location: '',
        type: 'Single',
        gender: 'Any',
        foodIncluded: false,
        available: true,
        facilities: [],
        photos: []
    });

    const availableFacilities = ['Wifi', 'AC', 'Laundry', 'Parking', 'Attached Washroom', 'CCTV', 'Power Backup'];

    useEffect(() => {
        if (room) {
            setFormData({
                ...room,
                price: room.price.toString(),
                facilities: room.facilities || [],
                photos: room.photos || []
            });
        } else {
            setFormData({
                title: '',
                description: '',
                price: '',
                area: '',
                location: '',
                type: 'Single',
                gender: 'Any',
                foodIncluded: false,
                available: true,
                facilities: [],
                photos: []
            });
        }
    }, [room, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFacilityToggle = (facility) => {
        setFormData(prev => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter(f => f !== facility)
                : [...prev.facilities, facility]
        }));
    };

    const handleAddPhoto = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            setFormData(prev => ({
                ...prev,
                photos: [...prev.photos, url]
            }));
        }
    };

    const handleRemovePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: Number(formData.price)
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-slideUp p-8 lg:p-12 relative">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-3xl font-black text-slate-900 mb-8">
                    {room ? 'Edit Room Listing' : 'List New Room'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Room Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-500/10 focus:bg-white outline-none font-bold"
                                placeholder="Modern Single Room near GGU"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Monthly Rent (₹)</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-500/10 focus:bg-white outline-none font-bold"
                                placeholder="5500"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-500/10 focus:bg-white outline-none font-bold"
                            placeholder="Describe the room, atmosphere, and neighborhood..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Area / Neighborhood</label>
                            <input
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-500/10 focus:bg-white outline-none font-bold"
                                placeholder="Koni, Bilaspur"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Address / Location</label>
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-500/10 focus:bg-white outline-none font-bold"
                                placeholder="Gali No. 4, Opposite GGU Gate"
                                required
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/10"
                            >
                                <option value="Single">Single</option>
                                <option value="Sharing">Sharing</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/10"
                            >
                                <option value="Any">Any</option>
                                <option value="Boys">Boys</option>
                                <option value="Girls">Girls</option>
                            </select>
                        </div>
                        <div className="flex flex-col justify-end pb-4 space-y-2 ml-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="foodIncluded"
                                    checked={formData.foodIncluded}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded-lg border-2 border-slate-200 text-blue-600 focus:ring-0 cursor-pointer"
                                />
                                <span className="text-sm font-black text-slate-600 group-hover:text-slate-900 transition-colors">Food Included</span>
                            </label>
                        </div>
                        <div className="flex flex-col justify-end pb-4 space-y-2 ml-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded-lg border-2 border-slate-200 text-blue-600 focus:ring-0 cursor-pointer"
                                />
                                <span className="text-sm font-black text-slate-600 group-hover:text-slate-900 transition-colors">Available</span>
                            </label>
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Facilities & Amenities</label>
                        <div className="flex flex-wrap gap-3">
                            {availableFacilities.map(facility => (
                                <button
                                    key={facility}
                                    type="button"
                                    onClick={() => handleFacilityToggle(facility)}
                                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${formData.facilities.includes(facility)
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                                            : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'
                                        }`}
                                >
                                    {facility}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Photos */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center ml-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Photo URLs</label>
                            <button
                                type="button"
                                onClick={handleAddPhoto}
                                className="text-blue-600 font-black text-xs uppercase tracking-widest hover:text-blue-700"
                            >
                                + Add Photo
                            </button>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                            {formData.photos.map((photo, index) => (
                                <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-50">
                                    <img src={photo} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePhoto(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <FaTimes size={10} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddPhoto}
                                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:text-blue-500 hover:border-blue-200 transition-all gap-2"
                            >
                                <FaImage size={24} />
                                <span className="text-[10px] font-black uppercase">Add Link</span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 shadow-xl shadow-slate-100 transition-all active:scale-[0.98]"
                        >
                            <FaSave />
                            {room ? 'Update Listing' : 'Create Listing'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomFormModal;
