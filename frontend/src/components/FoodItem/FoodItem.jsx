// import React, { useContext, useState } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/frontend_assets/assets";
// import { StoreContext } from "../../context/StoreContext";

// const FoodItem = ({ id, name, price, description, image }) => {
//   const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext); 

//   return (
//     <div className="food-item">
//       <div className="food-item-img-container">
//         <img src={url+"/images/"+image} alt="" className="food-item-image" />
//         {!cartItems[id] ? (
//           <img
//             className="add"
//             onClick={() => addToCart(id)}
//             src={assets.add_icon_white}
//             alt=""
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
//             <p>{cartItems[id]}</p>
//             <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
//           </div>
//         )}
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">${price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;
import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // ✅ Debug: Print out props and image URL
  console.log("FoodItem props:", {
    id,
    name,
    image,
    fullImageURL: url + "/images/" + image
  });

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          alt={name}
          className="food-item-image"
          onError={() => console.error("Image failed to load:", url + "/images/" + image)}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
