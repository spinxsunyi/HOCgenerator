const mongoose = require('mongoose');

module.exports = mongoose.model('counters', new mongoose.Schema({
    seq: Number
}));
