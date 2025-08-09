// @ts-nocheck
import type { NextConfig } from "next";
// @ts-ignore - local ambient declaration provided in types, suppress if still unresolved
import withPWA from "next-pwa";
// Define a lightweight local type for runtime caching entries (avoids depending on published type defs)
type RuntimeCaching = {
  urlPattern: RegExp | string | ((options: { url: URL }) => boolean);
  handler: string;
  options?: any;
};

// Basic runtime caching config. Tune as needed.
// Ref: https://github.com/shadowwalker/next-pwa
const runtimeCaching: RuntimeCaching[] = [
  {
    urlPattern: /\/$/,
    handler: "NetworkFirst",
    options: {
      cacheName: "start-url",
      expiration: { maxEntries: 1, maxAgeSeconds: 24 * 60 * 60 },
    },
  },
  {
    urlPattern: /\/api\//,
    handler: "NetworkFirst",
    options: {
      cacheName: "api-cache",
      networkTimeoutSeconds: 10,
      expiration: { maxEntries: 50, maxAgeSeconds: 5 * 60 },
    },
  },
  {
    urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp|avif)$/i,
    handler: "CacheFirst",
    options: {
      cacheName: "image-cache",
      expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
    },
  },
  {
    urlPattern: /\.(?:js|css)$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-resources",
      expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
    },
  },
  {
    urlPattern: ({ url }) =>
      url.origin === self.location.origin &&
      url.pathname.startsWith("/images/"),
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "local-images",
      expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
    },
  },
  {
    urlPattern: /https:\/\/fonts\.(?:gstatic|googleapis)\.com\//i,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts",
      expiration: { maxEntries: 30, maxAgeSeconds: 60 * 24 * 60 * 60 },
    },
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
  fallbacks: {
    // When a page (document) request fails (offline), serve the pre-cached offline page.
    document: "/offline.html",
  },
  buildExcludes: [/middleware-manifest\.json$/],
  cacheStartUrl: true,
});

export default pwaConfig(nextConfig);
