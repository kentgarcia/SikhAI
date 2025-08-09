declare module "next-pwa" {
  import { NextConfig } from "next";
  interface RuntimeCaching {
    urlPattern: RegExp | string | ((options: { url: URL }) => boolean);
    handler: string;
    options?: any;
  }
  interface PWAOptions {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
    };
    runtimeCaching?: RuntimeCaching[];
    buildExcludes?: RegExp[];
    cacheStartUrl?: boolean;
  }
  type Plugin = (config: NextConfig) => NextConfig;
  export default function withPWA(options: PWAOptions): Plugin;
  export type { RuntimeCaching };
}
