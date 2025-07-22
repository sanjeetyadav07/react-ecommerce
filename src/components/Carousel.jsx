// import React, { useContext, useEffect } from "react";
// import { DataContext } from "../context/DataContext";

// const Carousel = () => {
//   const { fetchAllProducts, data} = useContext(DataContext);
//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   return <div>Carousel</div>;
// };

// export default Carousel;

// import React, { useContext, useEffect } from "react";
// import { DataContext } from "../context/DataContext";

// const Carousel = () => {
//   const { fetchAllProducts, data } = useContext(DataContext);

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Featured Products</h2>
//       {data && data.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {data.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded-md shadow p-3 hover:shadow-lg transition"
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="h-40 w-full object-contain mb-2"
//               />
//               <h3 className="text-sm font-semibold">{product.title}</h3>
//               <p className="text-red-500 font-bold">${product.price}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading products...</p>
//       )}
//     </div>
//   );
// };

// export default Carousel;

// import { useContext, useEffect } from "react";
// import { DataContext } from "../context/DataContext";
// // ✅ exact path match
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import Category from "./Category";
// const Carousel = () => {
//   const context = useContext(DataContext);

//   if (!context) {
//     return <div>DataContext is not available.</div>; // 🛡️ Defensive check
//   }

//   const { fetchAllProducts, data } = context;

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   const SamplePrevArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         onClick={onClick}
//         className={`arrow ${className}`}
//         style={{ zIndex: 3 }}
//       >
//         <AiOutlineArrowLeft
//           className="arrows"
//           style={{
//             ...style,
//             display: "block",
//             borderRadius: "50px",
//             background: "#f53347",
//             color: "white",
//             position: "absolute",
//             padding: "2px",
//             left: "50px",
//           }}
//         />
//       </div>
//     );
//   };
//   const SampleNextArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//       <div onClick={onClick} className={`arrow ${className}`}>
//         <AiOutlineArrowRight
//           className="arrows"
//           style={{
//             ...style,
//             display: "block",
//             borderRadius: "50px",
//             background: "#f53347",
//             color: "white",
//             position: "absolute",
//             padding: "2px",
//             right: "50px",
//           }}
//         />
//       </div>
//     );
//   };

//   var settings = {
//     dots: false,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     pauseOnHover: false,
//     nextArrow: <SampleNextArrow to="next" />,
//     prevArrow: <SamplePrevArrow to="prev" />,
//   };

//   return (
//     <div>
//       <Slider {...settings}>
//         {data?.slice(0, 7)?.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
//             >
//               <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4">
//                 <div className="md:space-y-6 space-y-3">
//                   <h3 className="text-red-500 font-semibold font-sans text-sm">
//                     Powering Your World with the Best in Electronics
//                   </h3>
//                   <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white">
//                     {item.title}
//                   </h1>
//                   <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
//                     {item.description}
//                   </p>
//                   <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">
//                     Shop Now
//                   </button>
//                 </div>
//                 <div>
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>
//       <Category />
//     </div>
//   );
// };
// <div>
//   <h2>Carousel</h2>
//   {data && data.length > 0 ? (
//     data.map((product) => <p key={product.id}>{product.title}</p>)
//   ) : (
//     <p>Loading...</p>
//   )}
// </div>;

// export default Carousel;
// import React, { useContext, useEffect } from "react";
// import { DataContext } from "../context/DataContext";

// const Carousel = () => {
//   const { data, fetchAllProducts } = useContext(DataContext); // ✅ destructure here

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Carousel</h2>
//       {data && data.length > 0 ? (
//         data.map((product) => <p key={product.id}>{product.title}</p>)
// export default Carousel;
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const Carousel = () => {
  const context = useContext(DataContext);
  if (!context) return <p>Loading context ...</p>;

  const { data, fetchAllProducts } = context;
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
        />
      </div>
    );
  };
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };
  if (!Array.isArray(data)) {
    return <p className="text-center">Loading products...</p>;
  }
  //   return (
  //     // <div className="max-w-6xl mx-auto py-8">
  //     //   <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
  //     //   {data && data.length > 0 ? (
  //     //     <Slider{...settings}>
  //     //     //   {data.slice(0, 10).map((product) => (
  //     //     //     <div key={product.id} className="px-2">
  //     //     //       <div className="bg-white p-4 rounded-md shadow-md">
  //     //     //         <img
  //     //     //           src={product.image}
  //     //     //           alt={product.title}
  //     //     //           className="h-40 w-full object-contain mb-2"
  //     //     //         />
  //     //     //         <p className="text-sm font-semibold truncate">
  //     //     //           {product.title}
  //     //     //         </p>
  //     //     //         <p className="text-red-500 font-bold">₹{product.price}</p>
  //     //           </div>
  //     //         </div>
  //     //       ))}
  //     //     </Slider>
  //     //   ) : (
  //     //     <p>Loading...</p>
  //       )}
  //     </div>
  //   );

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0, 10)?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
            >
              <div className="flex flex-col md:flex-row gap-10 justify-center  items-center px-4 py-16 max-w-7xl mx-auto">
                <div className="md:w-1/2 space-y-4">
                  <h3 className="text-red-500 font-semibold  text-sm uppercase">
                    Powering Your World with the Best in Electronics
                  </h3>
                  <h1 className="md:text-xl text-xl font-bold uppercase  text-white break-words">
                    {item.title}
                  </h1>
                  <p className="text-gray-300 text-sm md:text-base line-clamp-3">
                    {item.description}
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md shadow hover:scale-105 transition-transform">
                    Shop Now
                  </button>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-60 md:w-[400px] object-contain rounded-lg shadow-xl hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>
          );
        })}
        {/* <div>
            <h3>1</h3>
          </div>
          <div>
          
          </div>
          <div>
           
          </div> */}
      </Slider>
      {/* <h2 className="text-xl font-bold mb-2">Products</h2>
        {data?.length > 0 ? (
          data.map((product) => <div key={product.id}>{product.title}</div>)
        ) : (
          <p>Loading...</p>
        )} */}
    </div>
  );
};

// export default Carousel;
export default Carousel;
