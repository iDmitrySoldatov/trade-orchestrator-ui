import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,

  {
    rules: {
      'no-unused-vars': ['error', { args: 'all', vars: 'all' }],
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
    },
  },
];
