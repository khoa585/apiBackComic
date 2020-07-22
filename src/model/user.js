const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: String,
  first_name: String,
  last_name: String,
  password: String,
  comics_following: [
    {
      type: Schema.Types.ObjectId,
      ref: "comic",
    },
  ],
  comics_uploaded: [
    {
      type: Schema.Types.ObjectId,
      ref: "comic",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.method("comparePassword", async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
});

module.exports = mongoose.model("user", userSchema);
