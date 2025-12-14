import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "../server/routes/authRoute.js"
dotenv.config({path : "./config/.env"});
const app = express();
connectDb();

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(process.env.PORT ,()=>{
    console.log(`Server successfully running on port ${process.env.PORT}`);
});
app.use(express.json());

app.use("/api/auth",authRoute)