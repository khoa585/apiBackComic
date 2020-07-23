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
    comic_id: { type: Schema.Types.ObjectId, ref: "comic" },
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
