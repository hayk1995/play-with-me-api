const Mongoose = require("mongoose");
const config = require('config');
const changeRecorder = require('./plugins/change-recorder');
const passwordHasher = require("./plugins/password-hasher");

const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false
  }
});

// never include sensitive information in JSON output
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    const {
      _id,
      password,
      ...trans
    } = ret;

    return { id: doc.get('_id'), ...trans };
  },
});


// enable tracking for create/update dates
userSchema.plugin(changeRecorder);
// hash password before storing
userSchema.plugin(passwordHasher);

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

let UserModel = Mongoose.model('user', userSchema);

module.exports = {
  userSchema: userSchema,
  UserModel: UserModel,
};
