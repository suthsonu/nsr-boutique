const db = require('./src/models/db');

async function updateAllProducts() {
    try {
        const newProducts = [
            { name: 'Royal Bridal Lehenga', price: 36999, category: 'Lehenga' },
            { name: 'Designer Half Saree', price: 14999, category: 'Saree' },
            { name: 'Bridal Gown Collection', price: 18999, category: 'Gown' },
            { name: 'Designer Maggam Blouse', price: 4999, category: 'Blouse' },
            { name: 'Designer Party Frock', price: 8499, category: 'Frock' },
            { name: 'Elegant Boutique Dress', price: 5999, category: 'Dress' }
        ];

        // 1. Fetch current dresses to get their IDs and image URLs
        const existingDresses = await db('dresses').orderBy('id', 'asc');

        // 2. We only have 6 new product details, so we'll update the first 6 dresses 
        // to match the exact names and prices requested by the user.
        for (let i = 0; i < Math.min(newProducts.length, existingDresses.length); i++) {
            const dressToUpdate = existingDresses[i];
            const newData = newProducts[i];

            await db('dresses')
                .where('id', dressToUpdate.id)
                .update({
                    name: newData.name,
                    price: newData.price,
                    category: newData.category
                });

            console.log(`Updated ID ${dressToUpdate.id} to ${newData.name} - ₹${newData.price}`);
        }

        console.log('Successfully applied all new product names and prices.');
    } catch (error) {
        console.error('Update failed:', error);
    } finally {
        db.destroy();
    }
}

updateAllProducts();
