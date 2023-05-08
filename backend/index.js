const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authController = require("./controller/auth.controller");

app.use("/auth", authController);

app.use((req, res, next) => {
    res.status(404).json({
      message: "Route not found",
    });
  });

mongoose.connect(process.env.MONGO_CONNECT_URI, null, () => {
    app.listen(8000, () => console.log(`Server is listening at 8000`));
});
