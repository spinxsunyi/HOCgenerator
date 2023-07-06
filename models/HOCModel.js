const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    creator:{
        required: true,
        type: String
    },
    finding:{
        required: true,
        type: String
    },
    action:{
        required: true,
        type: String
    },
    HOCType:{
        required: true,
        type: String,
        enum: { values: ['Safe Card', 'Unsafe Condition', 'Unsafe Act', 'SQ'], message: '{VALUE} is not supported. Only accept Safe Card, Unsafe Condition, Unsafe Act.'}
    },
    CSLR:{
        required: true,
        type: String
    },
    DetailActivity:{
        required: true,
        type: String
    },
    jobType:{
        required: true,
        type: [String]
    },
    lastUpdated:{
        type: Date,
        default: Date.now
    },
    createdDate:{
        type: Date
    }

});

module.exports = mongoose.model('HOCs',dataSchema)