const AssosiationModel = require("../models/association.model.js");
const { uploadErrors } = require("../utils/errors.utils.js");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.read = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    AssosiationModel.findOne({_id :req.params.id},(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
};
module.exports.getAllAssociation = async (req, res) => {
    const associations = await AssosiationModel.find().select("-password");
    res.status(200).json(associations);
  };



