const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  category: { type: String },
  title: { type: String },
  desc: { type: String },
  content: { type: String },
});

module.exports = mongoose.model("artical", schema);
