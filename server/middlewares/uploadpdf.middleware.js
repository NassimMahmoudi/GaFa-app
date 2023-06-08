var multer = require("multer")
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,"./uploads/docs/");
  },
  filename :function(req, file, cb){
    cb(null,file.originalname);
  },
});
// the parameter is the name of input tag (in html view: <input type="file" id="files">) will store the files in req.file
var upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        
            cb(null, true);
       
    },
    }).single("file");

module.exports = upload;