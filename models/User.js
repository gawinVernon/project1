const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
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
    required: [true, 'please provide password!'],
    minLength: [4, 'password is too short (4 minimum)']
  },
  passwordConfirm: {
    type: String,
    minLength: [4, 'password is too short (4 minimum)'],
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on CREATE and  SAVE!!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password and password confirmation do not match.'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  // const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, 10);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
