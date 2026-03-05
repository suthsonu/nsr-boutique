exports.up = function (knex) {
    return knex.schema.createTable('reviews', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('rating').notNullable().defaultTo(5);
        table.text('text').notNullable();
        table.string('status').notNullable().defaultTo('pending'); // 'pending', 'approved'
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('reviews');
};
