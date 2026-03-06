import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data);
                setLoading(false);
                if (data.meta_title) {
                    document.title = data.meta_title;
                }
                if (data.meta_description) {
                    let meta = document.querySelector('meta[name="description"]');
                    if (!meta) {
                        meta = document.createElement('meta');
                        meta.name = "description";
                        document.head.appendChild(meta);
                    }
                    meta.content = data.meta_description;
                }
            })
            .catch(console.error);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (!blog?.title) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h2>
            <Link to="/" className="text-primary hover:underline">Return Home</Link>
        </div>
    );

    return (
        <div className="font-sans text-dark bg-white">
            <Navbar />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
                <Link to="/#blog" className="inline-flex items-center gap-2 text-primary hover:text-primaryDark mb-8 transition-colors font-medium">
                    <ArrowLeft size={20} /> Back to Home
                </Link>
                <article className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-gray-900">{blog.title}</h1>
                    <div className="text-gray-500 mb-8 pb-8 border-b border-gray-100 flex items-center gap-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Article</span>
                        <span>Published on {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full max-h-[500px] object-cover rounded-2xl mb-12 shadow-sm"
                    />
                    <div
                        className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primaryDark prose-img:rounded-xl prose-img:shadow-sm"
                        dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
                    />
                </article>
            </main>
            <Footer />
        </div>
    );
}