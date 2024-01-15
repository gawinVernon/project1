require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
const cors = require('cors');
const axios = require('axios');

//MongoDB connection
mongoose.connect(mongoString, { useNewUrlParser: true });
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
const productsController = require('./controllers/productsController');
const aboutController = require('./controllers/aboutController');
const createController = require('./controllers/createController');
<<<<<<< HEAD
=======
const storeProductController = require('./controllers/storeProductController');
>>>>>>> b721722 (15/1)

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
app.use(cors());

// API
app.use('/api/v1', protectedRoutes, routes);

// routes
app.get('/', redirectIfAuth, indexController);
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);
app.get('/home', protectedRoutes, homeController);
app.get('/products', protectedRoutes, productsController);
app.get('/about', aboutController);
<<<<<<< HEAD
app.get('/create', createController);
=======
app.get('/create', protectedRoutes, createController);
app.post('/product/create', protectedRoutes, storeProductController);
>>>>>>> b721722 (15/1)

//test route
app.get('/test', (req, res) => {
  res.render('pages/test', {
    title: 'test'
  });
});

//error404
app.use((req, res) => {
  res.render('pages/error', {
    title: 'ERROR'
  });
});

// server
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}...`);
});
