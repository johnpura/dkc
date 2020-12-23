// node modules
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const exphbs  = require('express-handlebars');
const flash = require('connect-flash');

// connect to Atlas cluster
const {mongoose} = require('./database/mongoose');

// mount routes
const indexRouter = require('./routes/index');
const memberRouter = require('./routes/api/member');
const profileRouter = require('./routes/api/profile');
const itemRouter = require('./routes/api/item');
const collectionRouter = require('./routes/api/collection');

// express instance
const app = express();

// setup flash messages
app.use(cookieParser('baseball'));
app.use(session({
    secret:"baseball", 
    resave: "true", 
    saveUninitialized: "true", 
    cookie: { maxAge: 60000 }
}));
app.use(flash());

// view engine setup
// __dirname + '/views/layouts/'
// __dirname + '/views/partials/'
const hbsConfig = {
    extname: 'hbs', 
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
};
app.set('view engine', 'hbs');
app.engine('hbs', exphbs(hbsConfig));

// parses incoming requests with json and urlencoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logs all HTTP requests to the console
app.use(logger('dev'));

// loads static files
app.use(express.static(path.join(__dirname, 'public')));

// register route handlers
app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/profile', profileRouter);
app.use('/item', itemRouter);
app.use('/collection', collectionRouter);

module.exports = app;