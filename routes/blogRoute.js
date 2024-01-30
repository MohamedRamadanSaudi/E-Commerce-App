const express = require("express");
const Blog = require("../controller/blogController");
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post(
  "/",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Blog.createBlog
);
router.put(
  "/upload/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  Blog.uploadImages
);
router.put("/likes", authMiddleware.authMiddleware, Blog.likeBlog);
router.put("/dislikes", authMiddleware.authMiddleware, Blog.dislikeBlog);
router.put(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Blog.updateBlog
);
router.get("/:id", Blog.getBlog);
router.get("/", Blog.getAllBlogs);
router.delete(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Blog.deleteBlog
);

module.exports = router;
