const request = require("supertest");
const app = require("../../server");
const UserFactory = require("../factories/userFactory");
const CourseFactory = require("../factories/courseFactory");
const OrderFactory = require("../factories/orderFactory");
const jwt = require("jsonwebtoken");

describe("Orders Routes", () => {
  let authToken;
  let testUser;
  let testCourse;
  let testOrder;

  beforeEach(async () => {
    // Create a test user and get auth token
    testUser = await UserFactory.create({
      role: "teacher",
    });

    authToken = jwt.sign(
      { userId: testUser._id, role: testUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Create a test course
    testCourse = await CourseFactory.create();

    // Create a test order
    testOrder = await OrderFactory.create({
      user: testUser._id,
      courses: [testCourse._id],
    });
  });

  describe("GET /api/orders", () => {
    it("should get all orders when authenticated", async () => {
      const response = await request(app)
        .get("/api/orders")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("courses");
    });

    it("should not get orders without authentication", async () => {
      const response = await request(app).get("/api/orders");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/orders/my-orders", () => {
    it("should get user's orders when authenticated", async () => {
      const response = await request(app)
        .get("/api/orders/my-orders")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("user", testUser._id.toString());
    });

    it("should not get user's orders without authentication", async () => {
      const response = await request(app).get("/api/orders/my-orders");

      expect(response.status).toBe(401);
    });
  });

  describe("POST /api/orders", () => {
    it("should create a new order when authenticated", async () => {
      const orderData = OrderFactory.generateWithoutTimeStamps({
        user: testUser._id,
        courses: [testCourse._id],
      });

      const response = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${authToken}`)
        .send(orderData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("user")
      expect(response.body).toHaveProperty("courses");
      expect(response.body).toHaveProperty("totalPrice", testCourse.price);
      expect(response.body).toHaveProperty("status", "pending");
      expect(response.body).toHaveProperty("paymentStatus", "pending");
    });

    it("should not create an order without authentication", async () => {
      const orderData = {
        courses: [testCourse._id],
        paymentMethod: "credit_card",
      };

      const response = await request(app).post("/api/orders").send(orderData);

      expect(response.status).toBe(401);
    });

    it("should not create an order with invalid course ids", async () => {
      const orderData = {
        courses: ["507f1f77bcf86cd799439011"], // Invalid course ID
        paymentMethod: "credit_card",
      };

      const response = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${authToken}`)
        .send(orderData);

      expect(response.status).toBe(500);
    });
  });
});
