import SearchBar from "./searchBar";
import React from "react";

const Header = () => {
  return (
    <div className="left-0 z-20 mt-3 fixed h-16 text-gray-700 ml-0 w-full max-w-full mx-auto px-4">
      <SearchBar />
    </div>
  );
};

export default Header;
