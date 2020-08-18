const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer: String,
    value: Number,
});

const questionSchema = new mongoose.Schema({
    question: String,
    answers: [answerSchema]
});

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quizTitle: {
        type: String
    },
    quizType: {
        type: Number
    },
    passingScore: {
        type: Number
    },
    questions: [questionSchema]
});

mongoose.model('Quiz', quizSchema);