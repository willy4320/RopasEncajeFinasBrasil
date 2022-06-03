const express = require('express');
const path    = require('path');
const logger  = require('morgan');

const app = express();
const port = process.env.PORT || 5000

// Settings
app.set('port', port);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

module.exports = app;