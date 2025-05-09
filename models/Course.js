const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  gradeLevel: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  content: {
    type: String,
    required: true,
  },
  learningObjectives: [
    {
      type: String,
      trim: true,
    },
  ],
  materials: [
    {
      type: String,
      trim: true,
    },
  ],
  duration: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  length: {
    type: Number,
    min: 1,
    max: 52,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
