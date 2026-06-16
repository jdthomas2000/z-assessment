/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("id");
    table
      .integer("userID")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("itemName");
    table.string("description");
    table.integer("quantity");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("inventory");
};
