import { createContext, useState, useContext } from "react";
import axios from "axios";

// Create the context
export const DataContext = createContext(null);

// Data provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");

      // res.data is directly an array
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        console.warn("API returned non-array data:", res.data);
        setData([]);
      }
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

// Custom hook for easier usage
export const useData = () => useContext(DataContext);
