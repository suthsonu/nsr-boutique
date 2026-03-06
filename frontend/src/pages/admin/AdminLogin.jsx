import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLogin() {
    const [view, setView] = useState('login'); // 'login' or 'reset'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('https://nsr-boutique.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                navigate('/nsr-portal-2026/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const res = await fetch('https://nsr-boutique.onrender.com/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, secretKey, newPassword })
            });
            const data = await res.json();

            if (res.ok) {
                setSuccess('Password reset successfully! You can now log in.');
                setTimeout(() => {
                    setView('login');
                    setSuccess('');
                    setPassword('');
                    setSecretKey('');
                    setNewPassword('');
                }, 3000);
            } else {
                setError(data.message || 'Reset failed');
            }
        } catch (err) {
            setError('Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-dark mb-2">Admin Portal</h1>
                    <p className="text-gray-500">{view === 'login' ? 'Sign in to manage NSR Boutique' : 'Reset your admin password'}</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">{error}</div>}
                {success && <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-6 text-center border border-green-100 font-medium">{success}</div>}

                {view === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="admin@nsrboutique.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => { setView('reset'); setError(''); setSuccess(''); }}
                                className="text-sm text-primary hover:text-primaryDark font-medium transition-colors"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-dark hover:bg-black text-white py-3.5 rounded-xl font-medium transition-colors shadow-md mt-2 disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleReset} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-gray-50"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="admin@nsrboutique.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <KeyRound size={14} className="text-gray-400" />
                                Secret Passphrase
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                value={secretKey}
                                onChange={e => setSecretKey(e.target.value)}
                                placeholder="Enter your server master key"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                required
                                minLength="6"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="At least 6 characters"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primaryDark text-white py-3.5 rounded-xl font-medium transition-colors shadow-md mt-4 disabled:opacity-50"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                            className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-dark py-2 mt-4 transition-colors font-medium text-sm"
                        >
                            <ArrowLeft size={16} /> Back to Sign In
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
