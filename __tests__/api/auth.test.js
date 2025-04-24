const request = require("supertest");
const app = require("../../server");
const User = require("../../models/User");
const UserFactory = require("../factories/userFactory");

describe("Auth Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const userData = UserFactory.generate();
      const response = await request(app)
        .post("/api/auth/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("email", userData.email);
      expect(response.body.user).toHaveProperty("role", userData.role);
    });

    it("should not register a user with existing email", async () => {
      const userData = UserFactory.generate();

      // Create a user first
      await UserFactory.create(userData);

      const newUserData = UserFactory.generate({
        email: userData.email,
      });
      // Try to register the same user again
      const response = await request(app)
        .post("/api/auth/register")
        .send(newUserData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      const userData = UserFactory.generate();

      // Create a user first
      await UserFactory.create(userData);

      const response = await request(app).post("/api/auth/login").send({
        email: userData.email,
        password: userData.password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("email", userData.email);
    });

    it("should not login with incorrect password", async () => {
      const userData = UserFactory.generate();

      // Create a user first
      await UserFactory.create(userData);

      const response = await request(app).post("/api/auth/login").send({
        email: userData.email,
        password: "wrongpassword",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should not login with non-existent email", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });
  });
});
