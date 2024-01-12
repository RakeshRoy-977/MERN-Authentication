require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectToDB = require("./db");
const Auth_router = require("./Routes/Auth");

const app = express();
const PORT = process.env.PORT;

//some apps
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", Auth_router);
//db connetcion
ConnectToDB();

//starting server
app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
