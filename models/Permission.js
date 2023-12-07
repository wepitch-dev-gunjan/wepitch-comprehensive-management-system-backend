const { Schema, model } = require("mongoose");

const permissionSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = model("Permission", permissionSchema);
