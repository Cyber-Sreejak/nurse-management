const express = require("express");
const { signUpService, loginService } = require("../services/auth.service");

const router = express.Router();

router.post("/signup", signUpService);

router.post("/login", loginService);

module.exports = router;