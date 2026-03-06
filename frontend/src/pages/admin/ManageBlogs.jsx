import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Trash2, Plus } from 'lucide-react';

export default function ManageBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '', meta_title: '', meta_description: '' });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBlogs = () => {
        fetch('https://nsr-boutique.onrender.com/api/blogs')
            .then(res => res.json())
            .then(setBlogs);
    };

    useEffect(() => fetchBlogs(), []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert('Featured image required');
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('image', image);

        try {
            await fetch('https://nsr-boutique.onrender.com/api/blogs', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: data
            });
            setFormData({ title: '', content: '', meta_title: '', meta_description: '' });
            setImage(null);
            e.target.reset();
            fetchBlogs();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    cconst handleDelete = async (id) => {
        if (!window.confirm('Delete this review?')) return;

        try {
            await fetch(`https://nsr-boutique.onrender.com/api/reviews/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            fetchReviews();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout title="Manage Blog">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10">
                <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-2 text-dark">
                    <span className="bg-primary/10 p-2 rounded-lg text-primary"><Plus size={20} /></span> Write New Post
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">Post Title</label>
                            <input required type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">Content (Markdown Format)</label>
                            <textarea required className="w-full px-4 py-4 border border-gray-200 rounded-xl h-64 resize-y focus:ring-2 focus:ring-primary outline-none leading-relaxed" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })}></textarea>
                        </div>
                    </div>
                    <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">SEO Meta Title <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={formData.meta_title} onChange={e => setFormData({ ...formData, meta_title: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">SEO Meta Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <textarea className="w-full px-4 py-3 border border-gray-200 rounded-xl h-24 focus:ring-2 focus:ring-primary outline-none resize-none" value={formData.meta_description} onChange={e => setFormData({ ...formData, meta_description: e.target.value })}></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">Featured Image Banner</label>
                            <input required type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" onChange={e => setImage(e.target.files[0])} />
                        </div>
                        <button disabled={loading} type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primaryDark mt-4 transition-colors shadow-md text-lg disabled:opacity-50">
                            {loading ? 'Publishing...' : 'Publish Blog Post'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-dark mb-6">Published Posts</h3>
                {blogs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-500">
                        No blog posts published yet. Start writing your style guides!
                    </div>
                ) : (
                    blogs.map(blog => (
                        <div key={blog.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-center gap-6 flex-1">
                                <img src={`https://nsr-boutique.onrender.com${blog.featured_image}`} alt={blog.title} className="w-28 h-24 object-cover rounded-xl shadow-sm" />
                                <div>
                                    <h4 className="font-bold text-xl mb-1.5 text-dark group-hover:text-primary transition-colors">{blog.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">Published: {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <div className="flex gap-2">
                                        <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${blog.meta_title || blog.meta_description ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            SEO Optimized: {blog.meta_title || blog.meta_description ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 px-4">
                                <button onClick={() => handleDelete(blog.id)} className="p-4 text-red-500 bg-red-50 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}