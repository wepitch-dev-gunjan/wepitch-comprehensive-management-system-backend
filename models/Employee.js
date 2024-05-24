const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  email: {
    type: String,
  },
  designation: {
    type: Schema.Types.ObjectId,
    ref: "Designation",
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  position: {
    type: String,
  },
});

module.exports = model("Employee", employeeSchema);
