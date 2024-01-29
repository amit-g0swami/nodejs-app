const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: null,
  },
  cartDetails: {
    type: Array,
    default: [],
  },
  shippingAddress: {
    type: String,
    default: null,
  },
});

module.exports = User = mongoose.model("user", UserSchema);