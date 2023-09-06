exports.up = async (knex) => {
  await knex.schema.createTable("dishes", table => {
    table.increments("id")
    table.text("name")
    table.text("image")
    table.decimal("price")
    table.text("category")
    table.text("description")

    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())

  })
  
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("dishes")
};
