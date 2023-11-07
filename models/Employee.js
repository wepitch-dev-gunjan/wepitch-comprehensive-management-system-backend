const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
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
  designation: {
    type: String,
  },
  role: {
    type: String,
  },
  position: {
    type: String,
  },
});

module.exports = model("Employee", employeeSchema);
