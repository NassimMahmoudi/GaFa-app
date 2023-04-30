const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const jurySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique : true,
      trim: true
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
    age: {
      type: String,
      required: true,
    },
    details : {
      type: [
        {
          sexe:String,
          height: String,
          weight: String,
          heart_Rate: String,
          body_Temp: String,
          level: String,
        },
      ],
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

jurySchema.statics.login = async function(username, password) {
  const jury = await this.findOne({ username });
  if (jury) {
    const auth = await bcrypt.compare(password, jury.password);
    if (auth) {
      return jury;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username')
};

const JuryModel = mongoose.model("jury", jurySchema);

module.exports = JuryModel;