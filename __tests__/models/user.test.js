const User = require("../../models/User");
const UserFactory = require("../factories/userFactory");

describe("User Model", () => {
  afterEach(async () => {
    // Clear the users collection after each test
    await User.deleteMany({});
  });

  it("should create a valid user", async () => {
    const userData = UserFactory.generate();
    const user = await User.create(userData);

    expect(user.firstName).toBe(userData.firstName);
    expect(user.lastName).toBe(userData.lastName);
    expect(user.email).toBe(userData.email.toLowerCase());
    expect(user.role).toBe(userData.role);
    expect(user.school).toBe(userData.school);
    expect(user.subjects).toEqual(expect.arrayContaining(userData.subjects));
    expect(user.password).not.toBe(userData.password); // Password should be hashed
  });

  it("should hash password before saving", async () => {
    const password = "password123";
    const user = await UserFactory.create({ password });

    expect(user.password).not.toBe(password);
    expect(user.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt hash format
  });

  it("should not hash password if not modified", async () => {
    const user = await UserFactory.create();
    const originalHash = user.password;

    // Update a non-password field
    user.firstName = "New Name";
    await user.save();

    expect(user.password).toBe(originalHash);
  });

  it("should validate required fields", async () => {
    const invalidUser = {};

    try {
      await User.create(invalidUser);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.firstName).toBeDefined();
      expect(error.errors.lastName).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    }
  });

  it("should validate email format", async () => {
    const userData = UserFactory.generate({ email: "invalid-email" });

    try {
      await User.create(userData);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.email).toBeDefined();
    }
  });

  it("should validate role enum values", async () => {
    const userData = UserFactory.generate({ role: "invalid-role" });

    try {
      await User.create(userData);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.role).toBeDefined();
    }
  });

  it("should set default role to teacher", async () => {
    const userData = UserFactory.generate();
    delete userData.role;

    const user = await User.create(userData);
    expect(user.role).toBe("teacher");
  });
});
