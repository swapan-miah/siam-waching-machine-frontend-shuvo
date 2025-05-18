/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Uncomment this if you're using static export
  images: {
    unoptimized: true, // Disable image optimization (useful for static export)
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  reactStrictMode: false, // React Strict Mode বন্ধ করতে হলে
  // swcMinify: true, // SWC মিনিফিকেশন চালু করতে
};

export default nextConfig;
