/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeimg.com"]
    // remotePatterns: [
    //   { protocol: "https", hostname: "**.placeholder.com" },
    //   { protocol: "https", hostname: "**.placeimg.com" },
    // ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/old/:path*",
  //       destination: "/new/:path*",
  //       permanent: false,
  //     }
  //   ];
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/movies",
  //       destination: `https://api.themoviedb.org/3/movie/${API_KEY}`,
  //       permanent: false,
  //     }
  //   ];
  // },
};

module.exports = nextConfig;