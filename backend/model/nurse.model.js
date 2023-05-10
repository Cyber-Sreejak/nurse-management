const mongoose = require("mongoose");

const nursePostModel = mongoose.Schema({
    fullName: String,
    email: String,
    contact: String,
    workingDays: String,
    dutyStartTime: String,
    dutyEndTime: String,
});

nursePostModel.set("timestamps", true);

module.exports = mongoose.model("nurse", nursePostModel);