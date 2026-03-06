import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReviewsSection() {
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', rating: 5, text: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/reviews`)
            .then(res => res.json())
            .then(setReviews)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setSuccess(true);
            setTimeout(() => {
                setShowModal(false);
                setSuccess(false);
                setFormData({ name: '', rating: 5, text: '' });
            }, 3000);
        } catch (err) {
            console.error(err);
            alert('Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">Customer Love</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 mb-8 max-w-2xl">See what our beautiful clients are saying about us, or share your own experience!</p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-dark hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                        <MessageSquare size={18} />
                        Write a Review
                    </button>
                </div>

                {reviews.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 italic bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm max-w-2xl mx-auto">
                        Be the first to leave a review!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.slice(0, 6).map((review, i) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative"
                            >
                                <div className="absolute top-8 right-8 text-7xl text-gray-100 font-serif leading-none italic opacity-50">"</div>
                                <div className="flex text-yellow-500 mb-6 relative z-10">
                                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
                                </div>
                                <p className="text-gray-700 mb-8 italic flex-1 leading-relaxed relative z-10">"{review.text}"</p>
                                <div className="flex items-center gap-4 pt-6 mt-auto border-t border-gray-50 relative z-10">
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold font-serif text-xl shadow-inner">
                                        {review.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark font-serif">{review.name}</h4>
                                        <p className="text-xs text-gray-400">Verified Customer</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Review Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
                            {success ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Star fill="currentColor" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-serif text-dark mb-2">Thank You!</h3>
                                    <p className="text-gray-600">Your review has been submitted and is pending approval.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                                        <h3 className="text-2xl font-bold font-serif text-dark flex items-center gap-2">
                                            <MessageSquare className="text-primary" />
                                            Share Your Thought
                                        </h3>
                                        <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-dark p-2 text-2xl leading-none">&times;</button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, rating: star })}
                                                        className={`p-1 transition-transform hover:scale-110 ${formData.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                                    >
                                                        <Star className="w-8 h-8 fill-current" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                                            <textarea required rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none resize-none transition-all" placeholder="Tell us about your dress or tailoring experience..." value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })}></textarea>
                                        </div>
                                        <button disabled={submitting} type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primaryDark disabled:opacity-50 transition-all duration-300 shadow-md hover:shadow-lg mt-2 text-lg">
                                            {submitting ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
