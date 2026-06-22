import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['public/**', 'resources/**', 'assets/css/tachyons.css'],
  },
  js.configs.recommended,
  {
    files: ['assets/js/**/*.js', 'static/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      // Allow intentional full-width spaces inside strings/templates (e.g. 公文排版)
      'no-irregular-whitespace': ['error', { skipStrings: true, skipTemplates: true }],
    },
  },
];
