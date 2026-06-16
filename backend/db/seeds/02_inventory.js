/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("inventory").del();
  await knex("inventory").insert([
    {
      id: 1,
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      id: 2,
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      id: 3,
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      id: 4,
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      id: 5,
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      id: 6,
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
    {
      id: 7,
      userID: 1,
      itemName: faker.book.title(),
      description: faker.lorem.paragraph(),
      quantity: faker.number.int({ min: 1, max: 100 }),
    },
  ]);
};
