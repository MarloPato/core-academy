const mongoose = require("mongoose");
const Course = require("./Course");
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

async function preSaveHook(order) {
  if (order.isModified("status")) {
    if (order.status === "completed" && !order.completedAt) {
      order.completedAt = Date.now();
    } else if (order.status === "cancelled" && !order.cancelledAt) {
      order.cancelledAt = Date.now();
    }
  }
  const totalPrice = await Course.aggregate([
    {
      $match: {
        _id: { $in: order.courses },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$price" },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
      },
    },
  ]);
  order.totalPrice = totalPrice.reduce((acc, course) => acc + course.total, 0);
}

orderSchema.pre("save", async function (next) {
  await preSaveHook(this);
  next();
});

orderSchema.post("insertMany", async function (docs) {
  try {
    for (const doc of docs) {
      await doc.save();
    }
  } catch (error) {
    console.warn(error);
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
