import { Scissors, Palette, Sparkles, Gem, Shirt, Briefcase, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    { icon: Scissors, title: "Custom Tailoring", desc: "Perfect fit customized exactly to your measurements and style preferences." },
    { icon: Sparkles, title: "Dress Designing", desc: "Unique designer dresses crafted for your special occasions." },
    { icon: Palette, title: "Saree Designing", desc: "Elegant saree draping, blouse designs, and fall/fpic work." },
    { icon: Gem, title: "Maggam Work", desc: "Intricate hand embroidery and traditional maggam designs." },
    { icon: Shirt, title: "Stitching", desc: "Professional stitching services for all types of women's wear." },
    { icon: Briefcase, title: "Office Wear Kurtas", desc: "Elegant and comfortable office wear kurtas designed for daily professional use." },
    { icon: ShoppingBag, title: "Handloom Kurta Sets", desc: "Authentic handloom fabrics crafted into beautiful, breathable kurta sets." },
    { icon: ShoppingBag, title: "Cotton Kurta Sets", desc: "Lightweight and stylish cotton kurta sets perfect for everyday comfort." }
];

export default function ServicesSection() {
    return (
        <section id="services" className="py-20 bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">Our Services</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Experience premium craftsmanship and personalized attention for all your fashion needs at NSR Boutique.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 group"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary shadow-sm group-hover:shadow-md">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold font-serif mb-3 text-dark">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
