const { hash } = require("bcryptjs")

exports.up = async (knex) => {
  const exists = await knex.schema.hasTable("users")
  const hashedPassword = await hash("admin123", 8)

  if (!exists) {
    await knex.schema
    .createTable("users", table => {
      table.increments("id").notNullable();
      table.text("name").notNullable();
      table.text("email").notNullable();
      table.text("password").notNullable();
      
      table.enum("role", ["admin", "customer"], { useNative: true, enumName: "roles" })
        .notNullable().default("customer");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    }).then(() => {
      return knex("users").insert({
        "name": "Admin",
        "email": "admin@email.com",
        "password": hashedPassword,
        "role": "admin"
      })
    })
  }
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users")
};
