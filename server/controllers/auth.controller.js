const UserModel = require('../models/user.model.js');
const AssociationModel = require('../models/association.model.js');
const DocsModel = require('../models/docs.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const service= require("../service");
var fs =require('fs');

const { signUpErrors, signInErrors } = require('../utils/errors.utils.js');

const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.signUp = async (req, res) => {
  const {nameUser,lastName,birthDate, email,phone, password, description, name } = req.body
  if(req.file.filename){   
    let picture = '/uploads/'+req.file.filename;
    try {
      const user = await UserModel.create({nameUser,lastName,birthDate, email,phone, password, picture });
      const association = await AssociationModel.create({ userId : user._id , name : name , description :description });
      const docs = await DocsModel.create({ associationId : association._id });
      try {
        // node mailer
        //Send MAil(token,email,url app,password)
        from = process.env.EMAIL;
        subject="welcome to Gafa App";
            
        html = {};
        html.content = fs.readFileSync(__dirname+"/../assets/new_user.html", "utf8");
        html.firstname = user.nameUser;
        // service.Send_mail_new_client(from,user.email,subject,html);
        res.status(201).send({ message: "User Registered Successfully and association was created"});
    } catch (error) {
        res.status(400).json({ message : error.message });
    }
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
    let token = jwt.sign({id: user._id, nom: user.nameUser, role: user.role}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3h'});
    res.status(200).send({
      id : user._id,
      nameUser : user.nameUser,
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