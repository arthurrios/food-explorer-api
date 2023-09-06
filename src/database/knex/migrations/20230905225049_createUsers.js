exports.up = async (knex) => {
  const exists = await knex.schema.hasTable("users")

  if (!exists) {
    await knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.text("name");
      table.text("email");
      table.text("password");
      table.boolean("isAdmin").default(false);

      table.timestamp("created_at").default(knex.fn.now());
    }).then(() => {
      return knex("users").insert({
        "name": "admin",
        "email": "admin@example.com",
        "password": "123",
        "isAdmin": true
      })
    })
  }
}


exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users")
};
