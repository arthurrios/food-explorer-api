exports.up = async(knex) => {
  await knex.schema.createTable("orders", table => {
    table.increments("id")
    table.integer("user_id").references("id").inTable("users")
    table.text("status")
    table.decimal("order_total")

    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("orders")
};
