const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    landmark: {
      type: String,
    },
  },
  phone: {
    type: Number,
  },
});

module.exports = model("Admin", adminSchema);
