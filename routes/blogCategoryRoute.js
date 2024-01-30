const express = require("express");
const router = express.Router();
const Category = require("../controller/blogCategoryController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Category.createCategory
);
router.put(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Category.updateCategory
);
router.delete(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Category.deleteCategory
);
router.get("/:id", Category.getCategory);
router.get("/", Category.getAllCategories);

module.exports = router;
