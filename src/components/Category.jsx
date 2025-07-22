// import React, { useEffect } from "react";
// import { getData } from "../context/DataContext";
// import { useNavigate } from "react-router-dom";

// const Category = () => {
//   // const {categoryOnlyData} = getData()
//   const navigate = useNavigate();
//   const { data } = getData();

//   const getUniqueCategory = (data, property) => {
//     let newVal = data?.map((curElem) => {
//       return curElem[property];
//     });
//     newVal = [...new Set(newVal)];
//     return newVal;
//   };

//   const categoryOnlyData = getUniqueCategory(data, "category");

//   return (
//     <div className="bg-[#101829]">
//       <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
//         {categoryOnlyData?.map((item, index) => {
//           return (
//             <div key={index}>
//               <button
//                 onClick={() => navigate(`/category/${item}`)}
//                 className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer"
//               >
//                 {item}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Category;

// import React, { useEffect } from "react";
// import { DataContext } from "../context/DataContext";
// import { useNavigate } from "react-router-dom";

// const Category = () => {
//     const { data } = useContext(DataContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Example logic here
//   }, []);

//   return (
//     <div>
//       <h2>Category Page</h2>
//     </div>
//   );
// };

// export default Category;

// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "../context/DataContext";

// const Category = () => {
//   const { data } = useContext(DataContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // you can use 'data' here
//     console.log("Fetched product data from context:", data);
//   }, [data]);

//   return (
//     <div>

//       {data && data.length > 0 ? (
//         data.map((item) => (
//           <div key={item.id}>
//             <p>{item.title}</p>
//           </div>
//         ))
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// };

// export default Category;
import React from "react";
import { useNavigate } from "react-router-dom";
const categories = ["Audio", "Gaming", "Mobile", "TV", "Laptop", "Appliances"];

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black py-6 px-4">
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
            className="uppercase px-6 py-3 rounded-full font-semibold text-white text-sm bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-lg hover:scale-105 tracking-wider"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
