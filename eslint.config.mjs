import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          {
            group: ["@/app/**"],
            message:
              "app/ route files cannot import across route segments. Each route segment is independent. Move shared code to features/ or shared/.",
          },
        ],
      }],
      "import/no-restricted-paths": ["error", {
        zones: [
          {
            target: "./src/features/",
            from: "./src/app/",
            message: "features/ cannot import from app/.",
          },
          {
            target: "./src/shared/",
            from: ["./src/app/", "./src/features/"],
            message:
              "shared/ is the single source of truth — must not import from app/ or features/.",
          },
        ],
      }],
    },
  },
]);

export default eslintConfig;
