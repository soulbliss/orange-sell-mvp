const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({

    item: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
    },


    // tag is our rate for the item
    tag: {
        type: String,
        required: true
    },

    version: {
        type: Number,
        default: 1
    },

    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    updatedDate: {
        type: Date,
        default: Date.now,
        required: true
    },


});




module.exports = mongoose.model('Item', ItemSchema);


