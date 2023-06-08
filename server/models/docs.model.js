const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema(
  {
    associationId: {
      type: String,
      required: true
    },
    docs: {
      type: [
        {
          docPath: String,
          docName: String,
          timestamp: Date,
        }
      ],
        
    },
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('docs', docsSchema);