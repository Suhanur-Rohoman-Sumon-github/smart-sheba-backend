import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./user.interface";

const UserSchema = new Schema({
    role:{type:String },
    email:{type:String}
});


export const UserModel = mongoose.model<UserDocument>('User', UserSchema);