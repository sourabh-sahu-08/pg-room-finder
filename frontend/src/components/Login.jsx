import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';

const Login = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token, data.user);
                if (onSuccess) onSuccess();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
                <p className="text-slate-400 font-medium">Please login to access the dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-fadeIn">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                    <div className="relative group">
                        <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 p-5 pl-14 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/10 focus:bg-white transition-all"
                            placeholder="admin@basera.com"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
                    <div className="relative group">
                        <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 p-5 pl-14 rounded-2xl outline-none font-bold text-slate-900 border-2 border-transparent focus:border-blue-500/10 focus:bg-white transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    {loading ? 'Authenticating...' : (
                        <>
                            Sign In
                            <FaArrowRight size={14} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;
