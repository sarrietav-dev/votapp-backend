const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const loginRoute = require('./routes/login.routes');
const userRoute = require('./routes/user.routes');
const electionRoute = require('./routes/election.routes');
const db = require('./database/index');

const { log } = console;

dotenv.config();

const app = express();

app.use(cors());

// Configure express to recieve JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many requests, please try again after 15 minutes',
});

app.use(limiter);

// Route middleware.
app.use('/api/login', loginRoute);
// TODO: Check if the user is authenticated for the routes below.
app.use('/api/users', userRoute);
app.use('/api/elections', electionRoute);

app.get('/', (req, res) => res.send('⭐'));

if (process.env.NODE_ENV !== 'test') db.connect();
app.listen(process.env.PORT || 5000, () =>
  log(chalk.blue('\nServer running!'))
);

module.exports = app;
