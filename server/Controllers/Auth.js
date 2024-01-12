const { validationResult } = require("express-validator");
const UserModel = require("../Models/User_M");

const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let checkUser = await UserModel.findOne(email);
    if (checkUser) {
      return res.status(400).json({ err: "User Already Exists, Please Login" });
    }

    UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err.message));
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createUser };
