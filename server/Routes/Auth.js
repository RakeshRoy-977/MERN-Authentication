const express = require("express");
const { createUser, Login } = require("../Controllers/Auth");
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

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  Login
);

module.exports = router;
