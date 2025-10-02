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
