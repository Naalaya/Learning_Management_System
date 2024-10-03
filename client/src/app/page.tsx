"use client";

import RightSection from "@/components/page-layout/RightSection";
import FloatingIcon from "@/components/page-layout/floatingIcon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  GraduationCap,
  Sparkles,
  Brain,
  Atom,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const HomePage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [elementsStyle, setElementsStyle] = useState<{
    [key: number]: React.CSSProperties;
  }>({});

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (mounted) {
      const newStyle: { [key: number]: React.CSSProperties } = {};
      [...Array(30)].forEach((_, i) => {
        newStyle[i] = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          transform: `translate(${
            (cursorPos.x - window.innerWidth / 2) / 20
          }px, ${(cursorPos.y - window.innerHeight / 2) / 20}px)`,
        };
      });
      setElementsStyle(newStyle);
    }
  }, [cursorPos, mounted]);

  const handleLogin = () => {
    // console.log(userType);
    router.push(`/signIn`);
  };
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Interactive background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 transition-transform duration-1000"
            style={elementsStyle[i]}
          ></div>
        ))}
      </div>

      {/* Floating knowledge icons */}
      <FloatingIcon Icon={Brain} className="text-pink-400" delay={0} />
      <FloatingIcon Icon={Atom} className="text-blue-400" delay={1000} />
      <FloatingIcon Icon={Lightbulb} className="text-yellow-400" delay={2000} />
      <FloatingIcon Icon={Rocket} className="text-green-400" delay={3000} />

      <div className="max-w-6xl w-full relative z-10">
        {/* Main Content */}
        <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center overflow-hidden border border-white border-opacity-20">
          {/* Left Section - Logo and Buttons */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div
              className={`flex items-center justify-center md:justify-start mb-8 transition-all duration-1000 ease-out transform ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative">
                <GraduationCap className="h-20 w-20 text-blue-400 animate-bounce" />
                <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-yellow-400 animate-spin" />
              </div>
              <h1 className="text-5xl font-bold ml-4 relative">
                <span className="text-purple-900 ">Edu</span>
                <span className="text-white -bottom-2 left-0 w-full text-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
                  Learn
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
              </h1>
            </div>
            <div
              className={`space-y-4 transition-all duration-1000 delay-300 ease-out transform ${
                mounted
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden mb-4"
                  size="lg"
                  onClick={() => {
                    toast({
                      title: "Chào mừng bạn đến với hệ thống",
                      description: "Hãy đăng nhập để bắt đầu",
                      variant: "success",
                    });
                  }}
                >
                  <span className="relative z-10">
                    Chào mừng bạn đến với hệ thống
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>

                <Button
                  className="w-full bg-white text-blue-600 hover:text-white text-lg py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
                  size="lg"
                  onClick={() => handleLogin()}
                >
                  <span className="relative z-10">Đăng Nhập Vào Hệ Thống</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>
          </div>
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
