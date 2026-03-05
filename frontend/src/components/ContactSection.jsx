import { MapPin, Phone, Clock } from 'lucide-react';

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">Visit Our Boutique</h2>
                        <div className="w-24 h-1 bg-primary mb-8 rounded-full"></div>

                        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                            Drop by to explore our latest collection or schedule a consultation for custom dress designing and tailoring. We are conveniently located in the heart of Gachibowli.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0 shadow-sm border border-primary/5">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-lg mb-2">Store Address</h4>
                                    <p className="text-gray-600 leading-relaxed">Wipro Circle Rd, TNGO's Colony Phase 2,<br />Gachibowli, Hyderabad, Telangana 500046</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0 shadow-sm border border-primary/5">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-lg mb-2">Phone / WhatsApp</h4>
                                    <p className="text-gray-600 text-lg font-medium">+91 8106516947</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0 shadow-sm border border-primary/5">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-lg mb-2">Business Hours</h4>
                                    <p className="text-gray-600">Open Daily<br />10:00 AM - 9:30 PM</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row gap-4">
                            <a href="tel:+918106516947" className="flex-1 bg-dark text-white text-center py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-md">Call Now</a>
                            <a href="https://wa.me/918106516947" target="_blank" rel="noreferrer" className="flex-1 bg-primary hover:bg-primaryDark text-white text-center py-4 rounded-xl font-medium shadow-md transition-colors">WhatsApp Us</a>
                        </div>
                    </div>

                    <div className="h-[550px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                        <iframe
                            title="NSR Boutique Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.694600109033!2d78.3364!3d17.4363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a109cd70cf%3A0xe5cdb21cebb8144f!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1709500000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
