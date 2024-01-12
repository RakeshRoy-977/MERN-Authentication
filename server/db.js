const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`connect to mongoDB`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = ConnectToDB;
