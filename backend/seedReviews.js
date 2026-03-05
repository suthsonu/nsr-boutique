const db = require('./src/models/db');

async function seedReviews() {
    try {
        const reviews = [
            { name: 'Priya Sharma', rating: 5, text: 'Amazing stitching quality and perfect fit for my designer saree! Highly recommend NSR Boutique for their excellent craftsmanship.', status: 'approved' },
            { name: 'Kavya Reddy', rating: 5, text: 'Customized my bridal dress here. The maggam work was so intricate, beautiful, and delivered on time. They made my day special.', status: 'approved' },
            { name: 'Anjali Rao', rating: 4, text: 'Great collection of readymade dresses and very prompt tailoring services. The boutique has a lovely ambiance.', status: 'approved' },
            { name: 'Test User', rating: 5, text: 'I just submitted this via the new website form. Excellent!', status: 'pending' }
        ];

        for (const rev of reviews) {
            await db('reviews').insert(rev);
            console.log(`Inserted review for ${rev.name}`);
        }

        console.log('Successfully seeded reviews.');
    } catch (error) {
        console.error('Insert failed:', error);
    } finally {
        db.destroy();
    }
}

seedReviews();
