const { Schema, model } = require("mongoose");

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true, // Adding required validation for state
    },
    city: {
      type: String,
      required: true, // Adding required validation for city
    },
    landmark: {
      type: String,
    },
  },
  phone: {
    type: Number,
    required: true, // Adding required validation for phone number
  },
  email: {
    type: String,
    required: true, // Adding required validation for email
    unique: true, // Ensuring email is unique
  },
  website: {
    type: String,
  },
});

module.exports = model("Organization", organizationSchema);
