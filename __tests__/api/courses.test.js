const request = require("supertest");
const app = require("../../server");
const Course = require("../../models/Course");
const UserFactory = require("../factories/userFactory");
const CourseFactory = require("../factories/courseFactory");
const { generateToken } = require("../../utils/jwt");

describe("Courses Routes", () => {
  let authToken;
  let testCourse;

  beforeEach(async () => {
    // Create a test user and get auth token
    const user = await UserFactory.create({
      role: "admin",
    });

    authToken = generateToken(user._id, user.role);

    // Create a test course
    testCourse = await CourseFactory.create();
  });

  describe("GET /api/courses", () => {
    it("should get all courses", async () => {
      const response = await request(app).get("/api/courses");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/courses/:id", () => {
    it("should get a single course by id", async () => {
      const response = await request(app).get(`/api/courses/${testCourse._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", testCourse._id.toString());
    });

    it("should return 404 for non-existent course id", async () => {
      const response = await request(app).get(
        "/api/courses/507f1f77bcf86cd799439011"
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Course not found");
    });
  });

  describe("POST /api/courses", () => {
    it("should create a new course when authenticated and admin", async () => {
      const courseData = CourseFactory.generate();

      const response = await request(app)
        .post("/api/courses")
        .set("Authorization", `Bearer ${authToken}`)
        .send(courseData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("title", courseData.title);
      expect(response.body).toHaveProperty(
        "description",
        courseData.description
      );
    });

    it("should not create a course without authentication", async () => {
      const courseData = CourseFactory.generate();

      const response = await request(app).post("/api/courses").send(courseData);

      expect(response.status).toBe(401);
    });

    it("should not create a course when not admin", async () => {
      const teacherUser = await UserFactory.create({
        role: "teacher",
      });
      authToken = generateToken(teacherUser._id, teacherUser.role);
      const courseData = CourseFactory.generate();

      const response = await request(app)
        .post("/api/courses")
        .set("Authorization", `Bearer ${authToken}`)
        .send(courseData);
      expect(response.status).toBe(403);
    });
  });

  describe("PUT /api/courses/:id", () => {
    it("should update a course when authenticated and admin", async () => {
      const updateData = {
        title: "Updated Course Title",
        price: 149.99,
      };

      const response = await request(app)
        .put(`/api/courses/${testCourse._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("title", updateData.title);
      expect(response.body).toHaveProperty("price", updateData.price);
    });

    it("should not update a course without authentication", async () => {
      const updateData = {
        title: "Updated Course Title",
      };

      const response = await request(app)
        .put(`/api/courses/${testCourse._id}`)
        .send(updateData);

      expect(response.status).toBe(401);
    });

    it("should not update a course when not admin", async () => {
      const teacherUser = await UserFactory.create({
        role: "teacher",
      });
      authToken = generateToken(teacherUser._id, teacherUser.role);
      const updateData = {
        title: "Updated Course Title",
      };

      const response = await request(app)
        .put(`/api/courses/${testCourse._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(403);
    });
  });

  describe("DELETE /api/courses/:id", () => {
    it("should delete a course when authenticated and admin", async () => {
      const response = await request(app)
        .delete(`/api/courses/${testCourse._id}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Course deleted successfully"
      );

      // Verify course is deleted
      const deletedCourse = await Course.findById(testCourse._id);
      expect(deletedCourse).toBeNull();
    });

    it("should not delete a course without authentication", async () => {
      const response = await request(app).delete(
        `/api/courses/${testCourse._id}`
      );

      expect(response.status).toBe(401);
    });

    it("should not delete a course when not admin", async () => {
      const teacherUser = await UserFactory.create({
        role: "teacher",
      });
      authToken = generateToken(teacherUser._id, teacherUser.role);
      const response = await request(app)
        .delete(`/api/courses/${testCourse._id}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(403);
    });
  });
});
