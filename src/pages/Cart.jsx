import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [location, setLocation] = useState({
    county: "",
    state: "",
    postcode: "",
    country: "",
  });
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const itemsTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = itemsTotal > 500 ? 0 : 25;
  const handlingCharge = 5;
  const promoDiscount = discount;
  const grandTotal =
    itemsTotal + deliveryCharge + handlingCharge - promoDiscount;

  const handleApplyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert("Invalid Promo Code");
    }
  };

  // 📍 Location Fetcher with fallback
  const getLocation = async () => {
    try {
      const res = await fetch("https://ipwho.is/?lang=en");
      const data = await res.json();
      if (!data.success) throw new Error("API failed");

      setLocation({
        county: data.city || "",
        state: data.region || "",
        postcode: data.postal || "",
        country: data.country || "",
      });

      if (!phoneNumber) {
        setPhoneNumber(data.phone ? data.phone : "");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Could not fetch location details. Try again later.");
    }
  };

  // Auto-fill full name from Clerk
  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }
  }, [user]);

  // Auto-fetch location once when cart is filled
  useEffect(() => {
    if (cartItems.length > 0 && !location.country) {
      getLocation();
    }
  }, [cartItems]);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 mb-10">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Cart Items and Delivery Form */}
          <div>
            <h1 className="font-bold text-2xl mb-6">
              My Cart ({cartItems.length})
            </h1>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-red-500 font-medium">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border px-2 py-1 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="px-2 font-bold"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="px-2 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaRegTrashAlt size={20} />
                  </button>
                </div>
              </div>
            ))}

            {/* Delivery Form */}
            <form className="mt-6 bg-gray-50 p-4 rounded-md space-y-4">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MdDeliveryDining className="text-red-500" />
                Delivery Info
              </h2>
              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="w-full border px-4 py-2 rounded"
                placeholder="Address"
                value={location.county}
                onChange={(e) =>
                  setLocation({ ...location, county: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border px-4 py-2 rounded"
                  placeholder="State"
                  value={location.state}
                  onChange={(e) =>
                    setLocation({ ...location, state: e.target.value })
                  }
                />
                <input
                  className="border px-4 py-2 rounded"
                  placeholder="Postcode"
                  value={location.postcode}
                  onChange={(e) =>
                    setLocation({ ...location, postcode: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border px-4 py-2 rounded"
                  placeholder="Country"
                  value={location.country}
                  onChange={(e) =>
                    setLocation({ ...location, country: e.target.value })
                  }
                />
                <input
                  className="border px-4 py-2 rounded"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Submit
              </button>
              <div className="text-center text-gray-500">or</div>
              <button
                onClick={getLocation}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Detect Location
              </button>
            </form>
          </div>

          {/* Right Side - Bill Summary */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LuNotebookText />
              Bill Details
            </h2>
            <div className="flex justify-between py-2">
              <span>Items total</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Delivery charge</span>
              <span className={deliveryCharge === 0 ? "text-green-500" : ""}>
                {deliveryCharge === 0 ? (
                  <>
                    <s>$25</s> FREE
                  </>
                ) : (
                  `$${deliveryCharge}`
                )}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>Handling charge</span>
              <span>${handlingCharge}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between py-2 text-green-600 font-medium">
                <span>Promo Discount</span>
                <span>-${promoDiscount}</span>
              </div>
            )}
            <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Grand total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            {/* Promo Code */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Apply Promo Code"
                className="w-full border px-4 py-2 rounded mb-2"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={handleApplyPromo}
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Apply
              </button>
            </div>

            <button
              className="mt-6 bg-red-600 text-white w-full py-3 rounded-md text-lg font-medium"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[500px] text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            Your cart is empty
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <GiShoppingBag />
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
