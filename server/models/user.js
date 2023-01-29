import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hashing the password..on signing in
userSchema.pre("save", async function (next) {
  console.log("pre save");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
  }
  next();
});

const User = new mongoose.model("User", userSchema);
export default User;
