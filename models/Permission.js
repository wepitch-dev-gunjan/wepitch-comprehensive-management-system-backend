const { Schema, model } = require("mongoose");

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true, // Ensure the name is required
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = model("Permission", permissionSchema);
