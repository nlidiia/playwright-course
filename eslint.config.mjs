// @ts-check

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default defineConfig(
  globalIgnores([
    'playwright-report/**',
    'test-results/**',
  ]),

  {
    files: ['**/*.{js,mjs,ts}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],

    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  {
    files: ['tests/**/*.ts'],

    extends: [
      playwright.configs['flat/recommended'],
    ],
  },
);