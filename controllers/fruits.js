// controllers/fruits.js
const express = require("express");
const router = express.Router();

const Fruit = require("../models/fruit.js");

router.get("/new", (req, res) => {
  res.render("fruits/new.ejs");
});


//using try catch block for error handling
router.post("/", async (req, res) => {
    try {
      await Fruit.create(req.body);
      req.session.message = "Fruit successfully created.";
      res.redirect("/fruits");
    } catch (err) {
      req.session.message = err.message;
      res.redirect("/fruits");
    }
  });

router.get("/", async (req, res) => {
  const foundFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: foundFruits });
});

module.exports = router;