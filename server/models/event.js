const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    }
});

const event = mongoose.model('Event', eventSchema);

module.exports = event;