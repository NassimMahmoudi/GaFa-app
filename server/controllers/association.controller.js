const AssosiationModel = require("../models/association.model.js");
const { uploadErrors } = require("../utils/errors.utils.js");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.associationInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try{
    let association = await AssosiationModel.findById(req.params.id).select("-password");
    console.log(association);
    res.status(200).send(association);
  }catch (err){
   res.status(400).send(err.message);
  }
  };
module.exports.associationInfoByUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try{
    let association = await AssosiationModel.findOne({userId : req.params.id}).select("-password");
    console.log(association);
    res.status(200).send(association);
  }catch (err){
   res.status(400).send(err.message);
  }
  };
module.exports.getAllAssociation = async (req, res) => {
    const associations = await AssosiationModel.find();
    res.status(200).json(associations);
  };

  module.exports.acceptAssociation = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    const updatedRecord = {
      is_accepted : true,
    };
    try {let association = await AssosiationModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
    );
    res.status(200).send(association);
  }catch(err){
    res.status(500).send("message : ", err.message);
    }
  };

