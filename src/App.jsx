import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import axios from "axios";
import Footer from "./components/Footer";
import CategoryProduct from "./pages/CategoryProduct";
// import Category from "./components/Category";

function App() {
  const [location, setLocation] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        // const location = await axios.get(url);
        const res = await axios.get(url);
        // const exactLocation = location.data.address;
        // setLocation(exactLocation);
        setLocation(res.data.address);
        setOpenDropdown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/category/:categoryName" element={<CategoryProduct />} />

        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
