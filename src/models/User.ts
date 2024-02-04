import mongoose from "mongoose";
import { CREATED_AS } from "../shared/shared.interface";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAs: {
    type: String,
    required: true,
    enum: [CREATED_AS.CUSTOMER, CREATED_AS.SELLER],
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
