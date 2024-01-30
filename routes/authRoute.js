const express = require("express");
const router = express.Router();
const User = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Post Routes
router.post("/register", User.registerUser);
router.post("/login", User.loginUser);
router.post("/admin-login", User.loginAdmin);
router.post("/cart", authMiddleware.authMiddleware, User.userCart);
router.post(
  "/cart/applycoupon",
  authMiddleware.authMiddleware,
  User.applyCouponCode
);
router.post("/forgot-password-token", User.forgotPasswordToken);
router.post(
  "/cart/cash-order",
  authMiddleware.authMiddleware,
  User.createOrder
);

// Get Routes
router.get("/all-users", User.getAllUsers);
router.get("/get-orders", authMiddleware.authMiddleware, User.getOrders);
router.get("/refresh", User.handleRefreshToken);
router.get("/logout", User.logout);
router.get("/wishlist", authMiddleware.authMiddleware, User.getWishlist);
router.get("/cart", authMiddleware.authMiddleware, User.getUserCart);
router.get(
  "/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  User.getUser
);

// Put Routes
router.put("/reset-password/:token", User.resetPassword);
router.put(
  "/order/update-order/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  User.updateOrderStatus
);
router.put("/edit-user", authMiddleware.authMiddleware, User.updateUser);
router.put("/save-address", authMiddleware.authMiddleware, User.saveAddress);
router.put(
  "/block-user/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  User.blockUser
);
router.put(
  "/unblock-user/:id",
  authMiddleware.authMiddleware,
  authMiddleware.isAdmin,
  User.unblockUser
);
router.put(
  "/change-password",
  authMiddleware.authMiddleware,
  User.updatePassword
);

// Delete Routes
router.delete("/empty-cart", authMiddleware.authMiddleware, User.emptyCart);
router.delete("/:id", User.deleteUser);

module.exports = router;
