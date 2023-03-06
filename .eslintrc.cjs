module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["standard-with-typescript", "prettier"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
    },
};
