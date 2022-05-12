module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'quote-props': 'off',
    'semi': 'off',
    'vue/no-duplicate-attributes': 'off',
    'object-curly-spacing': 'off',
    'padded-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-infix-ops': 'off',
    'brace-style': 'off',
    'no-useless-constructor': 'off',

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    'no-explicit-any': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'no-return-assign': 'off',
    'no-useless-escape': 'off',
    'indent': 'off',
    'new-cap': 'off',

    'vue/valid-v-slot': ['error', { 'allowModifiers': true }],
  }
};
