// migrations/create_example_table.js
exports.up = function (knex) {
    return knex.schema.createTable('example', function (table) {
        table.increments('id').primary();
        table.string('name');
        // Add other fields as needed
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('example');
};