import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scissors, Image as ImageIcon, FileText, LogOut, Star } from 'lucide-react';

export default function AdminLayout({ children, title }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const navs = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Dresses', path: '/admin/dresses', icon: Scissors },
        { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
        { name: 'Blogs', path: '/admin/blogs', icon: FileText },
        { name: 'Reviews', path: '/admin/reviews', icon: Star },
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="w-64 bg-dark text-white hidden md:flex flex-col">
                <div className="p-6">
                    <Link to="/" className="text-xl font-serif font-bold text-accent">NSR Admin</Link>
                </div>
                <nav className="flex-1 px-4 mt-6 space-y-2">
                    {navs.map(nav => {
                        const Icon = nav.icon;
                        const active = location.pathname === nav.path;
                        return (
                            <Link key={nav.name} to={nav.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
                                <Icon size={20} />
                                <span>{nav.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-red-600/20 text-red-400 transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-white border-b px-8 py-5 flex justify-between items-center z-10">
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                </header>
                <main className="flex-1 p-8 overflow-auto bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
