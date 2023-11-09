const express = require("express");
const app = express();
const { Restaurant, Item, Menu } = require("../models/index");
const { check, validationResult } = require("express-validator");

//TODO: Create your GET Request Route Below:

app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll({
    include: Menu,
    include: [{ model: Menu, include: [{ model: Item }] }],
  });
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const foundRestaurant = await Restaurant.findByPk(req.params.id);
  res.json(foundRestaurant);
});

app.post(
  "/restaurants",
  [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const newRestaurant = await Restaurant.create(req.body);
      res.json(newRestaurant);
    }
  }
);

app.put("/restaurants/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedRestaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const deletedRestaurant = await Restaurant.destroy({
    where: { id: req.params.id },
  });
  res.json(deletedRestaurant);
});
module.exports = app;
