import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaBookmark, FaSignOutAlt, FaPlus, FaTrash, FaCheckCircle, FaClock, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import RoomFormModal from './RoomFormModal';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || '/api';
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'bookings' ? 'bookings' : 'rooms';
            const response = await fetch(`${API_URL}/${endpoint}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            const data = await response.json();
            if (activeTab === 'bookings') setBookings(data);
            else setRooms(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await fetch(`${API_URL}/bookings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ status })
            });
            fetchData();
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const handleDeleteRoom = async (id) => {
        if (!window.confirm('Are you sure you want to delete this room?')) return;
        try {
            await fetch(`${API_URL}/rooms/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': token
                }
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    const handleRoomSubmit = async (roomData) => {
        try {
            const method = editingRoom ? 'PUT' : 'POST';
            const endpoint = editingRoom ? `${API_URL}/rooms/${editingRoom._id}` : `${API_URL}/rooms`;

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(roomData)
            });

            if (response.ok) {
                setIsRoomModalOpen(false);
                setEditingRoom(null);
                fetchData();
            }
        } catch (error) {
            console.error('Error saving room:', error);
        }
    };

    const handleToggleAvailability = async (id, currentStatus) => {
        try {
            await fetch(`${API_URL}/rooms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ available: !currentStatus })
            });
            fetchData();
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-80 bg-slate-900 p-8 flex flex-col gap-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">B</div>
                    <div>
                        <h3 className="text-white font-black text-lg">Basera Admin</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{user?.name}</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-4">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <FaBookmark /> Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('rooms')}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'rooms' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <FaHome /> Manage Rooms
                    </button>
                </nav>

                <button
                    onClick={logout}
                    className="flex items-center gap-4 text-rose-400 hover:text-rose-500 font-bold px-6 py-4 transition-all"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto max-h-screen">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 capitalize">{activeTab}</h1>
                        <p className="text-slate-500 mt-2 font-medium">Overview of your property management</p>
                    </div>
                    {activeTab === 'rooms' && (
                        <button
                            onClick={() => {
                                setEditingRoom(null);
                                setIsRoomModalOpen(true);
                            }}
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                        >
                            <FaPlus /> Add New Room
                        </button>
                    )}
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 gap-6 animate-pulse">
                        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-3xl"></div>)}
                    </div>
                ) : activeTab === 'bookings' ? (
                    <div className="space-y-6">
                        {bookings.length === 0 ? (
                            <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200">
                                <p className="text-slate-500 font-bold">No bookings received yet.</p>
                            </div>
                        ) : bookings.map(booking => (
                            <div key={booking._id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-blue-200 transition-all">
                                <div className="flex gap-8 items-center">
                                    <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 overflow-hidden">
                                        <img src={booking.room?.photos?.[0]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900">{booking.user?.name}</h4>
                                        <p className="text-slate-500 font-medium">{booking.room?.title} • ₹{booking.room?.price}/mo</p>
                                        <div className="flex gap-4 mt-2">
                                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><FaClock className="text-[10px]" /> {new Date(booking.checkInDate).toLocaleDateString()}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {booking.status === 'pending' && (
                                        <button
                                            onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                                            className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all"
                                        >
                                            <FaCheckCircle size={18} />
                                        </button>
                                    )}
                                    <button className="p-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all">
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {rooms.map(room => (
                            <div key={room._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all group">
                                <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
                                    <img src={room.photos?.[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">₹{room.price}/mo</div>
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-2 truncate">{room.title}</h4>
                                <p className="text-slate-500 font-medium mb-6 line-clamp-2">{room.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${room.available ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {room.available ? 'Available' : 'Occupied'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingRoom(room);
                                                setIsRoomModalOpen(true);
                                            }}
                                            className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleToggleAvailability(room._id, room.available)}
                                            className={`p-3 rounded-xl transition-all ${room.available ? 'bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
                                            title={room.available ? "Mark as Occupied" : "Mark as Available"}
                                        >
                                            {room.available ? <FaTimes /> : <FaCheck />}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRoom(room._id)}
                                            className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <RoomFormModal
                isOpen={isRoomModalOpen}
                onClose={() => setIsRoomModalOpen(false)}
                onSubmit={handleRoomSubmit}
                room={editingRoom}
            />
        </div>
    );
};

export default AdminDashboard;
