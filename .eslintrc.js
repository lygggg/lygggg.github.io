module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react'],
  globals: {
    graphql: false,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  parse: 'babel-parser',
}
