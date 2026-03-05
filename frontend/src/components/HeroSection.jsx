import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/images/hero_bg.jpg")' }}
            >
                <div className="absolute inset-0 bg-dark/60"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-serif text-white font-bold mb-6"
                >
                    Elegance Redefined.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-200 mb-10 font-light leading-relaxed max-w-3xl mx-auto"
                >
                    Discover exclusive collections and bespoke tailoring designed for the modern woman. Crafted with precision by Sushma & Reshma.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <a href="#collection" className="bg-primary hover:bg-primaryDark text-white px-10 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                        Explore Collection
                    </a>
                    <a href="https://wa.me/918106516947?text=Hello%20Sushma%20%26%20Reshma!%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noreferrer" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-dark transition-all duration-300 text-lg">
                        Book Appointment
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
