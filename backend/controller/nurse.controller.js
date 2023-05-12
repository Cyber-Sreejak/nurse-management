const express = require("express");
const {
  nursePostService,
  nurseDeleteService,
  nurseUpdateService,
  nurseGetAllService,
  nurseGetService
} = require("../services/nurse.service");

const router = express.Router();

router.post("/create", nursePostService);
router.delete("/delete/:id", nurseDeleteService);
router.get("/get", nurseGetAllService);
router.put("/update/:id", nurseUpdateService);
router.get("/getbyid/:id", nurseGetService);

module.exports = router;