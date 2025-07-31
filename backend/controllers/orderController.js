// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// // placing user order for frontend
// const placeOrder = async (req, res) => {
//   const frontend_url = "https://food-delivery-frontend-s2l9.onrender.com";
//   try {
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 2 * 100,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items: line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// const verifyOrder = async (req, res) => {
//   const { orderId, success } = req.body;
//   try {
//     if (success == "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       res.json({ success: true, message: "Paid" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Not Paid" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // user orders for frontend
// const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.body.userId });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // Listing orders for admin pannel
// const listOrders = async (req, res) => {
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     if (userData && userData.role === "admin") {
//       const orders = await orderModel.find({});
//       res.json({ success: true, data: orders });
//     } else {
//       res.json({ success: false, message: "You are not admin" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // api for updating status
// const updateStatus = async (req, res) => {
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     if (userData && userData.role === "admin") {
//       await orderModel.findByIdAndUpdate(req.body.orderId, {
//         status: req.body.status,
//       });
//       res.json({ success: true, message: "Status Updated Successfully" });
//     }else{
//       res.json({ success: false, message: "You are not an admin" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };




import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://food-delivery-frontend-s2l9.onrender.com";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [`https://your-backend.com/images/${item.image}`], // optional
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("❌ Stripe Error:", error.message);
    res.status(500).json({ success: false, message: "Stripe payment failed" });
  }
};

// verifying payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment Success" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Cancelled" });
    }
  } catch (err) {
    res.json({ success: false, message: "Error in payment verification" });
  }
};

// get user's all orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// get all orders (admin)
const listOrders = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (user?.role === "admin") {
      const orders = await orderModel.find({});
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "Unauthorized: Not admin" });
    }
  } catch (err) {
    res.json({ success: false, message: "Error listing orders" });
  }
};

// update status (admin)
const updateStatus = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (user?.role === "admin") {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      res.json({ success: true, message: "Status updated" });
    } else {
      res.json({ success: false, message: "Unauthorized" });
    }
  } catch (err) {
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };











// import OrderModel from "../models/orderModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const placeOrder = async (req, res) => {
//   try {
//     console.log("📦 Received Order Request:", req.body);

//     const { address, items, amount, userId } = req.body;

//     if (!address || !items || !amount || !userId) {
//       console.log("❌ Missing order data");
//       return res.status(400).json({ success: false, message: "Missing order data" });
//     }

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//           images: [`http://localhost:4000/images/${item.image}`],
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: "http://localhost:3000/verify?success=true",
//       cancel_url: "http://localhost:3000/verify?success=false",
//     });

//     // save order
//     const newOrder = new OrderModel({
//       userId,
//       items,
//       address,
//       amount,
//       payment: false,
//     });
//     await newOrder.save();

//     console.log("✅ Order saved and Stripe session created");
//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("❌ Stripe Error:", error.message);
//     res.status(500).json({ success: false, message: "Order failed. Try again!" });
//   }
// };
