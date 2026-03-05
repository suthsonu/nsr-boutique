import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-dark text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    <div>
                        <img src="/images/logo.png" alt="NSR Boutique Logo" className="h-16 w-auto object-contain mb-6 mix-blend-screen" />
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Premium women's boutique and custom tailoring services specializing in maggam work, designer dresses, and ethnic fashion in Gachibowli, Hyderabad.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-primary transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-white hover:text-primary transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif text-xl font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="/#services" className="text-gray-300 hover:text-primary transition-colors">Our Services</a></li>
                            <li><a href="/#collection" className="text-gray-300 hover:text-primary transition-colors">Latest Collection</a></li>
                            <li><a href="/#gallery" className="text-gray-300 hover:text-primary transition-colors">Gallery</a></li>
                            <li><a href="/#blog" className="text-gray-300 hover:text-primary transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-xl font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                                <span className="text-gray-300">Wipro Circle Rd, TNGO's Colony Phase 2, Gachibowli, Hyderabad, Telangana 500046</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-gray-300">+91 8106516947</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-gray-300">Open Daily until 9:30 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} NSR Fashion Boutique. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
