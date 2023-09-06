exports.up = async (knex) => {
  await knex.schema.createTable("ingredients", table => {
    table.increments("id")
    table.text("name").notNullable()
    table.int("dish_id").references("id").inTable("dishes").onDelete("CASCADE")
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("ingredients")
};
