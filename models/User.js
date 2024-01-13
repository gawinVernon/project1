const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'please provide email!'],
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: () => 'this email address has already been used.'
    }
  },
  password: {
    type: String,
    required: [true, 'please provide password!']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'incorrect password!']
  }
});

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => {
      console.error(error);
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
