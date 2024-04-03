const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: { type: String },
  bgUrl: { type: String },
  logoUrl: { type: String },
  homeVideo: { type: String },
});

module.exports = mongoose.model("setting", schema);
