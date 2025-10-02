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
        `https://fakestoreapi.com/products/category/${categoryName}`
      );
      // const data = res.data.products;
      setSearchData(res.data);
    } catch (error) {
      console.error("Failed to fetch category products:", error);
      setSearchData([]);
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
