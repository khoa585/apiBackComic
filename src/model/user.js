const mongoose = require("mongoose");
const { ref } = require("joi");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: String,
  first_name: String,
  last_name: String,
  password: String,
//   comics_following: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "comic",
//     },
//   ],
//   comics_uploaded: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "comic",
//     },
//   ],
//   comments: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "comment",
//     },
//   ],
});

module.exports = mongoose.model("user", userSchema);
