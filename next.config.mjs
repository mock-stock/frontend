import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.join(__dirname, "styles"),
    };
    return config;
  },
};

export default nextConfig;
