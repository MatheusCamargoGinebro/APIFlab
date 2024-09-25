const express = require("express");

const router = express.Router();

const accountControllers = require("../controllers/AccountControllers");

module.exports = router;

router.get("/", (__req, res) => {
  res.send("Hello, World!");
});

router.post("/newuser", accountControllers.createUser);
