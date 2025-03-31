import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema); //MongoDB automatically add 's' for "User" to make it "Users"

export default User;