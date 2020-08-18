const express = require('express');
const mongoose = require('mongoose');

const requireAuth = require('../middlewares/requireAuth');
const { response } = require('express');

const Quiz = mongoose.model('Quiz');

const router = express.Router();

router.use(requireAuth);

//get all quiz - need try catch
router.get('/quizes', async (req, res) => {
    const quizes = await Quiz.find({});
    res.send(quizes);
});

//get all quiz base on quiz type
router.get('/quizByType', async (req, res) => {
    const { quizType } = req.query;

    const quiz = await Quiz.find({ quizType })

    res.send(quiz);
});

//get quiz details
router.get('/quiz', async (req, res) => {
    const { id } = req.query;

    const quiz = await Quiz.findById({ _id: id });

    res.send(quiz)
});

//save quiz
router.post('/saveQuiz', async (req, res) => {
    const { quizTitle, quizType, passingScore, questions } = req.body;
    const quiz = new Quiz({ userId: req.user._id, quizTitle, quizType, passingScore, questions });
    await quiz.save();
    res.send(quiz);
});

//update quiz
router.post('/updateQuiz', async (req, res) => {
    const { _id, quizTitle, quizType, passingScore, questions } = req.body;

    await Quiz.findByIdAndUpdate({ _id }, { quizTitle, quizType, passingScore, questions }, (err, result) => {
        if (err) {
            return res.status(401).send(err);
        };

        res.send(result)
    });
});

//delte quiz
router.post('/deleteQuiz', async (req, res) => {
    const { id } = req.body
    await Quiz.findByIdAndRemove({ _id: id }, (err, result) => {
        if (err) {
            return res.status(401).send(err);
        };

        res.send(result);
    });
});

module.exports = router;