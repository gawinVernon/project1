require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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
<<<<<<< HEAD
>>>>>>> b721722 (15/1)
=======
const updateController = require('./controllers/updateController');
const updateProductController = require('./controllers/updateProductController');
const deleteController = require('./controllers/deleteController');
>>>>>>> e37389b (18/1)

// middlewares
const { redirectIfAuth } = require('./middleware/redirectIfAuth');
const { protectedRoutes, checkUser } = require('./middleware/protectedRoutes');

//
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: 'node secret',
    cookie: { maxAge: 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false
  })
);
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(cors());
app.use(methodOverride('_method'));
// all routes
app.use('*', (req, res, next) => {
  const token = req.cookies.jwt;
  loggedIn = token;
  next();
});

// limiter
const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/product/create', limiter);

// routes
app.get('/', redirectIfAuth, indexController);
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);
<<<<<<< HEAD
app.get('/home', protectedRoutes, homeController);
app.get('/products', productsController);
app.get('/about', aboutController);
<<<<<<< HEAD
app.get('/create', createController);
=======
app.get('/create', protectedRoutes, createController);
app.post('/product/create', protectedRoutes, storeProductController);
<<<<<<< HEAD
>>>>>>> b721722 (15/1)
=======
app.get('/products/:id', protectedRoutes, updateController);
app.put('/products/:id', protectedRoutes, updateProductController);
app.delete('/products/:id', protectedRoutes, deleteController);
>>>>>>> e37389b (18/1)
=======
app.get('/home', protectedRoutes, checkUser, homeController);
app.get('/products', checkUser, productsController);
app.get('/about', checkUser, aboutController);
app.get('/create', protectedRoutes, checkUser, createController);
app.post('/product/create', protectedRoutes, checkUser, storeProductController);
app.get('/products/:id', protectedRoutes, checkUser, updateController);
app.put('/products/:id', protectedRoutes, checkUser, updateProductController);
app.delete('/products/:id', protectedRoutes, checkUser, deleteController);
>>>>>>> 944364c (21/1)

//error404
app.use(checkUser, (req, res) => {
  res.render('pages/error', {
    title: 'ERROR'
  });
});

// server
app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}...`);
});
