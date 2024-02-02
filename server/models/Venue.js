const { Schema, model } = require('mongoose');

const venueSchema = new Schema({
    venueName: {
        type: String,
        required: 'You need to enter a name!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    queues: [
        {
            customerName: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            customerMobile: {
                type: String,
                required: true,
            },
            partySize: {
                type: Number,
                required: true,
                default: 1,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
              },
        },
    ],
});

const Venue = model('Venue', venueSchema);

module.exports = Venue;