const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission'
    },
  ],
}, {
  timestamps: true
}, {
  strict: false
});

module.exports = model("Role", roleSchema);
