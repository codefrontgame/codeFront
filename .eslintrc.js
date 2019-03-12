module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['warn', 'always-multiline'],
  },
  plugins: [
    'vue',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
}
