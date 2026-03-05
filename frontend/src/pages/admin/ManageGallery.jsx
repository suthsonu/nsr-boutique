import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Trash2, UploadCloud } from 'lucide-react';

export default function ManageGallery() {
    const [images, setImages] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchGallery = () => {
        fetch('https://nsr-boutique.onrender.com/api/gallery')
            .then(res => res.json())
            .then(setImages);
    };

    useEffect(() => fetchGallery(), []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!imageFile) return;
        setLoading(true);

        const data = new FormData();
        data.append('image', imageFile);

        try {
            await fetch('http://localhost:5001/api/gallery', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: data
            });
            setImageFile(null);
            document.getElementById('gallery-upload-form').reset();
            fetchGallery();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this image?')) return;
        try {
            await fetch(`http://localhost:5001/api/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            fetchGallery();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout title="Manage Gallery">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 border-dashed border-2">
                <form id="gallery-upload-form" onSubmit={handleUpload} className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 w-full relative">
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={e => setImageFile(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-primary/30 rounded-2xl bg-primary/5 text-primary group hover:bg-primary/10 transition-colors">
                            <UploadCloud size={28} />
                            <span className="font-medium text-lg">{imageFile ? imageFile.name : 'Click or Drag to Upload Image'}</span>
                        </div>
                    </div>
                    <button
                        disabled={!imageFile || loading}
                        type="submit"
                        className="w-full md:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-bold hover:bg-primaryDark disabled:opacity-50 transition-colors shadow-md text-lg"
                    >
                        {loading ? 'Uploading...' : 'Publish to Gallery'}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {images.map(img => (
                    <div key={img.id} className="relative group rounded-2xl overflow-hidden shadow-sm aspect-square bg-gray-100 border border-gray-100">
                        <img src={`http://localhost:5001${img.image_url}`} alt="Gallery" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <button onClick={() => handleDelete(img.id)} className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 shadow-2xl transition-transform hover:scale-110">
                                <Trash2 size={24} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}