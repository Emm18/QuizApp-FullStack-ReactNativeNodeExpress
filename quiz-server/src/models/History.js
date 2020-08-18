const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quizTitle: {
        type: String
    },
    score: {
        type: Number
    },
    remarks: {
        type: String
    },
    date: {
        type: String
    }
});

mongoose.model('History', historySchema);