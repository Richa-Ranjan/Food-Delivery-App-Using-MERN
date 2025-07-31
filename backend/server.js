// import dotenv from 'dotenv';
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// // Connect to MongoDB
// connectDB();

// // App config
// const app = express();
// const port = process.env.PORT || 4000;

// // Middlewares
// app.use(express.json());
// app.use(cors());

// // API routes
// app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// // Root route
// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`🚀 Server started on port: ${port}`);
// });







import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";

// Required for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Serve static files from /uploads folder at /images route
app.use("/images", express.static(path.join(__dirname, "uploads")));



// API routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port: ${port}`);
});
