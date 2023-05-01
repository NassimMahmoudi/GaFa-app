const mongoose = require('mongoose');

const AssociationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('association', AssociationSchema);