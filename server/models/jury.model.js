const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const jurySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
      default: "Jury",},
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
    
    
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
jurySchema.pre("save", async function(next) {
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