const { validationResult } = require("express-validator");
const UserModel = require("../Models/User_M");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//SingUp
const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    //express validator code checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // checking if user already exists
    let checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ error: "User Already Exists, Please Login" });
    }

    //hasing password
    const Salt = await bcrypt.genSalt(8);
    const hashPass = await bcrypt.hash(req.body.password, Salt);

    //storing user data at db
    UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    })
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error.message));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Login User
const Login = async (req, res) => {
  try {
    //express validator checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const CheckingUser = await UserModel.findOne({ email });

    if (!CheckingUser) {
      return res.status(400).json({ error: "User donst Exists" });
    }
    const passwordCompare = await bcrypt.compare(
      password,
      CheckingUser.password
    );

    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const data = {
      user: { id: UserModel.id },
    };
    const jwtkey = process.env.JWT_KEY;
    const authToken = jwt.sign(data, jwtkey);

    res.status(200).json({ authToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { createUser, Login };
