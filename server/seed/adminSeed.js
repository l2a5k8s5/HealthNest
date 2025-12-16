import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDb from "../config/db.js";
import User from "../models/user.js";
import path from "path";

// Load .env from config folder
dotenv.config({ path: path.resolve('./config/.env') });


dotenv.config();


const createAdmin = async () => {
  try {
    await connectDb();
    const adminEmail = "admin@example.com";

    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Create admin
    const admin = await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      phone: "7988716478",
      role: "admin",
      isActive: true,
    });

    console.log("Admin created successfully:", admin);
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
