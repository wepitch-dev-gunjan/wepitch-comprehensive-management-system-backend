const { Schema, model } = require("mongoose");

const designationSchema = new Schema({
  profile: {
    type: String,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
});

module.exports = model("Designation", designationSchema);
