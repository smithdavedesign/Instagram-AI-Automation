const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const dotenv = require('dotenv');
const path = require('path');
const instagramControllers = require('./controllers/instagramController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    // Session setup
    app.use(
      session({
        secret: "dave-is-cool",
        resave: true,
        saveUninitialized: true,
      })
    );

    // Middleware setup
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // Routes setup
    app.use('/', instagramControllers);
    // app.use('/cronjobs', cronJobs);

    // Start the server
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Server initialization failed:", error.message);
    console.error(error.stack);
  }
};

init();

module.exports = { app };