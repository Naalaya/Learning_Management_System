/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Tăng giới hạn kích thước body, có thể thay đổi giá trị phù hợp
    },
  },
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "bluemoji.io",
        pathname: "/cdn-proxy/**",
      },
    ],
  },
};
// module.exports = {
//   // ... other configurations ...
//   serverActions: {
//     bodySizeLimit: "2mb", // Increase the limit as needed
//   },
// };
export default nextConfig;
