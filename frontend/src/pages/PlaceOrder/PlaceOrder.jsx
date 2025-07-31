

// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();

//     if (!token) {
//       toast.error("Please log in first.");
//       navigate("/cart");
//       return;
//     }

//     if (getTotalCartAmount() === 0) {
//       toast.error("Please add items to cart.");
//       navigate("/cart");
//       return;
//     }

//     try {
//       const orderItems = food_list
//         .filter((item) => cartItems[item._id] > 0)
//         .map((item) => ({
//           ...item,
//           quantity: cartItems[item._id],
//         }));

//       const orderData = {
//         address: data,
//         items: orderItems,
//         amount: getTotalCartAmount() + 2,
//       };

//       const response = await axios.post(`${url}/api/order/place`, orderData, {
//         headers: {
//           token: token,
//         },
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url);
//       } else {
//         toast.error("Order failed. Please try again!");
//       }
//     } catch (error) {
//       console.error("Order placement error:", error);
//       toast.error("Something went wrong. Try again later.");
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       toast.error("Please login first.");
//       navigate("/cart");
//     } else if (getTotalCartAmount() === 0) {
//       toast.error("Please add items to cart.");
//       navigate("/cart");
//     }
//   }, [token]);

//   return (
//     <form className="place-order" onSubmit={placeOrder}>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" />
//           <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" />
//         </div>
//         <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email Address" />
//         <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
//         <div className="multi-fields">
//           <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
//           <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
//         </div>
//         <div className="multi-fields">
//           <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip Code" />
//           <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
//         </div>
//         <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotals</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Please login first.");
      return navigate("/cart");
    }

    try {
      let orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            ...item,
            quantity: cartItems[item._id],
          });
        }
      });

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          token: token, // ✅ token must be present
        },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        toast.error("Order failed. Please try again!");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first.");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Please add items to cart.");
      navigate("/cart");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email Address" />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip Code" />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotals</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
