/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");

exports.seed = async function (knex) {
  await knex("inventory").del();
  await knex("inventory").insert([
    {
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
  ]);
};
