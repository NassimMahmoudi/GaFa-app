const associationModel = require("../models/association.model.js");
const DocsModel = require("../models/docs.model.js");
const { uploadErrors } = require("../utils/errors.utils.js");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readDocs = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    let docs = await DocsModel.findOne({associationId :req.params.id});
    if(docs){
      res.status(200).send(docs)
    }else{
      res.status(400).send("Error to get data ")
    }
   
};
module.exports.addDocs = async (req, res) => {
   if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    let association = await associationModel.findOne({userId : req.params.id});
    console.log(association);
    if(!association)
        return res.status(200).send({ message :"Association unknown : " + req.params.id}); 
    if(req.file.filename){   
      let docPath = '/uploads/docs/'+req.file.filename;
      let docName = req.file.filename;
      console.log(docPath);
      console.log(docName);
      try {
        await DocsModel.findOneAndUpdate(
        { associationId : association._id},
        {
          $push: {
            docs: {
              docPath: docPath,
              docName: docName,
              timestamp: Date.now(),
            },
          },
        },
        { new: true })
              .then((data) => res.status(200).send({ message: 'OK' }))
              .catch((err) => res.status(500).send({ message: err }));
      } catch (err) {
          return res.status(201).send({ message: err });
      }
    }else{
      res.status(500).send({ message : 'Doc is required' })
    }
    
};
module.exports.deleteDoc = async (req, res) => {
  if (
      !ObjectID.isValid(req.params.docId) ||
      !ObjectID.isValid(req.params.assocciationId)
    )
      return res.status(400).send("ID unknown : " + req.params.docId +"Or"+ req.params.assocciationId);
    console.log(req.params.assocciationId)
    console.log(req.params.docId)
  try {
  await DocsModel.findOneAndUpdate(
      { assocciationId : req.params.assocciationId},
      {
        $pull: {
          docs: {
            _id: req.params.docId,
          },
        },
      },
      { new: true })
            .then((data) => res.send('Deleting success !!'))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
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