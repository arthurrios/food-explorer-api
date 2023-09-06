const { hash } = require("bcryptjs")

exports.up = async (knex) => {
  const exists = await knex.schema.hasTable("users")
  const hashedPassword = await hash("admin123", 8)

  if (!exists) {
    await knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.text("name");
      table.text("email");
      table.text("password");
      table.boolean("isAdmin").defaultTo(false);

      table.timestamp("created_at").defaultTo(knex.fn.now());
    }).then(() => {
      return knex("users").insert({
        "name": "admin",
        "email": "admin@example.com",
        "password": hashedPassword,
        "isAdmin": true
      })
    })
  }
}


exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users")
};
