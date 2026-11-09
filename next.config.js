/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      'pk_test_ZGFybGluZy13aWxkY2F0LTE2MzEuY2xlcmsuYWNjb3VudHMuZGV2JA',
    CLERK_SECRET_KEY:
      process.env.CLERK_SECRET_KEY ||
      'sk_test_Jn9DbT9iWgqNAvvC2Ib3VyNUjLgbaELleRxfI2LVXl',
  },
};

module.exports = nextConfig;
