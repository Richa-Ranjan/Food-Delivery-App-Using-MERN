import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

 orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/place", placeOrder); //  No auth for testing

orderRouter.post("/verify",verifyOrder);
orderRouter.post("/status",authMiddleware,updateStatus);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",authMiddleware,listOrders);

export default orderRouter;


// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import {
//   placeOrder,
//   verifyOrder,
//   userOrders,
//   listOrders,
//   updateStatus,
// } from "../controllers/orderController.js";

// const orderRouter = express.Router();

// orderRouter.post("/place", authMiddleware, placeOrder); // ✅ Protect this route
// orderRouter.post("/verify", verifyOrder);
// orderRouter.post("/userorders", authMiddleware, userOrders);
// orderRouter.post("/status", authMiddleware, updateStatus);
// orderRouter.get("/list", authMiddleware, listOrders);

// export {
//   placeOrder,
//   verifyOrder,
//   userOrders,
//   listOrders,       // ✅ Make sure this is present
//   updateStatus,
// };
