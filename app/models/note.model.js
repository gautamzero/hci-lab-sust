const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    content: String
    // author: {type: Schema.Types.ObjectId, ref: 'Author'}
}, {
    timestamps: true
});

module.exports = mongoose.model('note', noteSchema);