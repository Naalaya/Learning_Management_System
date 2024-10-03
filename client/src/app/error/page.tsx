"use client";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white border-opacity-20">
        <h1 className="text-3xl font-bold text-white">Error</h1>
        <p className="text-white mt-4">An error occurred. Please try again.</p>
      </div>
    </div>
  );
};
export default ErrorPage;
