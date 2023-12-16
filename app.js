const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');
const app = express();
const PORT = 3000;

//MongoDB connection
mongoose.connect(
  'mongodb+srv://admin:1234@cluster0.y9dyfbf.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

// controllers
const indexController = require('./controllers/indexController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const storeUserController = require('./controllers/storeUserController');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.set('view engine', 'ejs');

app.get('/', indexController);
app.get('/login', loginController);
app.get('/register', registerController);
app.post('/user/register', storeUserController);

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
