import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Star, CheckCircle, Trash2 } from 'lucide-react';

export default function ManageReviews() {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = () => {
        fetch('https://nsr-boutique.onrender.com/api/reviews', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => res.json())
            .then(setReviews)
            .catch(console.error);
    };

    useEffect(() => fetchReviews(), []);

    const handleApprove = async (id) => {
        try {
            await fetch(`https://nsr-boutique.onrender.com/api/reviews/${id}/approve`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchReviews();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        try {
            await fetch(`https://nsr-boutique.onrender.com/api/reviews/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchReviews();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout title="Manage Reviews">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-4 font-medium text-gray-600">Customer Info</th>
                            <th className="px-6 py-4 font-medium text-gray-600">Review</th>
                            <th className="px-6 py-4 font-medium text-gray-600 text-center">Status</th>
                            <th className="px-6 py-4 font-medium text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500 border-t border-gray-100 border-dashed">No reviews submitted yet.</td></tr>
                        ) : (
                            reviews.map(review => (
                                <tr key={review.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800">{review.name}</div>
                                        <div className="flex text-yellow-500 mt-1">
                                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-600 text-sm max-w-md line-clamp-3">"{review.text}"</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${review.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {review.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        {review.status === 'pending' && (
                                            <button onClick={() => handleApprove(review.id)} className="text-green-600 hover:text-white p-2 hover:bg-green-600 rounded-lg transition-colors border border-transparent mr-2">
                                                <CheckCircle size={20} />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-white p-2 hover:bg-red-500 rounded-lg transition-colors border border-transparent">
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
