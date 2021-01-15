const { Schema, model } = require("mongoose");
const Types = Schema.Types;

const _schema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  roleId: {
    type: Types.ObjectId
  },
  avatar: {
    type: Types.ObjectId
  },
  phone: {
    type: String
  },
  deletedAt: {
    type: Date
  }
}, { timestamps: true })

module.exports = model("user", _schema);
