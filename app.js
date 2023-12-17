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
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

global.loggedIn = null;

// controllers
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');
const loginUserController = require('./controllers/loginUserController');
const logoutController = require('./controllers/logoutController');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(
  session({
    secret: 'node secret'
  })
);
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.set('view engine', 'ejs');

app.get('/', indexController);
app.get('/login', loginController);
app.get('/register', registerController);
app.post('/user/register', storeUserController);
app.post('/user/login', loginUserController);
app.get('/logout', logoutController);

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
