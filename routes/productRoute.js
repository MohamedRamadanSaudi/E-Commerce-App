const express = require("express");
const Product = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, Product.createProduct);
router.get("/", Product.getAllProducts);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  Product.uploadImages
);
router.put("/wishlist", authMiddleware, Product.addToWishlist);
router.put("/rating", authMiddleware, Product.ratingProduct);
router.put("/:id", authMiddleware, isAdmin, Product.updateProduct);
router.get("/:id", Product.getProduct);
router.delete("/:id", authMiddleware, isAdmin, Product.deleteProduct);

module.exports = router;
