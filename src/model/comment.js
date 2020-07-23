const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    content: String,
    creator: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      client: {
        email: String,
        name: String,
      },
    },
    comic: { type: Schema.Types.ObjectId, ref: "comic" },
    chapter:{
      type:Schema.Types.ObjectId,
      ref:"chapter"
    },
    replies: [
      {
        content: String,
        creator: {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          client: {
            email: String,
            name: String,
          },
        },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
