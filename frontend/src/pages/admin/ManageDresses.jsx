import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Trash2, Plus } from 'lucide-react';

export default function ManageDresses() {

    const [dresses, setDresses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Lehengas',
        description: '',
        price: ''
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

    const fetchDresses = () => {
        fetch(`${API}/api/dresses`)
            .then(res => res.json())
            .then(setDresses);
    };

    useEffect(() => {
        fetchDresses();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!editingId && !image) {
            return alert("Image required for new dresses");
        }

        setLoading(true);

        const data = new FormData();

        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        if (image) data.append("image", image);

        try {

            const method = editingId ? "PUT" : "POST";

            const url = editingId
                ? `${API}/api/dresses/${editingId}`
                : `${API}/api/dresses`;

            await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
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

        setFormData({
            name: dress.name,
            category: dress.category || "Lehengas",
            description: dress.description || "",
            price: dress.price || ""
        });

        setImage(null);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const cancelEdit = () => {

        setEditingId(null);

        setFormData({
            name: "",
            category: "Lehengas",
            description: "",
            price: ""
        });

        setImage(null);

        document.getElementById("dress-form").reset();
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this dress?")) return;

        try {

            await fetch(`${API}/api/dresses/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
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

                            {editingId ? "Edit Dress" : "Add New Dress"}

                        </h3>

                        <form id="dress-form" onSubmit={handleSubmit} className="space-y-4">

                            <input
                                required
                                type="text"
                                placeholder="Dress Name"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    required
                                    type="text"
                                    list="category-options"
                                    placeholder="Select from list OR type a new category"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1 pl-1">You can type any new category name to create a new one.</p>
                                <datalist id="category-options">
                                    <option value="Lehengas" />
                                    <option value="Blouses" />
                                    <option value="Half Sarees" />
                                    <option value="Gowns" />
                                    <option value="Party Wear" />
                                    <option value="Kurta Sets" />
                                </datalist>
                            </div>

                            <input
                                type="number"
                                placeholder="Price"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />

                            <textarea
                                placeholder="Description"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />

                            <input
                                required={!editingId}
                                type="file"
                                accept="image/*"
                                onChange={e => setImage(e.target.files[0])}
                            />

                            <button
                                disabled={loading}
                                className="w-full bg-primary text-white py-3 rounded-xl"
                            >
                                {loading ? "Saving..." : editingId ? "Update Dress" : "Publish Dress"}
                            </button>

                        </form>

                    </div>

                </div>

                <div className="lg:col-span-2">

                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">

                        <table className="w-full">

                            <thead>

                                <tr className="bg-gray-50 border-b">
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {dresses.map(dress => (

                                    <tr key={dress.id} className="border-b">

                                        <td className="px-6 py-4">

                                            <img
                                                src={`${API}${dress.image_url}`}
                                                alt={dress.name}
                                                className="w-20 h-20 object-cover rounded-xl"
                                            />

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="font-bold">{dress.name}</div>

                                            <div className="text-sm text-gray-500">
                                                {dress.category}
                                            </div>

                                            {dress.price && (
                                                <div className="text-sm">
                                                    ₹{dress.price}
                                                </div>
                                            )}

                                        </td>

                                        <td className="px-6 py-4 text-right">

                                            <button
                                                onClick={() => handleEdit(dress)}
                                                className="text-blue-500 mr-4"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(dress.id)}
                                                className="text-red-500"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}