import Post from "../models/Post.js";
import slugify from "slugify";

//---------CREATE---------//
const createPost = async (req, res) => {
  try {
    console.log("Request body:", req.body); // DEBUG LINE

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const slug = slugify(title, { lower: true });

    // Check if slug already exists for this user
    const existing = await Post.findOne({ slug, user: req.user._id });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You already have a post with this title",
      });
    }

    const newPost = new Post({
      title,
      content,
      slug,
      user: req.user._id,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//--------READ (public)---------//
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "name");
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: err.message,
    });
  }
};

//--------READ (slug)---------//
const getPostBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug }).populate("user", "name email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//--------READ (private)---------//
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

//--------UPDATE (only by owner)---------//
const updatePost = async (req, res) => {
  try {
    const oldSlug = req.params.slug;
    const { title, content } = req.body;

    const post = await Post.findOne({ slug: oldSlug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Ownership check
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own posts",
      });
    }

    const newSlug = slugify(title, { lower: true });

    post.title = title;
    post.content = content;
    post.slug = newSlug;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//--------DELETE (only by owner)---------//
const deletePost = async (req, res) => {
  try {
    const slug = req.params.slug;

    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Ownership check
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    await Post.deleteOne({ slug });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  createPost,
  getAllPosts,
  getPostBySlug,
  getMyPosts,
  updatePost,
  deletePost,
};
