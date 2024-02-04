import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
    validate: /^\d{6}$/,
  },
  sellerId: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("address", AddressSchema);

export default Address;
