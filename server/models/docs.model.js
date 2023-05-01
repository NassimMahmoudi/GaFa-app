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
      type: String,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('docs', docsSchema);