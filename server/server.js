import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "../server/routes/authRoute.js"
import orderRoute from "../server/routes/orderRoute.js";
import productRoute from "../server/routes/productRoute.js"
import cors from "cors"

dotenv.config({path : "./config/.env"});
const app = express();
connectDb();

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(process.env.PORT ,()=>{
    console.log(`Server successfully running on port ${process.env.PORT}`);
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/auth",orderRoute);
app.use("/api/auth",productRoute);