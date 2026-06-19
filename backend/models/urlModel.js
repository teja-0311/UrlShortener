const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        originalurl: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        shorturl: {
            type: String,
            required: true,
            unique: true
        },

        lastVisited: {
            type: Date,
            default: null
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        clicks: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Url', urlSchema);