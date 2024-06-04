const express = require('express');
const morgan = require('morgan');

const dicRouter = require('./routes/dictionaryRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const historyRouter = require('./routes/historyRoutes')
const app = express();

// Middleares

console.log(process.env.NODE_ENV);


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json());
app.use((req, res, next) => {
    console.log('Hello from the Middleware! ');
    next();
});
app.use((req, res, next) => {
    req.requestTimme = new Date().toISOString();
    next();
});

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Fullstack Challenge 🏅 - Dictionary"
    });
});


app.use('/api/v1/entries', dicRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/history', historyRouter);
app.use('/api/v1/users', userRouter);

// Start Server
module.exports = app;