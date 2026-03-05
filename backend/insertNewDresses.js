const db = require('./src/models/db');

async function insertNewProducts() {
    try {
        const newProducts = [
            {
                name: 'Handloom Kurta Set',
                price: 0,
                category: 'Kurta Set',
                description: 'Authentic handloom fabric kurta set. Placeholder item - price and image to be updated later.',
                image_url: '/uploads/store1.png' // Using an existing image as a placeholder
            },
            {
                name: 'Cotton Kurta Set',
                price: 0,
                category: 'Kurta Set',
                description: 'Lightweight cotton kurta set. Placeholder item - price and image to be updated later.',
                image_url: '/uploads/store1.png' // Using an existing image as a placeholder
            }
        ];

        for (const product of newProducts) {
            await db('dresses').insert(product);
            console.log(`Inserted placeholder for ${product.name}`);
        }

        console.log('Successfully added new placeholder products.');
    } catch (error) {
        console.error('Insert failed:', error);
    } finally {
        db.destroy();
    }
}

insertNewProducts();
