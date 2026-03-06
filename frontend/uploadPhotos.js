import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadImages() {
    const images = ['store1.png', 'store2.png', 'store3.png'];

    // Need to get an admin token first
    const loginRes = await fetch('https://nsr-boutique.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@nsrboutique.com', password: 'admin' })
    });
    const { token } = await loginRes.json();

    for (const img of images) {
        const filePath = path.join(__dirname, 'public', 'images', img);
        if (!fs.existsSync(filePath)) {
            console.log(`Skipping ${img}, not found`);
            continue;
        }

        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath));

        const uploadRes = await fetch('https://nsr-boutique.onrender.com/api/gallery', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...formData.getHeaders()
            },
            body: formData
        });

        if (uploadRes.ok) {
            console.log(`Successfully uploaded ${img}`);
        } else {
            const errText = await uploadRes.text();
            console.error(`Failed to upload ${img}: ${uploadRes.status} - ${errText}`);
        }
    }
}

uploadImages();
