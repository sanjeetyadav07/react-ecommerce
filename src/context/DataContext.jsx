// import axios from "axios";
// import { createContext, useState } from "react";

// export const DataContext = createContext(null);
// export const DataProvider = ({ children }) => {
//   const [data, setData] = useState();

//   // fetching all products from api
//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(
//         "https://fakestoreapi.in/api/products?limit=150"
//       );
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
//       {children}
//     </DataContext.Provider>
//   );
// };
import { createContext, useState } from "react";
import { useContext } from "react";
import axios from "axios";

export const DataContext = createContext(null); // ✅ this must match

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.in/api/products?limit=150%"
      );
      console.log("fetched products", res.data.products);
      if (Array.isArray(res.data.products)) {
        setData(res.data.products);
      } else {
        console.warn("API returned non-array data:", res.data);
        setData([]);
      }
      // ✅ don't forget this!
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
