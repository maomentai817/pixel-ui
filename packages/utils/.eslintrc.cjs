/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 80,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ],
    'vue/no-setup-props-destructure': ['off'],
    'no-undef': 'error',
    'vue/script-setup-uses-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-redeclare': [
      'error',
      { ignoreDeclarationMerge: true }
    ]
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  overrides: [
    {
      files: ['**/*.test.*'], // 匹配所有 .test 文件
      rules: {
        'vue/multi-word-component-names': 'off' // 对测试文件禁用多词组件名称规则
      }
    },
    {
      files: ['*.ts', '**/*.tsx'],
      rules: {}
    }
  ]
}
