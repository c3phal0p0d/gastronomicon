/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [{ hostname: "gastronomicon.s3.amazonaws.com" }],
    },
    crossOrigin: 'anonymous'
}