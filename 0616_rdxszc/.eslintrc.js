module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "import/no-unresolved": 0,
    "react/react-in-jsx-scope": 0,
    "import/no-extraneous-dependencies": 0,
    "no-shadow": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    quotes: ["error", "double"],
    semi: ["error", "never"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
}
