require('./models/User');
require('./models/Quiz');
require('./models/History');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const historyRoutes = require('./routes/historyRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(authRoutes);
app.use(quizRoutes);
app.use(historyRoutes);


const mongoUri = 'MONGO DB CONNECTION LINK HERE';

mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
});

mongoose.connection.on('error', () => {
    console.error('error', error);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('port 3000');
});