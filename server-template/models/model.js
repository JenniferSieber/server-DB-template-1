const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  //object definitions here
});

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;