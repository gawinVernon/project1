const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const PORT = 3000;

//MongoDB connection
mongoose.connect(
  'mongodb+srv://admin:1234@cluster0.y9dyfbf.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
mongoose.connection.on('error', (error) => {
  console.log(error);
});
mongoose.connection.on('connected', () => console.log('database connected'));

global.loggedIn = null;

// controllers
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');

// middlewares
const redirectIfAuth = require('./middleware/redirectIfAuth');
const protectedRoutes = require('./middleware/protectedRoutes');

//
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(
  session({
    secret: 'node secret',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false
  })
);
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.set('view engine', 'ejs');

// routes
app.get('/', redirectIfAuth, indexController);
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);
app.get('/home', protectedRoutes, homeController);

//test route
app.get('/test', (req, res) => {
  res.render('pages/test');
});

// server
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}...`);
});
