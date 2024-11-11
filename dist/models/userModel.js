import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Schema = mongoose.Schema;
// Define the User schema
const UserSchema = new Schema({
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
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
UserSchema.methods.isPasswordCorrects = async function (password) {
    console.log(await bcrypt.compare(password, this.password));
    return await bcrypt.compare(password, this.password);
};
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({
        _id: this._id,
    }, "amanplaybook", {
        expiresIn: process.env.EXPIRE_In,
    });
};
const User = mongoose.model("User", UserSchema);
export { User };
