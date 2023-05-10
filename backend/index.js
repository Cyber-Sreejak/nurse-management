const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const authController = require("./controller/auth.controller");

const nurseController = require("./controller/nurse.controller");
const nurseDeleteController = require("./controller/nurse.controller");
const nurseUpdateController = require("./controller/nurse.controller");
const nurseGetAllController = require("./controller/nurse.controller");

app.use("/auth", authController);

app.use("/nurse", nurseController);
app.use("/nurse/get", nurseGetAllController);
app.use("/delete/:id", nurseDeleteController);
app.use("/update/:id", nurseUpdateController);

app.use((req, res, next) => {
    res.status(404).json({
      message: "Route not found",
    });
  });

mongoose.connect(process.env.MONGO_CONNECT_URI, null, () => {
    app.listen(8000, () => console.log(`Server is listening at 8000`));
});
