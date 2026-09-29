import type { UserConfig } from "tsdown";

/** Shared build settings for every published package: ESM only, Node 22+, bundled .d.mts. */
export function packageConfig(entry: readonly string[]): UserConfig {
  return {
    entry: [...entry],
    format: "esm",
    platform: "node",
    target: "node22",
    dts: true,
    clean: true,
  };
}
