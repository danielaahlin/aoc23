module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    indent: [
      'error',
      2,
      { offsetTernaryExpressions: true, MemberExpression: 1 }
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
    'no-undef': ['error', { typeof: true }],
    'react/display-name': 'off'
  }
}