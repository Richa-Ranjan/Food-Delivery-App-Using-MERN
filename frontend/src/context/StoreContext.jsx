// // import axios from "axios";
// // import { createContext, useEffect, useState } from "react";
// // import { toast } from "react-toastify";

// // export const StoreContext = createContext(null);

// // const StoreContextProvider = (props) => {
// //   const [cartItems, setCartItems] = useState({});
// //   // const url = "https://food-delivery-backend-5b6g.onrender.com";
// //   const url = "http://localhost:4000";


// //   const [token, setToken] = useState("");
// //   const [food_list, setFoodList] = useState([]);

// //   const addToCart = async (itemId) => {
// //     if (!cartItems[itemId]) {
// //       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
// //     } else {
// //       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
// //     }
// //     if (token) {
// //       const response=await axios.post(
// //         url + "/api/cart/add",
// //         { itemId },
// //         { headers: { token } }
// //       );
// //       if(response.data.success){
// //         toast.success("item Added to Cart")
// //       }else{
// //         toast.error("Something went wrong")
// //       }
// //     }
// //   };

// //   const removeFromCart = async (itemId) => {
// //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
// //     if (token) {
// //       const response= await axios.post(
// //         url + "/api/cart/remove",
// //         { itemId },
// //         { headers: { token } }
// //       );
// //       if(response.data.success){
// //         toast.success("item Removed from Cart")
// //       }else{
// //         toast.error("Something went wrong")
// //       }
// //     }
// //   };

// //   const getTotalCartAmount = () => {
// //     let totalAmount = 0;
// //     for (const item in cartItems) {
// //       if (cartItems[item] > 0) {
// //         let itemInfo = food_list.find((product) => product._id === item);
// //         totalAmount += itemInfo.price * cartItems[item];
// //       }
// //     }
// //     return totalAmount;
// //   };

// //   const fetchFoodList = async () => {
// //     const response = await axios.get(url + "/api/food/list");
// //     if (response.data.success) {
// //       setFoodList(response.data.data);
// //     } else {
// //       alert("Error! Products are not fetching..");
// //     }
// //   };

// //   const loadCardData = async (token) => {
// //     const response = await axios.post(
// //       url + "/api/cart/get",
// //       {},
// //       { headers: { token } }
// //     );
// //     setCartItems(response.data.cartData);
// //   };

// //   useEffect(() => {
// //     async function loadData() {
// //       await fetchFoodList();
// //       if (localStorage.getItem("token")) {
// //         setToken(localStorage.getItem("token"));
// //         await loadCardData(localStorage.getItem("token"));
// //       }
// //     }
// //     loadData();
// //   }, []);

// //   const contextValue = {
// //     food_list,
// //     cartItems,
// //     setCartItems,
// //     addToCart,
// //     removeFromCart,
// //     getTotalCartAmount,
// //     url,
// //     token,
// //     setToken,
// //   };
// //   return (
// //     <StoreContext.Provider value={contextValue}>
// //       {props.children}
// //     </StoreContext.Provider>
// //   );
// // };
// // export default StoreContextProvider;



// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const url = "http://localhost:4000";
//   const [token, setToken] = useState("");
//   const [food_list, setFoodList] = useState([]);

//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if (token) {
//       const response = await axios.post(
//         url + "/api/cart/add",
//         { itemId },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success("Item added to cart");
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (token) {
//       const response = await axios.post(
//         url + "/api/cart/remove",
//         { itemId },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success("Item removed from cart");
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     const response = await axios.get(url + "/api/food/list");
    
//     // ✅ Added this line to check if food list is fetched
//     console.log("📦 food list from backend:", response.data.data);

//     if (response.data.success) {
//       setFoodList(response.data.data);
//     } else {
//       alert("Error! Products are not fetching..");
//     }
//   };

//   const loadCardData = async (token) => {
//     const response = await axios.post(
//       url + "/api/cart/get",
//       {},
//       { headers: { token } }
//     );
//     setCartItems(response.data.cartData);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("token")) {
//         setToken(localStorage.getItem("token"));
//         await loadCardData(localStorage.getItem("token"));
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        const res = await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        res.data.success ? toast.success("Item added to cart") : toast.error("Add failed");
      } catch {
        toast.error("Server error");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      try {
        const res = await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        res.data.success ? toast.success("Item removed from cart") : toast.error("Remove failed");
      } catch {
        toast.error("Server error");
      }
    }
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, id) => {
      const item = food_list.find((f) => f._id === id);
      return item ? total + item.price * cartItems[id] : total;
    }, 0);
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        console.log("📦 food list from backend:", res.data.data);
        setFoodList(res.data.data);
      } else {
        alert("Error fetching food items.");
      }
    } catch (err) {
      console.error("Fetch food list failed", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
