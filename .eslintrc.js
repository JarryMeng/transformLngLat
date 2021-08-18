/*
 * @Author: liuming
 * @Description: file content
 * @LastEditors: liuming
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,

    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint",
  },
  parser: "@babel/eslint-parser",
  rules: {
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    // semi: ["error", "always"],
    // 关闭定义了，但没调用(** is defind but never used)
    "no-unused-vars": "off",
    "no-console": "off",
    "no-debugger": "off",
    semi: [2, "always"],
    "generator-star-spacing": "off",
    "no-multi-spaces": 0,
    "comma-dangle": [0, "ignore"],
    "dot-location": 0,
    "space-before-function-paren": [0, "always"],
    "newline-after-var": 0,
    "object-shorthand": 0,
    // indent: [2, 4],
    // quotes: [2, "single"],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
