exports.up = knex => knex.schema.createTable("prate_descriptions", table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description");
    table.decimal('price', 8, 2).notNullable();
    table.text("food_icon");
    table.integer("quantity");
    table.enum("category", ["meal", "dessert", "drink"])
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("prate_descriptions")
