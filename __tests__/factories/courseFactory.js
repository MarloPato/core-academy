const Course = require("../../models/Course");
const { faker } = require("@faker-js/faker");

/**
 * Course factory to generate test course data using Faker
 */
class CourseFactory {
  /**
   * Generate fake course data
   * @param {Object} overrides - Data to override defaults
   * @returns {Object} - Fake course data
   */
  static generate(overrides = {}) {
    return {
      title: `Study in ${faker.commerce.department()}`,
      description: faker.lorem.paragraphs(2),
      subject: faker.helpers.arrayElement([
        "Mathematics",
        "Science",
        "English",
        "History",
        "Geography",
        "Physics",
        "Chemistry",
        "Biology",
      ]),
      gradeLevel: faker.helpers.arrayElement([
        "Elementary",
        "Middle School",
        "High School",
        "College",
      ]),
      price: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
      content: faker.lorem.paragraphs(3),
      learningObjectives: faker.helpers.multiple(() => faker.lorem.sentence(), {
        count: faker.number.int({ min: 3, max: 6 }),
      }),
      materials: faker.helpers.multiple(() => faker.lorem.word(), {
        count: faker.number.int({ min: 1, max: 4 }),
      }),
      duration: faker.helpers.arrayElement([
        "4 weeks",
        "8 weeks",
        "12 weeks",
        "16 weeks",
      ]),
      tags: faker.helpers.multiple(() => faker.lorem.word(), {
        count: faker.number.int({ min: 2, max: 5 }),
      }),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      length: faker.number.int({min: 1, max: 52}),
      ...overrides,
    };
  }

  /**
   * Create a course with fake data
   * @param {Object} overrides - Data to override defaults
   * @returns {Promise<Course>} - Created course instance
   */
  static async create(overrides = {}) {
    const courseData = this.generate(overrides);
    return await Course.create(courseData);
  }

  /**
   * Create multiple courses
   * @param {number} count - Number of courses to create
   * @param {Object} overrides - Base data to use for all courses
   * @returns {Promise<Array<Course>>} - Array of created courses
   */
  static async createMany(count, overrides = {}) {
    const courses = [];
    for (let i = 0; i < count; i++) {
      courses.push(await this.create(overrides));
    }
    return courses;
  }

  /**
   * Build a course instance without saving to database
   * @param {Object} overrides - Data to override defaults
   * @returns {Course} - Course instance
   */
  static build(overrides = {}) {
    const courseData = this.generate(overrides);
    return new Course(courseData);
  }
}

module.exports = CourseFactory;
