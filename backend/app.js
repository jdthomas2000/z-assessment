const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const knex = require("./config/db");
const { authRouter, authToken } = require("./routes/auth.js");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) =>
  res.send("API reached! Please visit the /movies endpoint for data."),
);

app.get("/users", function (req, res) {
  knex("users")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      }),
    );
});

app.get("/users/:user", function (req, res) {
  knex("users")
    .select("*")
    .where("username", "=", req.params.user)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      }),
    );
});

app.patch("/users/:user", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    await knex("users")
      .where("username", "=", req.params.user)
      .update(updateData);

    return res.status(201).json({ user: req.params.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.delete("/users/:user", async (req, res) => {
  try {
    await knex("users").where("username", "=", req.params.user).del();
    return res.status(201).json({ User_deleted: req.params.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/inventory/", function (req, res) {
  knex("inventory")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      }),
    );
});

app.use(authToken);

app.delete("/inventory/item/:id", async (req, res) => {
  try {
    await knex("inventory").where("id", "=", req.params.id).del();
    return res.status(200).json({ Item_Deleted: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/inventory/item/:id", async (req, res) => {
  const { id, ...updatedData } = req.body;
  try {
    await knex("inventory").where("id", "=", req.params.id).update(updatedData);

    return res.status(200).json({ message: "item updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.get("/inventory/:id", function (req, res) {
  knex("inventory")
    .select("*")
    .where("userID", "=", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: "Server Error",
      }),
    );
});

app.post("/inventory/:id", async function (req, res) {
  const { itemName, description, quantity } = req.body;
  try {
    await knex("inventory").insert({
      itemName: itemName,
      description: description,
      quantity: quantity,
      userID: req.params.id,
    });

    return res.status(201).json({ message: "item added" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
