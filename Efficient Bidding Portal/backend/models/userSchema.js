const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please use a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    },
  role: {
    type: String,
    enum: ['vendor', 'client'], // User can be either a vendor or client
    required: [true, 'Please specify a role'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // Hash the password before saving the user
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Match user-entered password to the hashed password in the database
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', UserSchema);
