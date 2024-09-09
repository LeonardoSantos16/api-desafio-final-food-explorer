exports.up = knex => knex.schema.createTable("food_ingredient", table => {
    table.increments("id");
    table.text("name");
    table.integer("user_id").references("user_id").inTable("prate_descriptions");
    table.integer("prate_id").references("id").inTable("prate_descriptions")
}) 

exports.down = knex => knex.schema.droptable("food_ingredient");
