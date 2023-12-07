const {Schema, model} = require("mongoose")

const voucherSchema = new Schema({
    expense: {
        type: Number,
        required: true,
    },
    description: {
        type: String
    },
    state: {
        type: String,
        enum: ['PENDING', 'DONE', 'CANCELLED', 'MODIFIED']
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

modeule.exports = model('Voucher', voucherSchema)