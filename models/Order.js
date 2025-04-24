const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    validate: [
      (v) => v.length > 0,
      "You must purchase at least one course",
    ],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  cancelledAt: {
    type: Date,
  },
  notes: {
    type: String,
    trim: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

// Update status timestamps
orderSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "completed") {
      this.completedAt = Date.now();
    } else if (this.status === "cancelled") {
      this.cancelledAt = Date.now();
    }
  }
  if (this.isModified("courses")) {
    this.totalPrice = this.courses.reduce((acc, course) => acc + course.price, 0);
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
