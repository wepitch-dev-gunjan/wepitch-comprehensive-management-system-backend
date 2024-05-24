const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    head: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = model("Department", departmentSchema);
