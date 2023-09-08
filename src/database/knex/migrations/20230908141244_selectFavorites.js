exports.up = async (knex) => {
  await knex.schema.createTable("favorites", table => {
    table.increments("id")
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE")
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  })
};


exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("favorites")
};
