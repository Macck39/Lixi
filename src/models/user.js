import mongoose, { Schema, mongo } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email Required !!"],
  },
  password: {
    type: String,
    required: [true, "Password Required !!"],
  },
});

export const User =
  mongoose.models.users || mongoose.model("users", UserSchema);
