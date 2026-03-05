const bcrypt = require('bcryptjs');
const db = require('./src/models/db');

async function initAdmin() {
    try {
        const email = 'admin@nsrboutique.com';
        const password = 'Sushmansr@26';
        const hash = await bcrypt.hash(password, 10);

        const existing = await db('admin_users').where({ email }).first();
        if (!existing) {
            await db('admin_users').insert({ email, password: hash });
            console.log('Admin user created: admin@nsrboutique.com / admin');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        process.exit();
    }
}

initAdmin();
