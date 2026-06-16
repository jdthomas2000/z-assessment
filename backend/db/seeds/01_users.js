/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 *
 */

const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  const hashPass = await bcrypt.hash("test123", 10);

  await knex("users").del();
  await knex("users").insert([
    {
      first: "Jacob",
      last: "Thomas",
      username: "inventory_manager",
      password: hashPass,
    },
  ]);
};
