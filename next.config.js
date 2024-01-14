/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([]);

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
};

module.exports = withTM(nextConfig);
