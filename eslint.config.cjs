const { configs } = require('@eslint/js');
const prettier = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.commonjs,
        require: true,
        module: true,
      },
    },
  },
  {
    ignores: ['.history/*'],
  },
  configs.recommended,
  prettier,
];
