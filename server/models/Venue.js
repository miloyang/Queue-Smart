const { Schema, model } = require('mongoose');

const venueSchema = new Schema({
    venueName: {
        type: String,
        required: 'You need to enter a name!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
})

const Venue = model('Venue', venueSchema);

module.exports = Venue;