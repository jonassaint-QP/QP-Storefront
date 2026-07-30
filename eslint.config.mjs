import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Standalone global ignores object — must be first and must not contain rules/plugins
  { ignores: [".next/**", ".netlify/**", "out/**", "build/**", "next-env.d.ts"] },
  ...nextVitals,
  ...nextTs,
  // Suppress intentional setState-in-effect patterns (localStorage hydration, timers)
  { rules: { "react-hooks/set-state-in-effect": "off" } },
]);

export default eslintConfig;
