const { Schema, model } = require("mongoose")

const voucherSchema = new Schema({
  expense: {
    type: Number,
    required: true,
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['PENDING', 'RESOLVED', 'CANCELLED'],
    default: 'PENDING'
  },
  resolved_at: {
    type: Date,
  },
  cancelled_at: {
    type: Date,
  },
  screen_shots: [{
    type: String,
    required: true,
  }]

}, {
  timestamps: true
},
  {
    strict: false
  }
)

module.exports = model('Voucher', voucherSchema)