const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  parent: { type: String },
  title: { type: String },
  path: { type: String },
  components: { type: String },
  icon: { type: String },
  needLogin: { type: Boolean },
  isKeep: { type: Boolean },
  showInNav: { type: Boolean },
});

module.exports = mongoose.model("menu", schema);
