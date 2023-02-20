const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minLength: 2
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minLength: 2
    },
    username: {
      type: String,
      trim: true,
      required: true,
      minLength: 2
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true
    },
    userPassword: {
      type: String,
      required: true,
      minLength: 6
    },
    avatar: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ['USER', 'HOST', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
)

module.exports = model("User", userSchema)