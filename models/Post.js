import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    slug: { type: String, required: true, unique: true }, 

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true } 
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
