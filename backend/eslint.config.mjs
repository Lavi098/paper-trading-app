// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // for development phase
    rules: {
     "@typescript-eslint/no-explicit-any": "off",             // total freedom to use 'any'
  "@typescript-eslint/no-floating-promises": "warn",       // reminds you to handle async
  "@typescript-eslint/no-unsafe-argument": "warn",         // warns if passing unknown into typed func
  "@typescript-eslint/no-unsafe-assignment": "warn",       // warns on assigning unknown/any
  "@typescript-eslint/no-unsafe-call": "off",              // you're allowed to call anything
  "@typescript-eslint/no-unsafe-member-access": "off",     // you can access properties of anything
  "@typescript-eslint/no-unsafe-return": "off",            // return anything, no issues
  "@typescript-eslint/require-await": "off"                // async funcs without await are fine

// for production code, you might want to enable these rules

  /*  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/no-floating-promises": "warn",
  "@typescript-eslint/no-unsafe-argument": "warn",
  "@typescript-eslint/no-unsafe-assignment": "warn",
  "@typescript-eslint/no-unsafe-call": "warn",
  "@typescript-eslint/no-unsafe-member-access": "warn",
  "@typescript-eslint/no-unsafe-return": "warn",
  "@typescript-eslint/require-await": "off"
    */
  },
}
);