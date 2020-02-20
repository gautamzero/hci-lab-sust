const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    organization: String,
    organiser: String,
    deadline: String,
    description: String,
    noticeFile: String
    // author: {type: Schema.Types.ObjectId, ref: 'Author'}
}, {
    timestamps: true
});

module.exports = mongoose.model('note', noteSchema);
