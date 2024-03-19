const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: { type: String },
  title: { type: String },
});

module.exports = mongoose.model("articalCategory", schema);
