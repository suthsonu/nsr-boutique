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
    console.log('Admin user created');
} else {
    await db('admin_users')
        .where({ email })
        .update({ password: hash });

    console.log('Admin password updated successfully');
}
    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        process.exit();
    }
}

initAdmin();
