const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  category: { type: String },
  title: { type: String },
  code: { type: String },
  time: { type: Date },
  imgUrl: { type: String },
  desc: { type: String },
  content: { type: String },
});

module.exports = mongoose.model("artical", schema);
