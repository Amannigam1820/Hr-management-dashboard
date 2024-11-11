import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HrType } from "../types/hrType.js";
const Schema = mongoose.Schema;

// Define the User schema
const HrSchema = new Schema({
  username: {
    type: String,
    required: true,
    //unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

HrSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

HrSchema.methods.isPasswordCorrects = async function (password: string) {
  console.log(await bcrypt.compare(password, this.password));

  return await bcrypt.compare(password, this.password);
};

HrSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    "amanplaybook",
    {
      expiresIn: process.env.EXPIRE_In,
    }
  );
};

const Hr: Model<HrType> = mongoose.model<HrType>("Hr", HrSchema);

export { Hr };
 