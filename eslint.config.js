/**
 * ESLint 扁平配置
 * 适用于 Vue 3 + TypeScript + Prettier 项目
 */

import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import parserTypeScript from '@typescript-eslint/parser'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import { readFileSync, existsSync } from 'fs'

// 读取自动导入的全局变量配置
// 如果文件不存在（例如在 CI 环境中首次运行），使用空对象
let autoImportGlobals = { globals: {} }
const autoImportPath = './.eslintrc-auto-import.json'
if (existsSync(autoImportPath)) {
  autoImportGlobals = JSON.parse(readFileSync(autoImportPath, 'utf-8'))
}

export default [
  // ==================== 推荐的基础配置 ====================
  js.configs.recommended,

  // ==================== 忽略文件配置 ====================
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.vscode/**',
      '**/.idea/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/public/**',
      '**/.husky/**',
      '**/scripts/**',
      // 自动生成的文件
      'src/types/auto-imports.d.ts',
      'src/types/components.d.ts',
      '.eslintrc-auto-import.json',
    ],
  },

  // ==================== JavaScript/TypeScript 通用配置 ====================
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        atob: 'readonly',
        btoa: 'readonly',
        // DOM 类型
        Element: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        File: 'readonly',
        Blob: 'readonly',
        FileReader: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        AbortSignal: 'readonly',
        ClipboardItem: 'readonly',
        CSSStyleDeclaration: 'readonly',
        ScrollIntoViewOptions: 'readonly',
        ImportMetaEnv: 'readonly',
        // Node.js 环境
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      // 禁止使用 console（警告级别，允许 warn 和 error）
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // 禁止使用 debugger（警告级别）
      'no-debugger': 'warn',
      // 禁止未使用的变量（警告级别，允许以 _ 开头的变量）
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // 要求使用 === 和 !==
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // 禁止不必要的布尔转换
      'no-extra-boolean-cast': 'error',
      // 禁止不必要的分号
      'no-extra-semi': 'error',
      // 要求对象字面量属性名称使用一致的引号
      'quote-props': ['error', 'as-needed'],
      // 允许无用的 catch
      'no-useless-catch': 'off',
      // 允许访问 Object.prototype 方法
      'no-prototype-builtins': 'off',
    },
  },

  // ==================== TypeScript 配置 ====================
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // 关闭 JS 的 no-unused-vars，使用 TS 的
      'no-unused-vars': 'off',
      // TypeScript 未使用的变量
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 允许使用 any 类型（警告级别）
      '@typescript-eslint/no-explicit-any': 'warn',
      // 允许使用 @ts-ignore 等注释
      '@typescript-eslint/ban-ts-comment': 'off',
      // 允许空函数
      '@typescript-eslint/no-empty-function': 'off',
      // 允许使用 require
      '@typescript-eslint/no-require-imports': 'off',
      // 不要求显式的函数返回类型
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 不要求显式的模块边界类型
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // ==================== Vue 配置 ====================
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        // Vue 3 编译器宏
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        fetch: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        HTMLInputElement: 'readonly',
        // 自动导入的全局变量
        ...autoImportGlobals.globals,
      },
    },
    rules: {
      // 关闭 JS 的 no-unused-vars，使用 TS 的
      'no-unused-vars': 'off',
      // TypeScript 未使用的变量
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 组件名称可以是单个单词（关闭多单词限制）
      'vue/multi-word-component-names': 'off',
      // 要求组件名称使用 PascalCase
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      // 要求 prop 名称使用 camelCase
      'vue/prop-name-casing': ['error', 'camelCase'],
      // 自定义事件名称使用 kebab-case
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      // 单行 HTML 元素内容在新的一行（关闭）
      'vue/singleline-html-element-content-newline': 'off',
      // HTML 属性顺序
      'vue/attributes-order': 'warn',
      // 组件选项顺序
      'vue/order-in-components': 'warn',
      // 允许在 <script setup> 中解构 props
      'vue/no-setup-props-destructure': 'off',
      // HTML 自闭合标签
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },

  // ==================== Prettier 集成 ====================
  configPrettier,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Prettier 规则作为 ESLint 错误
      'prettier/prettier': 'error',
    },
  },
]
