const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: {
    type: String,
  },
  permissions: {
    type: String,
  },
}, {
  timestamps: true
}, {
  strict: false
});

module.exports = model("Role", roleSchema);
