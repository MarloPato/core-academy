const Order = require("../../models/Order");
const OrderFactory = require("../factories/orderFactory");
const UserFactory = require("../factories/userFactory");
const CourseFactory = require("../factories/courseFactory");

describe("Order Model", () => {
  afterEach(async () => {
    // Clear the orders collection after each test
    await Order.deleteMany({});
  });

  it("should create a valid order with user and courses", async () => {
    // Create a user and courses first
    const user = await UserFactory.create();
    const courses = await CourseFactory.createMany(2);

    const orderData = OrderFactory.generate({
      user: user._id,
      courses: courses.map((course) => course._id),
    });

    const order = await Order.create(orderData);

    expect(order.user.toString()).toBe(user._id.toString());
    expect(order.courses.map((c) => c.toString())).toEqual(
      expect.arrayContaining(courses.map((c) => c._id.toString()))
    );
    expect(order.status).toBe(orderData.status);
    expect(order.paymentMethod).toBe(orderData.paymentMethod);
    expect(order.paymentStatus).toBe(orderData.paymentStatus);
    expect(order.notes).toBe(orderData.notes);
  });

  it("should validate required fields", async () => {
    const invalidOrder = {};

    try {
      await Order.create(invalidOrder);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.user).toBeDefined();
      expect(error.errors.courses).toBeDefined();
      expect(error.errors.paymentMethod).toBeDefined();
    }
  });

  it("should validate status enum values", async () => {
    const user = await UserFactory.create();
    const courses = await CourseFactory.createMany(1);

    const orderData = OrderFactory.generate({
      user: user._id,
      courses: courses.map((course) => course._id),
      status: "invalid-status",
    });

    try {
      await Order.create(orderData);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.status).toBeDefined();
    }
  });

  it("should validate paymentStatus enum values", async () => {
    const user = await UserFactory.create();
    const courses = await CourseFactory.createMany(1);

    const orderData = OrderFactory.generate({
      user: user._id,
      courses: courses.map((course) => course._id),
      paymentStatus: "invalid-status",
    });

    try {
      await Order.create(orderData);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.paymentStatus).toBeDefined();
    }
  });

  it("should set default status to pending", async () => {
    const user = await UserFactory.create();
    const courses = await CourseFactory.createMany(1);

    const orderData = OrderFactory.generate({
      user: user._id,
      courses: courses.map((course) => course._id),
    });
    delete orderData.status;

    const order = await Order.create(orderData);
    expect(order.status).toBe("pending");
  });

  it("should set default paymentStatus to pending", async () => {
    const user = await UserFactory.create();
    const courses = await CourseFactory.createMany(1);

    const orderData = OrderFactory.generate({
      user: user._id,
      courses: courses.map((course) => course._id),
    });
    delete orderData.paymentStatus;

    const order = await Order.create(orderData);
    expect(order.paymentStatus).toBe("pending");
  });

  it("should update completedAt when status changes to completed", async () => {
    const user = await UserFactory.create();
    const courses = await CourseFactory.createMany(1);

    const orderData = OrderFactory.generateWithoutTimeStamps({
      user: user._id,
      courses: courses.map((course) => course._id),
      status: "pending",
    });
    const order = await Order.create(orderData);
    expect(order.completedAt).toBeUndefined();

    order.status = "completed";
    await order.save();

    expect(order.completedAt).toBeDefined();
  });

  it("should update cancelledAt when status changes to cancelled", async () => {
    const user = await UserFactory.create();
    const courses = await CourseFactory.createMany(1);

    const orderData = OrderFactory.generateWithoutTimeStamps({
      user: user._id,
      courses: courses.map((course) => course._id),
      status: "pending",
    });

    const order = await Order.create(orderData);
    expect(order.cancelledAt).toBeUndefined();

    order.status = "cancelled";
    await order.save();

    expect(order.cancelledAt).toBeDefined();
  });
});
