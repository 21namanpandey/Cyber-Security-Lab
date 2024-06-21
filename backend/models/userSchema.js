import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, "email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true,'password is required']
  }
})

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES
  })
};


export const User = mongoose.model("User",userSchema)