"use client";

import LoginForm from "./form";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const onBack = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white border-opacity-20">
        <button
          onClick={onBack}
          className="mb-6 text-white hover:text-blue-300 transition-colors duration-300 flex items-center"
        >
          <ArrowLeft className="mr-2" /> Quay về trang chủ
        </button>
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="h-12 w-12 text-blue-400 mr-4" />
          <h1 className="text-3xl font-bold">
            <span className="text-purple-900 ">Edu</span>
            <span className="text-white -bottom-2 left-0 w-full text-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
              Learn
            </span>
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
