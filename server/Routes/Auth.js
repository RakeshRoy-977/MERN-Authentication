const express = require("express");
const { createUser } = require("../Controllers/Auth");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/singup",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  createUser
);

module.exports = router;
