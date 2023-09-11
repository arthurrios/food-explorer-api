exports.up = async(knex) => {
  await knex.schema.createTable("orderItems", table => {
    table.increments("id")
    table.integer("order_id").references("id").inTable("orders")
    table.integer("dish_id").references("id").inTable("dishes")
    table.integer("quantity")
    table.decimal("subtotal")
  })
};

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists("orderItems")
};
