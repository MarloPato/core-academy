const jwt = require("jsonwebtoken");
const User = require("../models/User");

const admin = async (req, res, next) => {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if(!user || user.role !== "admin"){
        return res.status(403).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = admin;