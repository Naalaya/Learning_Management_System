"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Implement your search logic here
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden md:block items-center justify-between w-full max-w-md md:max-w-lg mx-auto px-6"
    >
      <Input
        type="search"
        placeholder="Search something..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow py-3 pl-4 pr-16 border border-black rounded-full bg-gradient-to-r from-blue-50 to-purple-50 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
        style={{ transition: "box-shadow 0.3s, border-color 0.3s" }}
      />
    </form>
  );
};

export default SearchBar;
