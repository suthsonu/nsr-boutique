import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/#services' },
        { name: 'Collection', path: '/#collection' },
        { name: 'Gallery', path: '/#gallery' },
        { name: 'Blog', path: '/#blog' },
        { name: 'Contact', path: '/#contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-secondary/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/images/logo.png" alt="NSR Fashion Boutique" className="h-14 w-auto object-contain Mix-blend-multiply" />
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.path} className="text-dark hover:text-primary transition-colors font-medium">
                                {link.name}
                            </a>
                        ))}
                        <a href="https://wa.me/918106516947" target="_blank" rel="noreferrer" className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primaryDark transition-colors">
                            WhatsApp Order
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-dark focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white shadow-lg absolute w-full"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 text-base font-medium text-dark hover:text-primary hover:bg-light rounded-md"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="https://wa.me/918106516947"
                                target="_blank" rel="noreferrer"
                                className="block mt-4 text-center bg-primary text-white px-5 py-3 rounded-full font-medium"
                            >
                                WhatsApp Order
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
