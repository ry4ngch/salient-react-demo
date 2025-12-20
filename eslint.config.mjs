import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginPrettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
  // React & hooks (flat-compatible)
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs.flat.recommended,

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      prettier: pluginPrettier,
    },

    rules: {
      // ESLint core
      "no-unused-vars": "warn",
      "no-console": "warn",

      // React
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      // Prettier (manual integration)
      "prettier/prettier": "error",
    },

    settings: {
      react: { version: "detect" },
    },
  },
];
