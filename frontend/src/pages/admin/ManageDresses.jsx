import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Trash2, Plus } from 'lucide-react';

export default function ManageDresses() {
    const [dresses, setDresses] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: 'Royal Bridal Lehenga', description: '', price: '' });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const fetchDresses = () => {
        fetch('https://nsr-boutique.onrender.com/api/dresses')
            .then(res => res.json())
            .then(setDresses);
    }

    useEffect(() => fetchDresses(), []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If we are NOT editing, an image is absolutely required
        if (!editingId && !image) return alert('Image required for new dresses');

        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            const method = editingId ? 'PUT' : 'POST';
            const url = editingId ? `https://nsr-boutique.onrender.com/api/reviews/${id}/approve` : 'https://nsr-boutique.onrender.com/api/dresses';

            await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: data
            });
            cancelEdit();
            fetchDresses();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (dress) => {
        setEditingId(dress.id);
        setFormData({ name: dress.name, category: dress.category, description: dress.description || '', price: dress.price || '' });
        setImage(null); // Reset image input so it doesn't accidentally re-upload
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ name: '', category: 'Royal Bridal Lehenga', description: '', price: '' });
        setImage(null);
        document.getElementById('dress-form').reset();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this dress?')) return;
        try {
            await fetch(`https://nsr-boutique.onrender.com/api/reviews/${id}/approve`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            fetchDresses();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout title="Manage Dresses">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-dark">
                            <span className="bg-primary/10 p-2 rounded-lg">
                                {editingId ? null : <Plus size={20} className="text-primary" />}
                            </span>
                            {editingId ? 'Edit Dress' : 'Add New Dress'}
                        </h3>
                        <form id="dress-form" onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dress Name</label>
                                <input required type="text" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Royal Bridal Lehenga">Royal Bridal Lehenga</option>
                                    <option value="Designer Half Saree">Designer Half Saree</option>
                                    <option value="Bridal Gown Collection">Bridal Gown Collection</option>
                                    <option value="Designer Maggam work">Designer Maggam work</option>
                                    <option value="Designer Party Frock">Designer Party Frock</option>
                                    <option value="Elegant Boutique Dress">Elegant Boutique Dress</option>
                                    <option value="Handloom Kurta Sets">Handloom Kurta Sets</option>
                                    <option value="Cotton Kurta Sets">Cotton Kurta Sets</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
                                <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none h-24 resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {editingId ? 'New High-Res Image (Optional)' : 'High-Res Image'}
                                </label>
                                <input required={!editingId} type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" onChange={e => setImage(e.target.files[0])} />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button disabled={loading} type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primaryDark disabled:opacity-50 transition-colors shadow-sm">
                                    {loading ? 'Saving...' : (editingId ? 'Update Dress' : 'Publish Dress')}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={cancelEdit} className="px-4 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="px-6 py-4 font-medium text-gray-600">Product Image</th>
                                    <th className="px-6 py-4 font-medium text-gray-600">Details</th>
                                    <th className="px-6 py-4 font-medium text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dresses.length === 0 ? (
                                    <tr><td colSpan="3" className="px-6 py-12 text-center text-gray-500 border-t border-gray-100 border-dashed">No dresses uploaded yet. Start by adding one!</td></tr>
                                ) : (
                                    dresses.map(dress => (
                                        <tr key={dress.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <img src={`https://nsr-boutique.onrender.com/api/reviews/${id}/approve`} alt={dress.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800 text-lg mb-1">{dress.name}</div>
                                                <div className="text-sm">
                                                    <span className="bg-gray-200 px-2 py-1 rounded text-gray-700 mr-2">{dress.category}</span>
                                                    {dress.price && <span className="text-gray-600 font-medium">₹{dress.price}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-right flex justify-end gap-2 items-center h-[112px]">
                                                <button onClick={() => handleEdit(dress)} className="text-blue-500 hover:text-white p-2 hover:bg-blue-500 rounded-lg transition-colors border border-transparent hover:border-blue-600">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(dress.id)} className="text-red-500 hover:text-white p-2 hover:bg-red-500 rounded-lg transition-colors border border-transparent hover:border-red-600">
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}