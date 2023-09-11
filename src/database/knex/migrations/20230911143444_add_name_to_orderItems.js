exports.up = async (knex) => {
  await knex.schema.table("orderItems", table => {
    table.text("name")
  })
};

exports.down = async (knex) => {
  await knex.schema.table("orderItems", table => {
    table.dropColumn("name")
  })
};
