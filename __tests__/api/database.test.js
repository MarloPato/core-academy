const request = require("supertest");
const app = require("../../server");
const UserFactory = require("../factories/userFactory");
const CourseFactory = require("../factories/courseFactory");
const OrderFactory = require("../factories/orderFactory");

const userData = require("../../data/users");
const courseData = require("../../data/courses");
const orderData = require("../../data/orders");

const User = require("../../models/User");
const Course = require("../../models/Course");
const Order = require("../../models/Order");

const { generateToken } = require("../../utils/jwt");

describe("Wipe and Reseed Database", () => {
    let authToken;
    let testUser;
    let testAdmin;
  
    beforeEach(async () => {
        // Create a test user and get auth token
        testUser = await UserFactory.create({
            role: "teacher",
        });

        testAdmin = await UserFactory.create({
            role: "admin",
        })
  });

  it("should not be accessible to non-admin users", async () => {
    authToken = generateToken(testUser._id, testUser.role);
    const response = await request(app)
      .post("/api/wipe")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(403);
  });

  it("should be accessible to admin users", async () => {
    authToken = generateToken(testAdmin._id, testAdmin.role);
    const response = await request(app)
      .post("/api/wipe")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it("should wipe data", async () => {
    authToken = generateToken(testAdmin._id, testAdmin.role);
    const course = await CourseFactory.create()
    const order = await OrderFactory.create({
        courses: [course._id],
        user: testUser._id,
    })

    await request(app)
      .post("/api/wipe")
      .set("Authorization", `Bearer ${authToken}`);

    const courseAfterWipe = await Course.findById(course._id);
    const orderAfterWipe = await Order.findById(order._id);

    expect(courseAfterWipe).toBeNull();
    expect(orderAfterWipe).toBeNull();
  });

  it("should reseed data", async () => {
    authToken = generateToken(testAdmin._id, testAdmin.role);
    let userCount = await User.countDocuments();
    let courseCount = await Course.countDocuments();
    let orderCount = await Order.countDocuments();

    expect(userCount).toBe(2);
    expect(courseCount).toBe(0);
    expect(orderCount).toBe(0);
     await request(app)
      .post("/api/wipe")
      .set("Authorization", `Bearer ${authToken}`);

    userCount = await User.countDocuments();
    expect(userCount).toBe(userData.length);

    courseCount = await Course.countDocuments();
    expect(courseCount).toBe(courseData.length);

    orderCount = await Order.countDocuments();
    expect(orderCount).toBe(orderData.length);
  });
  

  
  
});
