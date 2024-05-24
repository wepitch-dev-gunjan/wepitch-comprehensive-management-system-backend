const { Schema, model } = require("mongoose");

const designationSchema = new Schema({
  profile: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  contact: {
    type: String,
    default: "",
  },
  salary: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Designation", designationSchema);
