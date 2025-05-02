

const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/revenue-per-month", auth, admin, async (req, res) => {
    const orders = await Order.find({ status: "completed" });
    const mappedOrders = orders.map((order) => {
        return {
            date: order.purchasedAt,
            revenue: order.totalPrice,
        };
    });
    const revenuePerMonth = mappedOrders.reduce((acc, order) => {
        const month = order.date.getMonth();
        const year = order.date.getFullYear();
        const key = `${year}-${month}`;
        acc[key] = (acc[key] || 0) + order.revenue;
        return acc;
    }, {});
    res.json({
        revenue: revenuePerMonth,
    });
});

router.get("/top-customers", auth, admin, async (req, res) => {
    const orders = await Order.find({ status: "completed" }).populate("user", "name email _id");
    const mappedOrders = orders.map((order) => {
        return {
            customer: order.user,
            totalPrice: order.totalPrice,
        };
    });
    const customers = {}
    mappedOrders.forEach((order) => {
        if(!customers[order.customer._id]){
            customers[order.customer._id] = {
                user: order.customer,
                totalPrice: order.totalPrice,
            }
        }else{
            customers[order.customer._id].totalPrice += order.totalPrice;
        }
    });
    const sortedCustomers = Object.values(customers).sort((a, b) => b.totalPrice - a.totalPrice);
    const top5Customers = sortedCustomers.slice(0, 5);
    res.json({
        customers: top5Customers,
    });
});


module.exports = router;