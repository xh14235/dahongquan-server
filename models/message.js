const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  unit: { type: String },
  tel: { type: String },
  time: { type: Date },
  content: { type: String },
});

module.exports = mongoose.model("message", schema);
