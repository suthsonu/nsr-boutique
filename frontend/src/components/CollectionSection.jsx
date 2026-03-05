import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
    "All",
    "Royal Bridal Lehenga",
    "Designer Half Saree",
    "Bridal Gown Collection",
    "Designer Maggam work",
    "Designer Party Frock",
    "Elegant Boutique Dress",
    "Handloom Kurta Sets",
    "Cotton Kurta Sets"
];

export default function CollectionSection() {
    const [dresses, setDresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        fetch('http://localhost:5001/api/dresses')
            .then(res => res.json())
            .then(data => {
                setDresses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleOrder = (dressName) => {
        const msg = `Hello NSR Fashion Boutique,\nI am interested in this dress: *${dressName}*`;
        window.open(`https://wa.me/918106516947?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const filteredDresses = activeCategory === "All"
        ? dresses
        : dresses.filter(dress => dress.category === activeCategory);

    return (
        <section id="collection" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">Latest Collection</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : filteredDresses.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 bg-light rounded-2xl border border-dashed border-gray-300">
                        {activeCategory === "All" ? "New collection arriving soon!" : `No items in ${activeCategory} yet.`}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredDresses.map((dress, index) => (
                            <motion.div
                                key={dress.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col"
                            >
                                <div className="relative h-80 overflow-hidden bg-gray-100">
                                    <img src={`http://localhost:5001${dress.image_url}`} alt={dress.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-primary tracking-wide shadow-sm">
                                        {dress.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-serif font-bold text-dark mb-2 line-clamp-1">{dress.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{dress.description || 'Exclusive boutique collection.'}</p>
                                    {dress.price && <p className="text-xl font-bold text-dark mb-5 border-t border-gray-100 pt-4">₹{dress.price}</p>}

                                    <button
                                        onClick={() => handleOrder(dress.name)}
                                        className="w-full bg-primary/5 text-primary hover:bg-primary hover:text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
                                    >
                                        Order on WhatsApp
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
