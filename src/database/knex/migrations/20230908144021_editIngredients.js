exports.up = async (knex) => {
  await knex.schema.alterTable("ingredients", table => {
    table.integer("dish_id").alter()
  })
};

exports.down = async (knex) => {
  await knex.schema.alterTable("ingredients", table => {
    table.int("dish_id").alter()
  })
}