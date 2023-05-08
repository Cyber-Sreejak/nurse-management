const mongoose = require("mongoose");

const authModel = mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
});

authModel.set("timestamps", true);

module.exports = mongoose.model("auth", authModel);