module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "jest": true,
    "es6": true,
  },
  "plugins": ["mocha"],
  "rules": {
    "no-param-reassign": ["error", { "props": false }],
    "no-unused-vars": [2, { "vars": "all", "args": "none" }],
    "mocha/no-exclusive-tests": "error",
  },
};