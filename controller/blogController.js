const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

// Create Blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog post by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment the number of views
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    )
      .populate("likes")
      .populate("dislikes"); // Populate likes and dislikes

    res.json(updatedBlog);
  } catch (error) {
    // Handle errors appropriately, e.g., log the error and send a response
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Blog
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    numAllBlogs = await Blog.countDocuments();
    res.json({
      "Number of Blogs": numAllBlogs,
      blogs,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json({
      message: "Blog Deleted Successfully",
      deletedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Like Blog
const likeBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;
    validateMongoDbId(blogId);

    // Find the blog
    const blog = await Blog.findById(blogId);
    // Find the user
    const loginUserId = req?.user?._id;
    // Find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // Find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.send(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.send(blog);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Dislike Blog
const dislikeBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.body;
    validateMongoDbId(blogId);

    // Find the blog
    const blog = await Blog.findById(blogId);
    // Find the user
    const loginUserId = req?.user?._id;
    // Find if the user has liked the blog
    const isDisliked = blog?.isDisliked;
    // Find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
    }
    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.send(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.send(blog);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      // Check if the file exists before attempting to delete
      if (fs.existsSync(path)) {
        // Attempt to delete the file
        try {
          fs.unlinkSync(path);
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getAllBlogs,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
