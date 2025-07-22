// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
// import { MapPin } from "lucide-react";
// import { useState } from "react";
// import { CgClose } from "react-icons/cg";
// import { FaCaretDown } from "react-icons/fa";
// import { IoCartOutline } from "react-icons/io5";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = ({ location }) => {
//   const [getLocation, openDropdown, setOpenDropdown] = useState(false);
//   const toggleDropdown = () => {
//     setOpenDropdown(!openDropdown);
//   };
//   return (
//     <div className="bg-white py-3 shadow-2xl">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/*logo section*/}
//         <div className="flex gap-7 items-center">
//           <Link to={"/"}>
//             <h1 className="font-bold text-3xl">
//               <span className="text-red-500 font-serif">Gad</span>gets
//             </h1>
//           </Link>
//           <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
//             <MapPin className="text-black-500" />
//             <span className="font-semibold">
//               {location ? (
//                 <div className="-space-y-2">
//                   <p>{location.county}</p>
//                   <p>{location.state}/</p>
//                 </div>
//               ) : (
//                 "Add Address"
//               )}
//             </span>
//             <FaCaretDown onClick={toggleDropdown} />
//           </div>
//           {openDropdown ? (
//             <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
//               <h1 className="font-semibold mb-4 text-xl flex justify-between">
//                 Change Location{" "}
//                 <span onClick={toggleDropdown}>
//                   <CgClose />
//                 </span>
//               </h1>
//               <button
//                 onClick={getLocation}
//                 className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
//               >
//                 Detect my location
//               </button>
//             </div>
//           ) : null}
//         </div>
//         {/*menu section*/}
//         <nav className="flex gap-7 items-center">
//           <ul className="flex gap-7 items-center text-xl font-semibold">
//             <NavLink
//               to={"/"}
//               className={({ isActive }) =>
//                 `${
//                   isActive
//                     ? "border-b-3 transition-all border-red-500"
//                     : "text-black"
//                 }cursor-pointer`
//               }
//             >
//               <li>Home</li>
//             </NavLink>
//             <NavLink
//               to={"/products"}
//               className={({ isActive }) =>
//                 `${
//                   isActive
//                     ? "border-b-3 transition-all border-red-500"
//                     : "text-black"
//                 }cursor-pointer`
//               }
//             >
//               <li>Products</li>
//             </NavLink>
//             <NavLink
//               to={"/contacts"}
//               className={({ isActive }) =>
//                 `${
//                   isActive
//                     ? "border-b-3 transition-all border-red-500"
//                     : "text-black"
//                 }cursor-pointer`
//               }
//             >
//               <li>Contacts</li>
//             </NavLink>
//             <NavLink
//               to={"/about"}
//               className={({ isActive }) =>
//                 `${
//                   isActive
//                     ? "border-b-3 transition-all border-red-500"
//                     : "text-black"
//                 }cursor-pointer`
//               }
//             >
//               <li>About</li>
//             </NavLink>
//           </ul>
//           <Link to={"/cart"} className="relative">
//             <IoCartOutline className="h-7 w-7" />
//             <span className="bg-red-500 px-2 rounded-full absolute-top-3-right-3 text-white">
//               0
//             </span>
//           </Link>
//           <div>
//             <SignedOut>
//               <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Navbar = ({ location, setLocation, openDropdown, setOpenDropdown }) => {
  const { cartItems } = useCart();

  // const [location, setLocation,openDropdown,setOpenDropdown] = useState(null);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // console.log(latitude, longitude);

          try {
            const res = await axios.get(
              `https://nominatim.openstreetmap.org/reverse`,
              {
                params: {
                  format: "json",
                  lat: latitude,
                  lon: longitude,
                },
              }
            );

            const data = res.data.address;
            // console.log(data); // optional: see full response

            setLocation({
              county: data.county || data.suburb || data.village,
              state: data.state,
            });
            setOpenDropdown(false);
          } catch (error) {
            console.error("Failed to reverse geocode location", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="bg-white py-3 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Gad</span>gets
            </h1>
          </Link>

          {/* Location */}
          <div
            className="flex gap-1 cursor-pointer text-gray-700 items-center"
            onClick={toggleDropdown}
          >
            <MapPin className="text-black-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown />
          </div>

          {/* Location Dropdown */}
          {openDropdown && (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span onClick={toggleDropdown}>
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
              >
                Detect my location
              </button>
            </div>
          )}
        </div>

        {/* Menu Section */}
        <nav className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            {["Home", "Products", "Contacts", "About"].map((item, idx) => (
              <NavLink
                key={idx}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>{item}</li>
              </NavLink>
            ))}
          </ul>

          {/* Cart Icon */}
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            {cartItems.length > 0 && (
              <span className="bg-red-500 px-2 rounded-full absolute top-2- right-2 text-white text-sm">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          <div>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

//  const { data, fetchAllProducts } = useContext(DataContext); // ✅ destructure here

// Carousel	@	Carousel.jsx:187
// <Carousel>
// Home	@	Home.jsx:7
// <Home>
// App	@	App.jsx:43
//  <Route path="/" element={<Home />} />
// (anonymous)	@	main.jsx:16
// <App />
