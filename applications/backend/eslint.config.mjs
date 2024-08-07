import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      // Add any other custom rules here
    },
  },
  pluginJs.configs.recommended,
];