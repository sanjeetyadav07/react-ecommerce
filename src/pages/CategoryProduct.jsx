// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useData } from "../context/DataContext";
// const CategoryProduct = () => {
//   const { categoryName } = useParams();
//   const { data } = useData();
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   useEffect(() => {
//     if (data && data.length > 0) {
//       const filtered = data.filter(
//         (product) => product.category.toLowerCase() === categoryName
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [categoryName, data]);
//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4 capitalize">
//         Category: {categoryName}
//       </h1>
//       {filteredProducts.length === 0 ? (
//         <p>No products found in this category.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="p-4 border rounded shadow hover:shadow-lg transition"
//             >
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p>{product.description}</p>
//               <p className="font-bold text-green-600">₹{product.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold capitalize mb-4">
// //         Showing products for: {categoryName}
// //       </h1>

// //       {/* TODO: Filter products by categoryName */}
// //     </div>
// //   );
// // };

// export default CategoryProduct;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loading from "../assets/loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const { categoryName } = useParams();

  const navigate = useNavigate();

  const getFilterData = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/category?type=${categoryName}`
      );
      const data = res.data.products;
      setSearchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterData();
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div>
      {searchData.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center"
          >
            <ChevronLeft /> Back
          </button>
          {searchData.map((product, index) => (
            <ProductListView key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]"></div>
      )}
    </div>
  );
};

export default CategoryProduct;
