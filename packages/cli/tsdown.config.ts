import type { UserConfig } from "tsdown";
import { packageConfig } from "../../tsdown.base.ts";

const config: UserConfig = packageConfig(["src/index.ts", "src/bin.ts"]);

export default config;
