const express = require("express");
const router = express.Router();
const Brand = require("../controller/brandController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Brand.createBrand
);
router.put(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Brand.updateBrand
);
router.delete(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Brand.deleteBrand
);
router.get("/:id", Brand.getBrand);
router.get("/", Brand.getAllBrands);

module.exports = router;
