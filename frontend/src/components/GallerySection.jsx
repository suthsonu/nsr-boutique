import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function GallerySection() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/gallery`)
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="gallery" className="py-20 bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">Boutique Gallery</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {images.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-dashed border-gray-300">
                        Check back soon for latest store photos.
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                        {images.map((img, i) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                                className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer shadow-sm group"
                                onClick={() => setSelectedImage(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}${img.image_url}`)}
                            >
                                <img
                                    src={img.image_url}
                                    alt="Gallery Item"
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                                    <span className="bg-white/90 text-dark px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        View
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center p-4 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={28} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Expanded Gallery"
                            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
