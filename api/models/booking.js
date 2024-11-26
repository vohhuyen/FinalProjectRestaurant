const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    user: {type: String},
    table: {type: String},
    name: {type: String},
    phone: {type: String},
    dish: [
        {
            dishId: {type: String},
            quantity: {type: Number},
            name: {type: String},
            price:{type: Number},
        }
    ],
    totalmoney: {type: Number},
    status: {type: String, enum: ['waiting', 'confirmed', 'canceled', 'done'], default: 'waiting'},
    startTime: {type: Date},
    endTime: {type: Date}
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Booking", BookingSchema);
