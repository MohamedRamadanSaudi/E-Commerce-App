const express = require("express");
const router = express.Router();
const Coupon = require("../controller/couponController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Coupon.createCoupon
);
router.put(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Coupon.updateCoupon
);
router.delete(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Coupon.deleteCoupon
);
router.get(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Coupon.getCoupon
);
router.get(
  "/",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  Coupon.getAllCoupons
);

module.exports = router;
