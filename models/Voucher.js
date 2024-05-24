const { Schema, model } = require("mongoose");

const voucherSchema = new Schema(
  {
    expense: {
      type: Number,
      required: true,
      min: 0, // Ensure expense is a non-negative number
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "RESOLVED", "CANCELLED"],
      default: "PENDING",
    },
    resolved_at: {
      type: Date,
    },
    cancelled_at: {
      type: Date,
    },
    screen_shots: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "Employee", // Assuming you have a User model
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department", // Assuming you have a Department model
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Voucher", voucherSchema);
