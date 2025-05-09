const User = require("../../models/User");
const { faker } = require("@faker-js/faker");

/**
 * User factory to generate test user data using Faker
 */
class UserFactory {
  /**
   * Generate fake user data
   * @param {Object} overrides - Data to override defaults
   * @returns {Object} - Fake user data
   */
  static generate(overrides = {}) {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(["teacher", "admin"]),
      school: faker.company.name(),
      subjects: faker.helpers.multiple(
        () =>
          faker.helpers.arrayElement([
            "Mathematics",
            "Science",
            "English",
            "History",
            "Geography",
            "Physics",
            "Chemistry",
            "Biology",
          ]),
        { count: faker.number.int({ min: 1, max: 4 }) }
      ),
      lastLogin: faker.date.recent(),
      ...overrides,
    };
  }
  /**
   * Generate multiple users
   * @param {number} count - Number of users to generate
   * @param {Object} overrides - Data to override defaults
   * @returns {Array<Object>} - Array of fake user data
   */
  static generateMany(count = 2, overrides = {}) {
    return Array.from({ length: count }, () => this.generate({ ...overrides}));
  }

  /**
   * Create a user with fake data
   * @param {Object} overrides - Data to override defaults
   * @returns {Promise<User>} - Created user instance
   */
  static async create(overrides = {}) {
    const userData = this.generate(overrides);
    return await User.create(userData);
  }

  /**
   * Create multiple users
   * @param {number} count - Number of users to create
   * @param {Object} overrides - Base data to use for all users
   * @returns {Promise<Array<User>>} - Array of created users
   */
  static async createMany(count, overrides = {}) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(await this.create(overrides));
    }
    return users;
  }

  /**
   * Build a user instance without saving to database
   * @param {Object} overrides - Data to override defaults
   * @returns {User} - User instance
   */
  static build(overrides = {}) {
    const userData = this.generate(overrides);
    return new User(userData);
  }
}

module.exports = UserFactory;
