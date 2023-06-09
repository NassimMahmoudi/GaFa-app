const AdminModel = require('../models/admin.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require("mongoose").Types.ObjectId;
var fs =require('fs');


const { signUpErrors, signInErrors } = require('../utils/errors.utils.js');
const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const admin = await AdminModel.login(email, password);
      let token = jwt.sign({id: admin._id, nom: admin.userName, role: admin.role}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3h'});
      res.status(200).send({
        id : admin._id,
        userName : admin.userName,
        email : admin.email,
        accessToken : token
      });
    } catch (err){
      res.status(500).json({ message : err.message });
    }
  }
  module.exports.signUp = async (req, res) => {
    const {userName, email, password} = req.body
    let picture = '/uploads/'+req.file.filename;
  
    try {
      const admin = await AdminModel.create({userName, email, password, picture });
      res.status(201).json({ message: "Admin Registered Successfully"});
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(200).send({ message : errors })
    }
  }
 
  module.exports.adminInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try{
      let admin = await AdminModel.findById(req.params.id).select("-password");
      console.log(admin);
      res.status(200).send(admin);
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
module.exports.uploadProfil = (req, res) => {
  let new_image;
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  if(req.file){  
    new_image='/uploads/profils/'+req.file.filename;
  try{
      // Delete old Image from server
      // IN the front side you should pass the new image and the old image too
      fs.unlinkSync("./uploads/profils/"+ req.body.old_image);//old_image in the front side must be a string from client.image 
  }catch(err){
      console.log(err);
  }
  const updatedRecord = {
    picture : new_image,
  };

  AdminModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );}else{
    res.status(200).json({ message : 'You must select a new Image' });
  }
};