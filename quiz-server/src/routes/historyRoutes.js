const express = require('express');
const mongoose = require('mongoose');

const requireAuth = require('../middlewares/requireAuth');

const History = mongoose.model('History');

const router = express.Router();

router.use(requireAuth);

//get history for a certain user
router.get('/history', async (req, res) => {
    const history = await History.find({ userId: req.user._id });

    res.send(history);
});

//delete all history
router.post('/deleteHistory', async (req, res) => {
    await History.deleteMany({ userId: req.user._id }, (err) => {
        if (err) {
            res.status(401).send(err);
        }
    });
    res.send("deleted");
});

//save history
router.post('/saveHistory', async (req, res) => {
    const { quizTitle, score, remarks } = req.body;
    const date = new Date().toLocaleDateString();
    const history = new History({ userId: req.user._id, quizTitle, score, remarks, date });
    await history.save();
    res.send(history);
});

module.exports = router;