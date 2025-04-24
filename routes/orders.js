const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Get all orders
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("courses", "title price");
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// Get user's orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate(
      "courses",
      "title price"
    );
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user orders", error: error.message });
  }
});

// Create new order
router.post("/", auth, async (req, res) => {
  try {
    const { courses, paymentMethod } = req.body;

    const order = new Order({
      user: req.user.userId,
      courses,
      status: "pending",
      paymentMethod,
      paymentStatus: "pending",
      purchasedAt: new Date(),
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

module.exports = router;
