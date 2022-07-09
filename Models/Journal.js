const mongoose = require('mongoose');

const Journal = new mongoose.Schema({
    title: String,
    content: { type: String, required: true }
}, { timestamps: true });

const journalModel = mongoose.model('Bryan-Journal-Challenge', Journal);

module.exports = journalModel;