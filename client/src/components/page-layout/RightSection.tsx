import {
  BookOpen,
  Coffee,
  Cog,
  Headphones,
  Laptop,
  PlayCircle,
} from "lucide-react";
import React from "react";

const RightSection = () => {
  return (
    <div className="w-full md:w-1/2 relative">
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="relative p-8">
          <Laptop className="h-40 w-40 text-white mx-auto mb-4 animate-float" />
          <div
            className="absolute top-0 right-0 animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <Headphones className="h-20 w-20 text-yellow-400" />
          </div>
          <div
            className="absolute bottom-0 left-0 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <PlayCircle className="h-20 w-20 text-green-400" />
          </div>
          <div
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <Coffee className="h-16 w-16 text-brown-400" />
          </div>
          <div
            className="absolute top-1/4 right-0 translate-x-1/2 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <BookOpen className="h-16 w-16 text-pink-400" />
          </div>
          <div
            className="absolute bottom-1/4 right-1/4 animate-spin"
            style={{ animationDuration: "10s" }}
          >
            <Cog className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
