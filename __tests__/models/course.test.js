const Course = require("../../models/Course");
const CourseFactory = require("../factories/courseFactory");

describe("Course Model", () => {
  afterEach(async () => {
    // Clear the courses collection after each test
    await Course.deleteMany({});
  });

  it("should create a valid course", async () => {
    const courseData = CourseFactory.generate();
    const course = await Course.create(courseData);

    expect(course.title).toBe(courseData.title);
    expect(course.description).toBe(courseData.description);
    expect(course.subject).toBe(courseData.subject);
    expect(course.gradeLevel).toBe(courseData.gradeLevel);
    expect(course.price).toBe(courseData.price);
    expect(course.content).toBe(courseData.content);
    expect(course.learningObjectives).toEqual(
      expect.arrayContaining(courseData.learningObjectives)
    );
    expect(course.materials).toEqual(
      expect.arrayContaining(courseData.materials)
    );
    expect(course.duration).toBe(courseData.duration);
    expect(course.tags).toEqual(expect.arrayContaining(courseData.tags));
    expect(course.rating).toBe(courseData.rating);
  });

  it("should validate required fields", async () => {
    const invalidCourse = {};

    try {
      await Course.create(invalidCourse);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.title).toBeDefined();
      expect(error.errors.description).toBeDefined();
      expect(error.errors.subject).toBeDefined();
      expect(error.errors.gradeLevel).toBeDefined();
      expect(error.errors.price).toBeDefined();
      expect(error.errors.content).toBeDefined();
      expect(error.errors.duration).toBeDefined();
    }
  });

  it("should validate price is non-negative", async () => {
    const courseData = CourseFactory.generate({ price: -10 });

    try {
      await Course.create(courseData);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.price).toBeDefined();
    }
  });

  it("should validate rating is between 0 and 5", async () => {
    const courseData = CourseFactory.generate({ rating: 6 });

    try {
      await Course.create(courseData);
      fail("Should have thrown validation error");
    } catch (error) {
      expect(error.errors.rating).toBeDefined();
    }
  });

  it("should set default rating to 0", async () => {
    const courseData = CourseFactory.generate();
    delete courseData.rating;

    const course = await Course.create(courseData);
    expect(course.rating).toBe(0);
  });

  it("should update the updatedAt timestamp before saving", async () => {
    const course = await CourseFactory.create();
    const originalUpdatedAt = course.updatedAt;

    // Wait a moment to ensure timestamp changes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    course.title = "Updated Title";
    await course.save();

    expect(course.updatedAt.getTime()).toBeGreaterThan(
      originalUpdatedAt.getTime()
    );
  });
});
