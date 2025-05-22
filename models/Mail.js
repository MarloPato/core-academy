const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  subject: { type: String },
  status: {
    enum: ["pending", "canceled"],
    default: "pending",
  },
  content: { type: "String" },
  order: { type: mongoose.SchemaTypes.ObjectId, ref: "Order" },
  sentAt: { type: Date, default: Date.now },
  user: { type: mongoose.SchemaType.ObjectId, ref: "User" },
});

const Mail = mongoose.module("Mail", mailSchema);

module.exports = Mail;  
