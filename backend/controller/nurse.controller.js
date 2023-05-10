const express = require("express");
const {
  nursePostService,
  nurseDeleteService,
  nurseUpdateService,
  nurseGetAllService,
} = require("../services/nurse.service");

const router = express.Router();

router.post("/create", nursePostService);
router.delete("/delete/:id", nurseDeleteService);
router.get("/get", nurseGetAllService);
router.post("/update/:id", nurseUpdateService);

module.exports = router;