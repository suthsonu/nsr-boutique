import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
    return (
        <motion.a
            href="https://wa.me/918106516947"
            target="_blank"
            rel="noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        >
            <MessageCircle className="h-8 w-8" />
            <span className="absolute right-full mr-4 bg-dark text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Order on WhatsApp
            </span>
            <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20"></span>
        </motion.a>
    );
}
