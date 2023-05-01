const UserModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { signUpErrors, signInErrors } = require('../utils/errors.utils.js');

const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.signUp = async (req, res) => {
  const {name, lastName, email, birthDate, password } = req.body
  if(req.file.filename){   
    let picture = '/uploads/'+req.file.filename;
    try {
      const user = await UserModel.create({name, lastName, email, birthDate, password, picture });
      res.status(201).send({ message: "Jury Registered Successfully"});
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(500).send({ message : errors })
    }
  }else{
    res.status(500).send({ message : 'Picture is required' })
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    let token = jwt.sign({id: user._id, nom: user.pseudo, role: user.role}, process.env.TOKEN_SECRET,{expiresIn:'3h'});
    res.status(200).send({
      id : user._id,
      pseudo : user.pseudo,
      email : user.email,
      accessToken : token
    });

  } catch (err){
    res.status(500).send({ message : err.message });
  }
}

module.exports.logout = async (req, res) => {
  let token = req.headers['x-access-token'];
  let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
  let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
  token = hashedRandomNumberToAppend;  
  res.header('x-access-token',token).json({ message : 'Logout Success !!!'});

}