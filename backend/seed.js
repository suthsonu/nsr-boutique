const fs = require('fs');
const path = require('path');
const db = require('./src/models/db');

async function seed() {
    try {
        const sourceDir = path.join(__dirname, '../frontend/public/images');
        const targetDir = path.join(__dirname, 'public/uploads');

        // Ensure target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // 1. Copy Images
        const files = fs.readdirSync(sourceDir);
        for (const file of files) {
            if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
            }
        }
        console.log('Images copied successfully to public/uploads.');

        // 2. Prepare Data
        // Find store images for gallery
        const galleryImages = files.filter(f => f.startsWith('store')).map(f => ({ image_url: `/uploads/${f}` }));

        // Find media images for dresses
        const mediaImages = files.filter(f => f.startsWith('media_'));

        const dresses = mediaImages.slice(0, 4).map((f, i) => ({
            name: ['Elegant Silk Saree', 'Designer Lehenga Choli', 'Premium Anarkali Suit', 'Bridal Gown Collection'][i] || 'Designer Dress',
            category: ['Saree', 'Lehenga', 'Suit', 'Gown'][i] || 'Ethnic Wear',
            description: 'A beautiful piece from our latest exclusive collection, crafted meticulously to perfection. Experience premium quality at NSR Boutique.',
            price: [4500, 12500, 6500, 25000][i] || 5500,
            image_url: `/uploads/${f}`
        }));

        // Add remaining as more collection items
        for (let i = 4; i < mediaImages.length; i++) {
            dresses.push({
                name: 'Exclusive Boutique Collection ' + (i - 3),
                category: 'Premium Wear',
                description: 'An elegant addition to your wardrobe, tailored beautifully.',
                price: 3000 + (i * 500),
                image_url: `/uploads/${mediaImages[i]}`
            });
        }

        const blogs = [
            {
                title: 'Top 5 Saree Trends for Upcoming Season',
                content: 'Sarees are timeless. But here are the 5 trends that are making waves this year!\n\n1. **Pastel Hues:** Moving away from traditional bold colors, pastels are the new favorite for modern brides.\n2. **Organza Silk:** Lightweight and elegant, organza is perfect for evening parties.\n3. **Floral Motifs:** Nature-inspired designs never go out of style.\n4. **Pre-draped Sarees:** For the modern woman on the go, pre-draped sarees offer convenience without compromising on style.\n5. **Minimalist Borders:** Simple is elegant in 2024.',
                featured_image: dresses.length > 0 ? dresses[0].image_url : '/uploads/placeholder.png',
                meta_title: 'Saree Trends - NSR Boutique',
                meta_description: 'Discover the top 5 saree trends for 2024 with NSR Fashion Boutique.'
            },
            {
                title: 'How to Choose the Perfect Lehenga for Your Body Type',
                content: 'Choosing a lehenga can be daunting. Here is a quick guide:\n\n- **Understand your body type:** A-line lehengas suit most body types. If you have an hourglass figure, mermaid style is great.\n- **Focus on the blouse:** The blouse can make or break the outfit. Experiment with necklines and sleeves.\n- **Dupatta draping:** How you drape the dupatta changes the entire look.\n\nVisit NSR Fashion Boutique in Gachibowli to get expert advice!',
                featured_image: dresses.length > 1 ? dresses[1].image_url : '/uploads/placeholder.png',
                meta_title: 'Choose Perfect Lehenga',
                meta_description: 'Guide on how to choose the perfect lehenga for your body type.'
            }
        ];

        // 3. Insert Data
        // Clear existing data (optional, but good for clean seed)
        await db('dresses').del();
        await db('gallery').del();
        await db('blogs').del();

        if (dresses.length > 0) await db('dresses').insert(dresses);
        if (galleryImages.length > 0) await db('gallery').insert(galleryImages);
        if (blogs.length > 0) await db('blogs').insert(blogs);

        console.log('Database seeded successfully with Dresses, Gallery, and Blogs.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        // Destroy database connection
        db.destroy();
    }
}

seed();
