const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdEvents: [
        {
            type: Schema.ObjectId,
            required: true,
            ref: 'Event'
        }
    ]
});

const user = mongoose.model('User', UserSchema);

module.exports = user;