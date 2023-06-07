const JuryModel = require('../models/jury.model.js');
const jwt = require('jsonwebtoken');
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require('bcrypt');

const { signUpErrors, signInErrors } = require('../utils/errors.utils.js');

const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.add = async (req, res) => {
  const {name, lastName, email, birthDate,phone, password } = req.body
  if(req.file.filename){   
    let picture = '/uploads/'+req.file.filename;
    try {
      const jury = await JuryModel.create({name, lastName, email,phone, birthDate, password, picture });
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
  const { email, password } = req.body;
  try {
    const jury = await JuryModel.login(email, password);
    console.log(jury);
    let token = jwt.sign({id: jury._id, nom: jury.name, role: jury.role}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3h'});
    res.status(200).send({
      id : jury._id,
      name : jury.name,
      email : jury.email,
      accessToken : token
    });

  } catch (err){
    res.status(500).send({ message : err.message });
  }
}
module.exports.getAllJurys = async (req, res) => {
  const jurys = await JuryModel.find().select("-password");
  res.status(200).json(jurys);
};
module.exports.juryInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try{
    let jury = await JuryModel.findById(req.params.id).select("-password");
    console.log(jury);
    res.status(200).send(jury);
  }catch (err){
   res.status(400).send(err.message);
  }
  };
module.exports.logout = async (req, res) => {
  let token = req.headers['x-access-token'];
  let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
  let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
  token = hashedRandomNumberToAppend;  
  res.header('x-access-token',token).json({ message : 'Logout Success !!!'});

}
module.exports.deleteJury = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    let jury = await JuryModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};