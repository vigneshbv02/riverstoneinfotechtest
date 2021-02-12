const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    createddate: {
        type: Date,
        default: Date.now
    },
    isactive: {
        type: 'boolean',
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);