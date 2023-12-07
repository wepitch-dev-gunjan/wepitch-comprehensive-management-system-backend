const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true
}, {
  strict: false
});

module.exports = model("Department", departmentSchema);
