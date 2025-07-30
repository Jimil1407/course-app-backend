import mongoose from 'mongoose';

// Import models (these are now actual models, not schemas)
import User from "./userschema.js";
import Course from "./courseschema.js";
import Admin from "./adminschema.js";
import Purchase from "./purchaseschema.js";

export async function insertSampleData() {
    try {
      // Clear existing data
      await User.deleteMany({});
      await Course.deleteMany({});
      await Admin.deleteMany({});
      await Purchase.deleteMany({});
  
      // Insert sample users
      const user1 = await User.create({
        email: "john@example.com",
        password: "password123",
        firstname: "John",
        lastname: "Doe"
      });
  
      const user2 = await User.create({
        email: "jane@example.com",
        password: "password456",
        firstname: "Jane",
        lastname: "Smith"
      });
  
      // Insert sample admin
      const admin1 = await Admin.create({
        email: "admin@example.com",
        password: "admin123",
        firstname: "Admin",
        lastname: "User"
      });
  
      // Insert sample courses
      const course1 = await Course.create({
        title: "JavaScript Fundamentals",
        desription: "Learn the basics of JavaScript programming",
        price: 49.99,
        imageURL: "https://example.com/js-course.jpg",
        creatorId: admin1._id
      });
  
      const course2 = await Course.create({
        title: "React Development",
        desription: "Build modern web applications with React",
        price: 79.99,
        imageURL: "https://example.com/react-course.jpg",
        creatorId: admin1._id
      });
  
      // Insert sample purchases
      await Purchase.create({
        courseId: course1._id,
        userId: user1._id
      });
  
      await Purchase.create({
        courseId: course2._id,
        userId: user2._id
      });
  
      console.log("Sample data inserted successfully!");
    } catch (error) {
      console.error("Error inserting sample data:", error);
    }
  }
