const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    artist: {
        type: String
    },

    song: {
        type: String
    },

    path: {
        type: String
    },

    price: {
        type: Number
    },

    album: {
        type: String
    },

    single: {
        type: Boolean,
        default: true
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;