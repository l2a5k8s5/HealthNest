// import express from "express";
// import connectDb from "./config/db.js";
// import dotenv from "dotenv";
// import authRoute from "../server/routes/authRoute.js"
// import orderRoute from "../server/routes/orderRoute.js";
// import productRoute from "../server/routes/productRoute.js"
// import cors from "cors"
// import cookieParser from "cookie-parser";

// dotenv.config({path : "./config/.env"});
// const app = express();
// connectDb();

// app.get("/", (req, res) => {
//   res.send("Server running");
// });

// app.listen(process.env.PORT ,()=>{
//     console.log(`Server successfully running on port ${process.env.PORT}`);
// });

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true })); // checking type user that send data from frontend to backend



// app.use("/api/auth",authRoute);
// app.use("/api/auth",orderRoute);
// app.use("/api/auth",productRoute);

import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// ========================================
// FIX: Proper path resolution for ES modules
// ========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the same directory as server.js
dotenv.config({ path: path.resolve(__dirname, '.env') });

// ========================================
// VERIFY ENV VARS IMMEDIATELY
// ========================================
console.log("🔍 Environment Variables Check:");
console.log("Current directory:", __dirname);
console.log("Looking for .env at:", path.resolve(__dirname, '.env'));
console.log("PORT:", process.env.PORT || "❌ Missing");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✓ Loaded" : "❌ Missing");
console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID || "❌ Missing");
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "✓ Loaded" : "❌ Missing");
console.log("TWILIO_PHONE:", process.env.TWILIO_PHONE || "❌ Missing");

// Stop if critical env vars are missing
if (!process.env.MONGO_URI || !process.env.TWILIO_ACCOUNT_SID) {
  console.error("❌ Critical environment variables missing! Check your .env file.");
  process.exit(1);
}

// ========================================
// INITIALIZE APP & DATABASE
// ========================================
const app = express();
connectDb();

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ========================================
// ROUTES
// ========================================
app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api/auth", authRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products", productRoute);

// ========================================
// START SERVER
// ========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server successfully running on port ${PORT}`);
});