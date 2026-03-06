import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import CollectionSection from '../components/CollectionSection';
import GallerySection from '../components/GallerySection';
import ReviewsSection from '../components/ReviewsSection';
import ContactSection from '../components/ContactSection';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function BlogListSection() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/blogs`)
            .then(res => res.json())
            .then(data => setBlogs(data.slice(0, 3)))
            .catch(console.error);
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section id="blog" className="py-20 bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">Style Guides & News</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
                        >
                            <div className="h-56 overflow-hidden">
                                <img src={`${import.meta.env.VITE_API_URL || "http://localhost:5001"}${blog.featured_image}`} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-serif font-bold text-dark mb-3 line-clamp-2">{blog.title}</h3>
                                <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-1">{blog.content}</p>
                                <Link to={`/blog/${blog.id}`} className="text-primary font-bold hover:text-primaryDark flex items-center gap-2 mt-auto">
                                    Read More
                                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <div className="min-h-screen font-sans antialiased text-dark bg-white">
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <CollectionSection />
            <GallerySection />
            <ReviewsSection />
            <BlogListSection />
            <ContactSection />
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}