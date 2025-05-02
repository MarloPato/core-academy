const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["teacher", "admin"],
      default: "teacher",
    },
    school: {
      type: String,
      trim: true,
    },
    subjects: [
      {
        type: String,
        trim: true,
      },
    ],
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

async function hashPassword(user) {  
  if (user.isModified && !user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 10);
}

userSchema.pre("save", async function (next) {
  await hashPassword(this);
  next();
});

module.exports = mongoose.model("User", userSchema);
