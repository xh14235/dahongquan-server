const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  imgUrl: { type: String },
  title: { type: String },
  desc: { type: String },
  path: { type: String },
});

module.exports = mongoose.model("banner", schema);
