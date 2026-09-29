import { defaultServerConditions } from "vite";
import { defineConfig, type ViteUserConfig } from "vitest/config";

// Tests run against package sources (the "@vernaculo/source" export condition),
// so no build is required before `pnpm test`.
const conditions = ["@vernaculo/source", ...defaultServerConditions];

const config: ViteUserConfig = defineConfig({
  resolve: { conditions },
  ssr: { resolve: { conditions } },
  test: {
    include: ["packages/*/test/**/*.test.ts"],
    environment: "node",
  },
});

export default config;
