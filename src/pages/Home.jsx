// import React from "react";
// import Carousel from "../components/Carousel";

// const Home = () => {
//   return (
//     <>
//       <Carousel />
//     </>
//   );
// };

// export default Home;
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import MidBanner from "../components/MidBanner";
import Features from "../components/Features";

const Home = () => {
  const context = useContext(DataContext);
  console.log("🧪 DataContext inside Home:", context); // ⬅️ Add this

  return (
    <div>
      <Carousel />
      <Category />
      <MidBanner />
      <Features />
    </div>
  );
};

export default Home;
