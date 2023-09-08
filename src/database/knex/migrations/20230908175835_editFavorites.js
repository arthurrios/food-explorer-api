exports.up = async (knex) => {
  await knex.schema.alterTable("favorites", table => {
    table.text("name")
  })
};


exports.down = async (knex) => {
  await knex.schema.alterTable("favorites")
};