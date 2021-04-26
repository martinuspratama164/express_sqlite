// import dependencies package into server.js
const express = require("express");
const cors = require("cors");
const app = express();

// import controller
const user = require("./controller/userController");

// setup middleware into server.js
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// setup controller into server.js
app.use("/api/user", user);

// setup port listener server.js
app.listen(8000, () => {
    console.log("server berjalan di port 8000")
});