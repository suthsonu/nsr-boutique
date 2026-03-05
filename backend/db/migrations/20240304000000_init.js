exports.up = function (knex) {
    return knex.schema
        .createTable('admin_users', table => {
            table.increments('id').primary();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.timestamps(true, true);
        })
        .createTable('dresses', table => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('category').notNullable();
            table.text('description');
            table.decimal('price', 10, 2);
            table.string('image_url').notNullable();
            table.timestamps(true, true);
        })
        .createTable('gallery', table => {
            table.increments('id').primary();
            table.string('image_url').notNullable();
            table.timestamps(true, true);
        })
        .createTable('blogs', table => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('content').notNullable();
            table.string('featured_image').notNullable();
            table.string('meta_title');
            table.string('meta_description');
            table.timestamps(true, true);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('blogs')
        .dropTable('gallery')
        .dropTable('dresses')
        .dropTable('admin_users');
};
