// /api/analytics/revenue-per-month/
// /api/analytics/top-customers/

const app = require("../../server");
const request = require("supertest");
const UserFactory = require("../factories/userFactory");
const OrderFactory = require("../factories/orderFactory");
const CourseFactory = require("../factories/courseFactory");
const { faker} = require("@faker-js/faker");
const { generateToken } = require("../../utils/jwt");

describe("Analytics API", () => {
  let authToken;
  let adminUser;
  let teacherUsers
  let testCourses;
  let testOrders;

  beforeEach(async () => {
    adminUser = await UserFactory.create({
      role: "admin",
    });

    authToken = generateToken(adminUser._id, adminUser.role);

    teacherUsers = await UserFactory.createMany(10, {
      role: "teacher",
    });

    testCourses = await CourseFactory.createMany(10);

    testOrders = await Promise.all(
      teacherUsers.slice(0, 8).map(async (user,index) => {
        const min = index % 2 === 0 ? 0 : 1;
        const courses = faker.helpers.arrayElements(testCourses, { min: min, max: 3 });
        if(courses.length === 0){
            return Promise.resolve(null);
        }
        const lastYear = new Date()
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        const month = faker.number.int({ min: 0, max: 11 });
        const orderDate = new Date(lastYear.getFullYear(), month, 1);
        orderDate.setDate(faker.number.int({ min: 0, max: 20 }));
        const completedAt = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
        completedAt.setDate(completedAt.getDate() + faker.number.int({ min: 1, max: 5 }));

        return await OrderFactory.create({
          user: user._id,
          courses: courses.map((course) => course._id),
          status: "completed",
          purchasedAt: orderDate,
          completedAt: completedAt,
          cancelledAt: undefined,
        });
      })
    );

    testOrders = testOrders.filter((order) => order);
  });

  describe("GET /api/analytics/revenue-per-month", () => {
    it("should return revenue per month", async () => {
      const response = await request(app)
        .get("/api/analytics/revenue-per-month")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("revenue");
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app)
        .get("/api/analytics/revenue-per-month");
      expect(response.status).toBe(401);
    });

    it("should return 403 if not admin", async () => {
      authToken = generateToken(teacherUsers[0]._id, teacherUsers[0].role);
      const response = await request(app)
        .get("/api/analytics/revenue-per-month")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(403);
    });
  });

  describe("GET /api/analytics/top-customers", () => {
    it("should return top customers if authenticated and admin", async () => {
      const response = await request(app)
        .get("/api/analytics/top-customers")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("customers");
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app)
        .get("/api/analytics/top-customers");
      expect(response.status).toBe(401);
    });

    it("should return 403 if not admin", async () => {
        authToken = generateToken(teacherUsers[0]._id, teacherUsers[0].role);
      const response = await request(app)
        .get("/api/analytics/top-customers")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(403);
    });
  });

  it("should return top 5 customers", async () => {
    const newTopCustomer = await UserFactory.create({
      role: "teacher",
    });
    const newOrder = await OrderFactory.create({
      user: newTopCustomer._id,
      courses: testCourses.map((course) => course._id),
      status: "completed",
    }, true);
    const response = await request(app)
      .get("/api/analytics/top-customers")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("customers");
    expect(response.body.customers).toHaveLength(5);
    expect(response.body.customers[0].user._id).toBe(newTopCustomer._id.toString());
    expect(response.body.customers[0].totalPrice).toBe(newOrder.totalPrice);
  });
});
