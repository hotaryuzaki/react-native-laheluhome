import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';

export default [
  {
    ignores: [
      '**/node_modules/',
      'build/*.js',
      'config/*.js',
      'coverage/*.js',
      'coverage/*',
      'jest/*.js',
      'components/__tests__/*',
      '__tests__/*',
      '__tests__/*.js',
      '.vscode/',
      '.history/',
      'scripts',
      'android',
      'ios',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'], // Add this if you are using React 17+
  {
    plugins: {
      react: pluginReact,
      'react-native': pluginReactNative,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
