const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, "min length must be higher than or equal 3"],
      maxLength: [20, "max length must be lower than or equal 20"],
    },
    password: {
      type: String,
      required: true,
     
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },
  },
  {
    virtuals: {
      options: {
        tasks: {
          ref: "Task",
          type: [mongoose.Types.ObjectId],
        },
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  //hashing
  const passwordHashed = await bcryptjs.hash(this.password, 12);
  this.password = passwordHashed;
  console.log(
    `we will change password ${this.password} for username: ${this.username}`
  );
  next();
}); 

module.exports = mongoose.model("User", userSchema);
