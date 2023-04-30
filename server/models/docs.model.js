const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema(
  {
    associationId: {
      type: String,
      required: true
    },
    docs: {
      type: [String]
    },
    isAccepted: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('docs', docsSchema);