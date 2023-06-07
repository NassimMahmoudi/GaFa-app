const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique : false,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      default: "User",},
    is_blocked: {
      type: Boolean,
      default: false,},
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    phone: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    bank: {
      type: { 
        bankName:String,
        IBAN:String,
        BIC: String,
      },
    },
    
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;