const DocsModel = require("../models/docs.model.js");
const { uploadErrors } = require("../utils/errors.utils.js");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readDocs = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    DocsModel.findOne({_id :req.params.id},(err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
};




module.exports.updatDocs= (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    description: req.body.description,
    name: req.body.name,
  };

  DocsModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};
module.exports.acceptAssociation = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    isAccepted : true,
  };

  DocsModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};


