import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Scissors, Image as ImageIcon, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ dresses: 0, images: 0, blogs: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [dresses, gallery, blogs] = await Promise.all([
                    fetch('http://localhost:5001/api/dresses').then(res => res.json()),
                    fetch('http://localhost:5001/api/gallery').then(res => res.json()),
                    fetch('http://localhost:5001/api/blogs').then(res => res.json())
                ]);
                setStats({ dresses: dresses.length, images: gallery.length, blogs: blogs.length });
                setLoading(false);
            } catch (err) {
                console.error('Failed to load stats', err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Dresses', count: stats.dresses, icon: Scissors, link: '/admin/dresses', color: 'bg-pink-100 text-pink-600' },
        { title: 'Gallery Images', count: stats.images, icon: ImageIcon, link: '/admin/gallery', color: 'bg-blue-100 text-blue-600' },
        { title: 'Blog Posts', count: stats.blogs, icon: FileText, link: '/admin/blogs', color: 'bg-green-100 text-green-600' }
    ];

    return (
        <AdminLayout title="Dashboard Overview">
            {loading ? (
                <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map(card => {
                        const Icon = card.icon;
                        return (
                            <div key={card.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 font-medium mb-1">{card.title}</p>
                                    <h3 className="text-3xl font-bold text-dark">{card.count}</h3>
                                    <Link to={card.link} className="text-primary text-sm font-medium hover:underline mt-4 inline-block">Manage &rarr;</Link>
                                </div>
                                <div className={`p-4 rounded-xl ${card.color}`}>
                                    <Icon size={32} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </AdminLayout>
    );
}